export interface IChatMessage {
  id?: string;
  message: string;
  author: string;
  createdAt?: Date;
}