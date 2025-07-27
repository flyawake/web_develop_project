import { CommentService } from '../service/commentService';
import { Context } from '@midwayjs/koa';
import { Controller, Post, Get, Delete, Body, Param, Inject } from '@midwayjs/core';

@Controller('/api/comment')
export class CommentController {
  @Inject()
  commentService: CommentService;

  @Inject()
  ctx: Context;

  @Post('/create')
  async createComment(@Body() body: { userId: number; activityId: number; content: string; rating: number }) {
    try {
      const comment = await this.commentService.createComment(body.userId, body.activityId, body.content, body.rating);
      this.ctx.body = { success: true, message: '评论发布成功', data: comment };
    } catch (err) {
      console.error('创建评论异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Get('/activity/:activityId')
  async getCommentsByActivity(@Param('activityId') activityId: number) {
    try {
      const comments = await this.commentService.getCommentsByActivity(activityId);
      this.ctx.body = { success: true, data: comments };
    } catch (err) {
      console.error('获取活动评论异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }

  @Delete('/:id')
  async deleteComment(@Param('id') id: number, @Body() body: { userId: number }) {
    try {
      await this.commentService.deleteComment(id, body.userId);
      this.ctx.body = { success: true, message: '评论删除成功' };
    } catch (err) {
      console.error('删除评论异常', err);
      this.ctx.set('Content-Type', 'application/json');
      this.ctx.body = { success: false, message: err && err.message ? err.message : '服务器异常' };
    }
  }
} 