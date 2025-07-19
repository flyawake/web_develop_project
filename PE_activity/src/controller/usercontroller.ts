import { UserService } from '../service/userService';
import { Context } from '@midwayjs/koa';
import { Controller, Post, Body, Inject } from '@midwayjs/core';
import { DataSource } from 'typeorm';
import { UserPO } from '../po/userPo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'PE',
  entities: [UserPO],
  synchronize: true, // 自动同步（仅有差异时才会变动）
});

@Controller('/api/user')
export class UserController {
  @Inject()
  userService: UserService;

  @Inject()
  ctx: Context;

  @Post('/register')
  async register(@Body() body: { phone: string; username: string; password: string }) {
    try {
      const user = await this.userService.register(body.phone, body.username, body.password);
      this.ctx.body = { success: true, message: '注册成功', data: user };
    } catch (err) {
      console.error('注册异常', err); // 增加详细日志
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Post('/login')
  async login(@Body() body: { phone: string; password: string }) {
    try {
      const user = await this.userService.login(body.phone, body.password);
      this.ctx.body = { success: true, message: '登录成功', data: user };
    } catch (err) {
      console.error('登录异常', err); // 增加详细日志
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }
} 