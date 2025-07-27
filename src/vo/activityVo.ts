export class ActivityVO {
  id: number;
  title: string;
  description: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  startTime: Date;
  endTime: Date;
  status: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  creatorId: number;
  creatorName: string;
} 