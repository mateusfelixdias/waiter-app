import { Request, Response } from 'express';
import { Product } from '../../database/models/Product';

export async function readProductsByCategory(
  { params: { categoryId } }: Request,
  response: Response
) {
  const product = await Product.find({ category: categoryId });

  const { result, status } = handleRead(product);

  return response.status(status).json(result).end();
}

function handleRead(product: any | Array<[]>) {
  if (!product.length) {
    return { result: 'Não têm nenhum produto!', status: 404 };
  }

  return { result: product, status: 200 };
}
