import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserPO } from './userPo';
import { ActivityPO } from './activityPo';

@Entity('orders')
export class OrderPO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column('text')
  note: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserPO, user => user.orders)
  user: UserPO;

  @ManyToOne(() => ActivityPO, activity => activity.orders)
  activity: ActivityPO;
} 