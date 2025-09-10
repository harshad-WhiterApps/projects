export interface Message {
  id: string;
  fromUserId: string;
  fromUserName: string;
  toUserId: string;
  toUserName: string;
  subject: string;
  content: string;
  attachments: string[];
  isRead: boolean;
  isStarred: boolean;
  parentMessageId?: string;
  createdAt: Date;
  readAt?: Date;
}