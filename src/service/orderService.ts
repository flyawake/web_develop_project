import { AppDataSource } from '../data-source';
import { OrderPO } from '../po/orderPo';
import { ActivityPO } from '../po/activityPo';
import { UserPO } from '../po/userPo';
import { Provide } from '@midwayjs/core';

@Provide()
export class OrderService {
  private orderRepo = AppDataSource.getRepository(OrderPO);
  private activityRepo = AppDataSource.getRepository(ActivityPO);
  private userRepo = AppDataSource.getRepository(UserPO);

  async createOrder(userId: number, activityId: number, note?: string) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const activity = await this.activityRepo.findOneBy({ id: activityId });

    if (!user) {
      throw new Error('用户不存在');
    }
    if (!activity) {
      throw new Error('活动不存在');
    }
    if (activity.currentParticipants >= activity.maxParticipants) {
      throw new Error('活动已满员');
    }

    const existingOrder = await this.orderRepo.findOne({
      where: { user: { id: userId }, activity: { id: activityId } }
    });

    if (existingOrder) {
      throw new Error('您已报名此活动');
    }

    const order = this.orderRepo.create({
      user,
      activity,
      note: note || '',
      status: 'pending'
    });

    return await this.orderRepo.save(order);
  }

  async getOrdersByUser(userId: number) {
    return await this.orderRepo.find({
      where: { user: { id: userId } },
      relations: ['activity', 'user']
    });
  }

  async getOrdersByActivity(activityId: number) {
    return await this.orderRepo.find({
      where: { activity: { id: activityId } },
      relations: ['user', 'activity']
    });
  }

  async updateOrderStatus(orderId: number, status: string) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId },
      relations: ['activity']
    });

    if (!order) {
      throw new Error('订单不存在');
    }

    if (status === 'approved') {
      order.activity.currentParticipants += 1;
      await this.activityRepo.save(order.activity);
    } else if (status === 'rejected' && order.status === 'approved') {
      order.activity.currentParticipants -= 1;
      await this.activityRepo.save(order.activity);
    }

    order.status = status;
    return await this.orderRepo.save(order);
  }

  async deleteOrder(orderId: number, userId: number) {
    const order = await this.orderRepo.findOne({
      where: { id: orderId, user: { id: userId } }
    });

    if (!order) {
      throw new Error('订单不存在或无权限删除');
    }

    await this.orderRepo.remove(order);
    return { success: true };
  }
} 