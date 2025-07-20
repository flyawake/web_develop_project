import { UserService } from '../service/userService';
import { Context } from '@midwayjs/koa';
import { Controller, Post, Body, Inject, Get } from '@midwayjs/core';

@Controller('/api/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;

  @Post('/register')
  async register(@Body() body: { phone: string; username: string; password: string;}) {
    const user = await this.userService.register(body.phone, body.username, body.password);
    this.ctx.body = { success: true, message: '注册成功', data: user };
  }

  @Post('/login')
  async login(@Body() body: { phone: string; password: string }) {
    const user = await this.userService.login(body.phone, body.password);  
    this.ctx.session.userId = user.id;
    this.ctx.body = { success: true, message: '登录成功', data: user };
  }

  @Get('/getUserInfo')
  async getCurrentUser() {
    const userId = this.ctx.session.userId;
    if (!userId) {
      this.ctx.body = { success: false, message: '未登录' };
      return;
    }
    const user = await this.userService.findById(userId);
    if (!user) {
      this.ctx.body = { success: false, message: '用户不存在' };
      return;
    }
    this.ctx.body = { success: true, data: user };
  }
} 