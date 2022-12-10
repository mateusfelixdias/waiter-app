import { Request, Response } from 'express';
import { Order } from '../../database/models/Order';
import { handleValidationOrder } from '../../utils/validation/orders/create';

export async function create({ body }: Request, response: Response) {
  const validationMessage = handleValidationOrder({ ...body });

  if (validationMessage === true) {
    const order = await Order.create({
      ...body,
    });

    return response.status(201).json(order).end();
  }

  return response.status(400).json(validationMessage);
}
