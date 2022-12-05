import { Request, Response } from 'express';
import { Product } from '../../database/models/Product';
import { handleValidationProduct } from '../../utils/validation/products/create';

export async function create({ body }: Request, response: Response) {
  const validationMessage = handleValidationProduct(body);

  if (validationMessage === true) {
    const product = await Product.create({ ...body });

    return response.status(201).json(product).end();
  }

  return response.status(400).json(validationMessage);
}
