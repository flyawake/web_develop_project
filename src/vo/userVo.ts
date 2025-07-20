export class UserVO {
  id: number;
  phone: string;
  username: string;
  role: number;

  toPO(): import('../po/userPo').UserPO {
    const po = new (require('../po/userPo').UserPO)();
    po.id = this.id;
    po.phone = this.phone;
    po.username = this.username;
    po.role=this.role;
    return po;
  }
} 