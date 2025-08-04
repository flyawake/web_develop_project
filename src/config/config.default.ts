import { MidwayConfig } from '@midwayjs/core';

export default {
  keys: '1687851234567_1234',
  koa: {
    port: 7001,
  },
  security: {
    csrf: {
      enable: false,
    },
  },
  // 阿里云OSS配置
  aliyun: {
    oss: {
      region: '', 
      accessKeyId: '', 
      accessKeySecret: '', 
      bucket: '', 
    },
  },
  // 文件上传配置
  upload: {
    maxSize: 5 * 1024 * 1024, // 5MB
    allowedMimeTypes: ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'],
  },
} as MidwayConfig;
