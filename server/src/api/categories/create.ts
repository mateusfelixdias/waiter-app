import { Request, Response } from 'express';
import { Category } from '../../database/models/Category';
import { handleValidationCategory } from '../../utils/validation/categories/create';

export async function create({ body }: Request, response: Response) {
  const validationMessage = handleValidationCategory(body);

  if (validationMessage === true) {
    const category = await Category.create({ ...body });

    return response.status(201).json(category).end();
  }

  return response.status(400).json(validationMessage);
}
