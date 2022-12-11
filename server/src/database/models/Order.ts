import { model, Schema } from 'mongoose';
import { IOrder } from '../../interfaces/Order';

const orderSchema = new Schema<IOrder>({
  table: { type: String, required: true },
  createdAt: { type: Date, required: false, default: Date.now },
  status: {
    type: String,
    enum: ['WAITING', 'IN_PRODUCTION', 'DONE'],
    default: 'WAITING',
  },
  products: {
    type: [
      {
        product: {
          type: Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
        quantity: { type: Number, default: 1 },
      },
    ],
    required: true,
  },
});

export const Order = model<IOrder>('Order', orderSchema);
