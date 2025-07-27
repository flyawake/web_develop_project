import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { UserVO } from '../vo/userVo';
import { ActivityPO } from './activityPo';
import { OrderPO } from './orderPo';
import { CommentPO } from './commentPo';

@Entity('users')
export class UserPO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  phone: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  role: number;

  @OneToMany(() => ActivityPO, activity => activity.creator)
  activities: ActivityPO[];

  @OneToMany(() => OrderPO, order => order.user)
  orders: OrderPO[];

  @OneToMany(() => CommentPO, comment => comment.user)
  comments: CommentPO[];

  toVO(): UserVO {
    const vo = new UserVO();
    vo.id = this.id;
    vo.phone = this.phone;
    vo.username = this.username;
    vo.role=this.role;
    return vo;
  }
}