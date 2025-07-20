import { DataSource } from 'typeorm';
import { UserPO } from './po/userPo';
import { ActivityPO } from './po/activityPo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'PE',
  entities: [UserPO, ActivityPO],
  synchronize: false, // 自动同步表结构
}); 