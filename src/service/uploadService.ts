import { Provide, Inject } from '@midwayjs/core';
import { OSSConfig } from '../config/oss.config';

@Provide()
export class UploadService {
  @Inject()
  ossConfig: OSSConfig;

  /**
   * 上传图片文件
   * @param file 文件对象
   * @returns Promise<string> 返回图片URL
   */
  async uploadImage(file: Express.Multer.File): Promise<string> {
    // 验证文件类型
    if (!this.isValidImageFile(file)) {
      throw new Error('只支持上传图片文件 (jpg, jpeg, png, gif)');
    }

    // 验证文件大小 (限制为5MB)
    if (file.size > 5 * 1024 * 1024) {
      throw new Error('图片文件大小不能超过5MB');
    }

    try {
      const imageUrl = await this.ossConfig.uploadFile(file);
      return imageUrl;
    } catch (error) {
      console.error('图片上传失败:', error);
      throw new Error('图片上传失败');
    }
  }

  /**
   * 验证是否为有效的图片文件
   * @param file 文件对象
   * @returns boolean
   */
  private isValidImageFile(file: Express.Multer.File): boolean {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    return allowedMimeTypes.includes(file.mimetype);
  }

  /**
   * 删除图片文件
   * @param imageUrl 图片URL
   */
  async deleteImage(imageUrl: string): Promise<void> {
    try {
      await this.ossConfig.deleteFile(imageUrl);
    } catch (error) {
      console.error('删除图片失败:', error);
    }
  }
} 