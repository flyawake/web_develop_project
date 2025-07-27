import { DataSource } from 'typeorm';
import { UserPO } from './po/userPo';
import { ActivityPO } from './po/activityPo';
import { OrderPO } from './po/orderPo';
import { CommentPO } from './po/commentPo';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '123456',
  database: 'PE',
  entities: [UserPO, ActivityPO, OrderPO, CommentPO],
  synchronize: true,
}); 