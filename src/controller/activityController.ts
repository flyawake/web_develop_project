import { ActivityService } from '../service/activityService';
import { Context } from '@midwayjs/koa';
import { Controller, Post, Body, Inject, Get, Param } from '@midwayjs/core';

@Controller('/api/activity')
export class ActivityController {
  @Inject()
  activityService: ActivityService;

  @Inject()
  ctx: Context;

  @Post('/create')
  async createActivity(@Body() body: { 
    name: string; 
    content: string; 
    startDate: string; 
    endDate: string; 
    registrationFee: number 
  }) {
    const startDate = new Date(body.startDate);
    const endDate = new Date(body.endDate);

    const activity = await this.activityService.createActivity(
      body.name,
      body.content,
      startDate,
      endDate,
      body.registrationFee || 0
    );

    this.ctx.body = { 
      success: true, 
      message: '活动创建成功', 
      data: activity 
    };
  }

  @Get('/list')
  async getAllActivities() {
    const activities = await this.activityService.getAllActivities();
    this.ctx.body = { 
      success: true, 
      data: activities 
    };
  }

  @Get('/:id')
  async getActivityById(@Param('id') id: string) {
    const activityId = parseInt(id);
    const activity = await this.activityService.getActivityById(activityId);
    
    if (!activity) {
      this.ctx.body = { 
        success: false, 
        message: '活动不存在' 
      };
      return;
    }

    this.ctx.body = { 
      success: true, 
      data: activity 
    };
  }
} 