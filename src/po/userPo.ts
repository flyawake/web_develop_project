import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { UserVO } from '../vo/userVo';

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

  toVO(): UserVO {
    const vo = new UserVO();
    vo.id = this.id;
    vo.phone = this.phone;
    vo.username = this.username;
    vo.role=this.role;
    return vo;
  }
}