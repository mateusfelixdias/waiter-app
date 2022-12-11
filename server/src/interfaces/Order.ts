import { Schema } from 'mongoose';

export interface IOrder {
  table: string;
  createdAt?: Date;
  status: 'WAITING' | 'IN_PRODUCTION' | 'DONE';
  products: Array<{ product: Schema.Types.ObjectId; quantity: number }>;
}
