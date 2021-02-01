export interface IChatMessage {
  id?: string;
  message: string;
  author: string;
  userId?: string;
  createdAt?: Date;
}