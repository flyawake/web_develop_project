import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { UserPO } from './userPo';
import { ActivityPO } from './activityPo';

@Entity('comments')
export class CommentPO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  content: string;

  @Column()
  rating: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => UserPO, user => user.comments)
  user: UserPO;

  @ManyToOne(() => ActivityPO, activity => activity.comments)
  activity: ActivityPO;
} 