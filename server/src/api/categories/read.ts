import { Request, Response } from 'express';
import { Category } from '../../database/models/Category';
import { handleRead } from '../../utils/validation/categories/read';

export async function read(request: Request, response: Response) {
  const categories = await Category.find();

  const { status, result } = handleRead(categories);

  return response.status(status).json(result).end();
}
