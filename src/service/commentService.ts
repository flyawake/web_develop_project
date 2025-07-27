import { AppDataSource } from '../data-source';
import { CommentPO } from '../po/commentPo';
import { ActivityPO } from '../po/activityPo';
import { UserPO } from '../po/userPo';
import { Provide } from '@midwayjs/core';

@Provide()
export class CommentService {
  private commentRepo = AppDataSource.getRepository(CommentPO);
  private activityRepo = AppDataSource.getRepository(ActivityPO);
  private userRepo = AppDataSource.getRepository(UserPO);

  async createComment(userId: number, activityId: number, content: string, rating: number) {
    const user = await this.userRepo.findOneBy({ id: userId });
    const activity = await this.activityRepo.findOneBy({ id: activityId });

    if (!user) {
      throw new Error('用户不存在');
    }
    if (!activity) {
      throw new Error('活动不存在');
    }
    if (rating < 1 || rating > 5) {
      throw new Error('评分必须在1-5之间');
    }

    const comment = this.commentRepo.create({
      user,
      activity,
      content,
      rating
    });

    return await this.commentRepo.save(comment);
  }

  async getCommentsByActivity(activityId: number) {
    return await this.commentRepo.find({
      where: { activity: { id: activityId } },
      relations: ['user'],
      order: { createdAt: 'DESC' }
    });
  }

  async deleteComment(commentId: number, userId: number) {
    const comment = await this.commentRepo.findOne({
      where: { id: commentId, user: { id: userId } }
    });

    if (!comment) {
      throw new Error('评论不存在或无权限删除');
    }

    await this.commentRepo.remove(comment);
    return { success: true };
  }
} 