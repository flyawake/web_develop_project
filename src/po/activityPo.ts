import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ActivityVO } from '../vo/activityVo';

@Entity('activities')
export class ActivityPO {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  content: string;

  @Column('date')
  startDate: Date;

  @Column('date')
  endDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  registrationFee: number;

  toVO(): ActivityVO {
    const vo = new ActivityVO();
    vo.id = this.id;
    vo.name = this.name;
    vo.content = this.content;
    vo.startDate = this.startDate;
    vo.endDate = this.endDate;
    vo.registrationFee = this.registrationFee;
    return vo;
  }
} 