import { AppDataSource } from '../data-source';
import { ActivityPO } from '../po/activityPo';
import { Provide } from '@midwayjs/core';

@Provide()
export class ActivityService {
  private activityRepo = AppDataSource.getRepository(ActivityPO);

  // 创建活动
  async createActivity(name: string, content: string, startDate: Date, endDate: Date, registrationFee: number) {
    // 验证日期
    if (startDate >= endDate) {
      throw new Error('开始日期必须早于结束日期');
    }

    // 验证报名费
    if (registrationFee < 0) {
      throw new Error('报名费不能为负数');
    }

    const activity = this.activityRepo.create({
      name,
      content,
      startDate,
      endDate,
      registrationFee
    });

    await this.activityRepo.save(activity);
    return {
      id: activity.id,
      name: activity.name,
      content: activity.content,
      startDate: activity.startDate,
      endDate: activity.endDate,
      registrationFee: activity.registrationFee
    };
  }

  // 获取所有活动
  async getAllActivities() {
    const activities = await this.activityRepo.find();
    return activities.map(activity => ({
      id: activity.id,
      name: activity.name,
      content: activity.content,
      startDate: activity.startDate,
      endDate: activity.endDate,
      registrationFee: activity.registrationFee
    }));
  }

  // 根据ID获取活动
  async getActivityById(id: number) {
    const activity = await this.activityRepo.findOneBy({ id });
    if (!activity) return null;
    
    return {
      id: activity.id,
      name: activity.name,
      content: activity.content,
      startDate: activity.startDate,
      endDate: activity.endDate,
      registrationFee: activity.registrationFee
    };
  }
} 