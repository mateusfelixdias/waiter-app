import { model, Schema } from 'mongoose';
import { IProduct } from '../../interfaces/Product';

const productSchema = new Schema<IProduct>(
  {
    category: { type: Schema.Types.ObjectId, required: true, ref: 'Category' },
    description: { type: String, required: true },
    imagePath: { type: String, required: true },
    ingredients: {
      type: [
        {
          icon: { type: String, required: true },
          name: { type: String, required: true },
        },
      ],
      required: false,
      default: []
    },
    name: { type: String, required: true },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Product = model('Product', productSchema);
