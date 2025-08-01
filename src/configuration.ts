import { Configuration, App } from '@midwayjs/core';
import * as koa from '@midwayjs/koa';
import * as validate from '@midwayjs/validate';
import * as info from '@midwayjs/info';
import { join } from 'path';
import * as multer from '@koa/multer';
import * as dotenv from 'dotenv';
import { ReportMiddleware } from './middleware/report.middleware';
import { AppDataSource } from './data-source';

// 加载环境变量
dotenv.config();

@Configuration({
  imports: [
    koa,
    validate,
    {
      component: info,
      enabledEnvironment: ['local'],
    },
  ],
  importConfigs: [join(__dirname, './config')],
})
export class MainConfiguration {
  @App('koa')
  app: koa.Application;

  async onReady() {
    this.app.useMiddleware([ReportMiddleware]);
    
    // 配置文件上传中间件
    const upload = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
      fileFilter: (req, file, cb) => {
        // 只允许图片文件
        if (file.mimetype.startsWith('image/')) {
          cb(null, true);
        } else {
          cb(new Error('只允许上传图片文件'));
        }
      },
    });
    
    // 为需要文件上传的路由添加中间件
    this.app.use(async (ctx, next) => {
      if (ctx.path.startsWith('/api/activity/create') || 
          ctx.path.startsWith('/api/activity/upload-image') ||
          (ctx.path.startsWith('/api/activity/') && ctx.method === 'PUT')) {
        await upload.single('image')(ctx, next);
      } else {
        await next();
      }
    });
    
    this.app.use(async (ctx, next) => {
      ctx.set('Access-Control-Allow-Origin', '*');
      ctx.set('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
      if (ctx.method === 'OPTIONS') {
        ctx.status = 204;
      } else {
        await next();
      }
    });

    await AppDataSource.initialize();
  }
}
