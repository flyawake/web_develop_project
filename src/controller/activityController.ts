import { ActivityService } from '../service/activityService';
import { Context } from '@midwayjs/koa';
import { Controller, Post, Get, Put, Delete, Body, Query, Param, Inject } from '@midwayjs/core';

@Controller('/api/activity')
export class ActivityController {
  @Inject()
  activityService: ActivityService;

  @Inject()
  ctx: Context;

  @Post('/create')
  async createActivity(@Body() body: any) {
    try {
      const activity = await this.activityService.createActivity(body.creatorId, body);
      this.ctx.body = { success: true, message: '活动创建成功', data: activity };
    } catch (err) {
      console.error('创建活动异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Get('/list')
  async getActivities(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('search') search?: string) {
    try {
      const result = await this.activityService.getActivities(page, limit, search);
      this.ctx.body = { success: true, data: result };
    } catch (err) {
      console.error('获取活动列表异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Get('/:id')
  async getActivityById(@Param('id') id: number) {
    try {
      const activity = await this.activityService.getActivityById(id);
      if (!activity) {
        this.ctx.body = { success: false, message: '活动不存在' };
        return;
      }
      this.ctx.body = { success: true, data: activity };
    } catch (err) {
      console.error('获取活动详情异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Put('/:id')
  async updateActivity(@Param('id') id: number, @Body() body: any) {
    try {
      const activity = await this.activityService.updateActivity(id, body);
      this.ctx.body = { success: true, message: '活动更新成功', data: activity };
    } catch (err) {
      console.error('更新活动异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Delete('/:id')
  async deleteActivity(@Param('id') id: number) {
    try {
      await this.activityService.deleteActivity(id);
      this.ctx.body = { success: true, message: '活动删除成功' };
    } catch (err) {
      console.error('删除活动异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Get('/creator/:creatorId')
  async getActivitiesByCreator(@Param('creatorId') creatorId: number) {
    try {
      const activities = await this.activityService.getActivitiesByCreator(creatorId);
      this.ctx.body = { success: true, data: activities };
    } catch (err) {
      console.error('获取创建者活动异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }
} 