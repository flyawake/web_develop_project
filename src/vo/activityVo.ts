export class ActivityVO {
  id: number;
  name: string;
  content: string;
  startDate: Date;
  endDate: Date;
  registrationFee: number;

  toPO(): import('../po/activityPo').ActivityPO {
    const po = new (require('../po/activityPo').ActivityPO)();
    po.id = this.id;
    po.name = this.name;
    po.content = this.content;
    po.startDate = this.startDate;
    po.endDate = this.endDate;
    po.registrationFee = this.registrationFee;
    return po;
  }
} 