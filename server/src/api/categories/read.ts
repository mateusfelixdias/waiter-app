import { Request, Response } from 'express';
import { Category } from '../../database/models/Category';

export async function read(request: Request, response: Response) {
  const categories = await Category.find();

  const { status, result } = handleRead(categories);

  return response.status(status).json(result).end();
}

function handleRead(categories: any | Array<[]>) {
  if (!categories.length) {
    return { result: 'Não têm nenhuma categoria cadastrada!', status: 404 };
  }

  return { result: categories, status: 200 };
}
