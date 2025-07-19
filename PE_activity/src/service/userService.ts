import { AppDataSource } from '../data-source';
import { UserPO } from '../po/userPo';
import { Provide } from '@midwayjs/core';

@Provide()
export class UserService {
  private userRepo = AppDataSource.getRepository(UserPO);

  // 注册
  async register(phone: string, username: string, password: string) {
    // 检查手机号是否已存在
    const exist = await this.userRepo.findOneBy({ phone });
    if (exist) {
      throw new Error('手机号已注册');
    }
    const user = this.userRepo.create({ phone, username, password });
    await this.userRepo.save(user);
    return { id: user.id, phone: user.phone, username: user.username };
  }

  // 登录
  async login(phone: string, password: string) {
    const user = await this.userRepo.findOneBy({ phone, password });
    if (!user) {
      throw new Error('手机号或密码错误');
    }
    return { id: user.id, phone: user.phone, username: user.username };
  }
} 