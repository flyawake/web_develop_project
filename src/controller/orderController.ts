import { OrderService } from '../service/orderService';
import { Context } from '@midwayjs/koa';
import { Controller, Post, Get, Put, Body, Param, Inject } from '@midwayjs/core';

@Controller('/api/order')
export class OrderController {
  @Inject()
  orderService: OrderService;

  @Inject()
  ctx: Context;

  @Post('/create')
  async createOrder(@Body() body: { userId: number; activityId: number; note?: string }) {
    try {
      this.ctx.set('Content-Type', 'application/json');
      const order = await this.orderService.createOrder(body.userId, body.activityId, body.note);
      this.ctx.body = { success: true, message: '报名成功', data: order };
    } catch (err) {
      console.error('创建订单异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Get('/user/:userId')
  async getOrdersByUser(@Param('userId') userId: number) {
    try {
      this.ctx.set('Content-Type', 'application/json');
      const orders = await this.orderService.getOrdersByUser(userId);
      this.ctx.body = { success: true, data: orders };
    } catch (err) {
      console.error('获取用户订单异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Get('/activity/:activityId')
  async getOrdersByActivity(@Param('activityId') activityId: number) {
    try {
      this.ctx.set('Content-Type', 'application/json');
      const orders = await this.orderService.getOrdersByActivity(activityId);
      this.ctx.body = { success: true, data: orders };
    } catch (err) {
      console.error('获取活动订单异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Put('/:id/status')
  async updateOrderStatus(@Param('id') id: number, @Body() body: { status: string }) {
    try {
      this.ctx.set('Content-Type', 'application/json');
      const order = await this.orderService.updateOrderStatus(id, body.status);
      this.ctx.body = { success: true, message: '订单状态更新成功', data: order };
    } catch (err) {
      console.error('更新订单状态异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Post('/:id/delete')
  async deleteOrder(@Param('id') id: number, @Body() body: { userId: number }) {
    try {
      this.ctx.set('Content-Type', 'application/json');
      await this.orderService.deleteOrder(id, body.userId);
      this.ctx.body = { success: true, message: '订单删除成功' };
    } catch (err) {
      console.error('删除订单异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }
} 