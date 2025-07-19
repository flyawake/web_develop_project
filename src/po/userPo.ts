import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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

  toVO(): import('../vo/userVo').UserVO {
    const vo = new (require('../vo/userVo').UserVO)();
    vo.id = this.id;
    vo.phone = this.phone;
    vo.username = this.username;
    return vo;
  }
}