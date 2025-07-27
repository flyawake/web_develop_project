import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany } from 'typeorm';
import { UserPO } from './userPo';
import { OrderPO } from './orderPo';
import { CommentPO } from './commentPo';

@Entity('activities')
export class ActivityPO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column('text')
  description: string;

  @Column()
  location: string;

  @Column()
  maxParticipants: number;

  @Column()
  currentParticipants: number;

  @Column('datetime')
  startTime: Date;

  @Column('datetime')
  endTime: Date;

  @Column()
  status: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserPO, user => user.activities)
  creator: UserPO;

  @OneToMany(() => OrderPO, order => order.activity)
  orders: OrderPO[];

  @OneToMany(() => CommentPO, comment => comment.activity)
  comments: CommentPO[];
} 