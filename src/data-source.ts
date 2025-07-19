import { DataSource } from 'typeorm';
import { UserPO } from './po/userPo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'PE',
  entities: [UserPO],
  synchronize: false, // 自动同步表结构
}); 