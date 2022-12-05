import { Request, Response } from 'express';
import { Product } from '../../database/models/Product';
import { handleRead } from '../../utils/validation/products/read';

export async function read(request: Request, response: Response) {
  const products = await Product.find();

  const { result, status } = handleRead(products);

  return response.status(status).json(result).end();
}
