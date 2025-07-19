export class UserVO {
  id: number;
  phone: string;
  username: string;

  toPO(): import('../po/userPo').UserPO {
    const po = new (require('../po/userPo').UserPO)();
    po.id = this.id;
    po.phone = this.phone;
    po.username = this.username;
    // password字段无法从VO获取，如有需要请手动赋值
    return po;
  }
} 