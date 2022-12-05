import { Schema } from 'mongoose';

export interface IProduct {
  name: string;
  decription: string;
  imagePath: string;
  price: number;
  ingredients: Array<{ icon: string; name: string }>;
  category: Schema.Types.ObjectId;
}
