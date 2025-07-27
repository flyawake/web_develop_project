import { AppDataSource } from '../data-source';
import { ActivityPO } from '../po/activityPo';
import { UserPO } from '../po/userPo';
import { Provide } from '@midwayjs/core';

@Provide()
export class ActivityService {
  private activityRepo = AppDataSource.getRepository(ActivityPO);
  private userRepo = AppDataSource.getRepository(UserPO);

  async createActivity(creatorId: number, activityData: any) {
    const creator = await this.userRepo.findOneBy({ id: creatorId });
    if (!creator) {
      throw new Error('用户不存在');
    }

    const activity = this.activityRepo.create({
      ...activityData,
      creator,
      currentParticipants: 0,
      status: 'active'
    });

    return await this.activityRepo.save(activity);
  }

  async getActivities(page: number = 1, limit: number = 10, search?: string) {
    const queryBuilder = this.activityRepo
      .createQueryBuilder('activity')
      .leftJoinAndSelect('activity.creator', 'creator')
      .orderBy('activity.createdAt', 'DESC');

    if (search) {
      queryBuilder.where(
        'activity.title LIKE :search OR activity.description LIKE :search OR activity.location LIKE :search',
        { search: `%${search}%` }
      );
    }

    const [activities, total] = await queryBuilder
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      activities,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    };
  }

  async getActivityById(id: number) {
    return await this.activityRepo.findOne({
      where: { id },
      relations: ['creator', 'comments', 'comments.user']
    });
  }

  async updateActivity(id: number, updateData: any) {
    const activity = await this.activityRepo.findOneBy({ id });
    if (!activity) {
      throw new Error('活动不存在');
    }

    Object.assign(activity, updateData);
    return await this.activityRepo.save(activity);
  }

  async deleteActivity(id: number) {
    const activity = await this.activityRepo.findOneBy({ id });
    if (!activity) {
      throw new Error('活动不存在');
    }

    await this.activityRepo.remove(activity);
    return { success: true };
  }

  async getActivitiesByCreator(creatorId: number) {
    return await this.activityRepo.find({
      where: { creator: { id: creatorId } },
      relations: ['creator']
    });
  }
} 