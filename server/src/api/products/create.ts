import { Request, Response } from 'express';
import { Product } from '../../database/models/Product';
import { handleValidationProduct } from '../../utils/validation/products/create';

export async function create(request: Request, response: Response) {
  const { body, file } = request;

  const imagePath = file?.filename || '';
  const ingredientsConvertedToObj = body?.ingredients
    ? JSON.parse(body.ingredients)
    : [];

  const validationMessage = handleValidationProduct({
    ...body,
    imagePath,
    ingredients: ingredientsConvertedToObj,
  });

  if (validationMessage === true) {
    const product = await Product.create({
      ...body,
      imagePath,
      ingredients: ingredientsConvertedToObj,
    });

    return response.status(201).json(product).end();
  }

  return response.status(400).json(validationMessage);
}
