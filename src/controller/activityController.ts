import { ActivityService } from '../service/activityService';
import { UploadService } from '../service/uploadService';
import { Context } from '@midwayjs/koa';
import { Controller, Post, Get, Put, Body, Query, Param, Inject } from '@midwayjs/core';

@Controller('/api/activity')
export class ActivityController {
  @Inject()
  activityService: ActivityService;

  @Inject()
  uploadService: UploadService;

  @Inject()
  ctx: Context;

  @Post('/create')
  async createActivity(@Body() body: any) {
    try {
      this.ctx.set('Content-Type', 'application/json');
      
      let imageUrl = body.imageUrl; // 如果没有上传文件，使用原有的imageUrl
      
      // 如果有上传文件，处理图片上传
      const file = (this.ctx as any).file;
      if (file) {
        imageUrl = await this.uploadService.uploadImage(file);
      }
      
      // 将图片URL添加到活动数据中
      const activityData = { ...body, imageUrl };
      const activity = await this.activityService.createActivity(body.creatorId, activityData);
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
      this.ctx.set('Content-Type', 'application/json');
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
      this.ctx.set('Content-Type', 'application/json');
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
      this.ctx.set('Content-Type', 'application/json');
      
      let imageUrl = body.imageUrl;
      
      // 如果有上传文件，处理图片上传
      const file = (this.ctx as any).file;
      if (file) {
        // 获取原活动信息，删除旧图片
        const oldActivity = await this.activityService.getActivityById(id);
        if (oldActivity && oldActivity.imageUrl) {
          await this.uploadService.deleteImage(oldActivity.imageUrl);
        }
        
        imageUrl = await this.uploadService.uploadImage(file);
      }
      
      // 将图片URL添加到活动数据中
      const activityData = { ...body, imageUrl };
      const activity = await this.activityService.updateActivity(id, activityData);
      this.ctx.body = { success: true, message: '活动更新成功', data: activity };
    } catch (err) {
      console.error('更新活动异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Post('/:id/delete')
  async deleteActivity(@Param('id') id: number) {
    try {
      this.ctx.set('Content-Type', 'application/json');
      
      const activity = await this.activityService.getActivityById(id);
      if (activity && activity.imageUrl) {
        await this.uploadService.deleteImage(activity.imageUrl);
      }
      
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
      this.ctx.set('Content-Type', 'application/json');
      const activities = await this.activityService.getActivitiesByCreator(creatorId);
      this.ctx.body = { success: true, data: activities };
    } catch (err) {
      console.error('获取创建者活动异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Post('/upload-image')
  async uploadImage() {
    try {
      this.ctx.set('Content-Type', 'application/json');
      
      const file = (this.ctx as any).file;
      
      if (!file) {
        this.ctx.body = {
          success: false,
          message: '请选择要上传的图片'
        };
        return;
      }
      
      const imageUrl = await this.uploadService.uploadImage(file);
      
      this.ctx.body = {
        success: true,
        message: '图片上传成功',
        data: { imageUrl }
      };
    } catch (err) {
      console.error('图片上传异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = {
        success: false,
        message: err && err.message ? err.message : '图片上传失败'
      };
    }
  }
} 