import { Request, Response } from 'express';
import { Product } from '../../database/models/Product';

export async function read(request: Request, response: Response) {
  const products = await Product.find();

  const { result, status } = handleRead(products);

  return response.status(status).json(result).end();
}

function handleRead(categories: any | []) {
  if (!categories.length) {
    return { result: 'Não têm nenhum produto cadastrado!', status: 404 };
  }

  return { result: categories, status: 200 };
}
