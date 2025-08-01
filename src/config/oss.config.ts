import * as OSS from 'ali-oss';
import { Provide, Scope, ScopeEnum } from '@midwayjs/core';

@Provide()
@Scope(ScopeEnum.Singleton)
export class OSSConfig {
  private client: OSS;

  constructor() {
    this.client = new OSS({
      region: 'oss-cn-beijing', // 替换为你的region
      accessKeyId: 'LTAI5tKWko7MxoP8x7tSNswh', // 替换为你的accessKeyId
      accessKeySecret: 'eqRFegC07AoMF1el2pwPA7cX1oKSIf', // 替换为你的accessKeySecret
      bucket: 'flyleaf', // 替换为你的bucket名称
    });
  }

  async uploadFile(file: Express.Multer.File, fileName?: string): Promise<string> {
    try {
      const key = fileName || `activities/${Date.now()}-${file.originalname}`;
      
      const result = await this.client.put(key, file.buffer, {
        headers: {
          'Content-Type': file.mimetype,
        },
      });

      return result.url;
    } catch (error) {
      console.error('OSS上传失败:', error);
      throw new Error('文件上传失败');
    }
  }

  async deleteFile(url: string): Promise<void> {
    try {
      const key = this.getKeyFromUrl(url);
      if (key) {
        await this.client.delete(key);
      }
    } catch (error) {
      console.error('OSS删除失败:', error);
    }
  }

  private getKeyFromUrl(url: string): string | null {
    try {
      const urlObj = new URL(url);
      const pathname = urlObj.pathname;
      return pathname.startsWith('/') ? pathname.substring(1) : pathname;
    } catch (error) {
      console.error('解析URL失败:', error);
      return null;
    }
  }
} 