import { model, Schema } from 'mongoose';
import { ICategory } from '../../interfaces/Category';

const categorySchema = new Schema<ICategory>(
  {
    name: { type: String, required: true },
    icon: { type: String, required: true },
  },
  { timestamps: true }
);

export const Category = model('Category', categorySchema);
