import { io } from '../../server';
import { Request, Response } from 'express';
import { Order } from '../../database/models/Order';
import { handleValidationOrder } from '../../utils/validation/orders/create';

export async function create({ body }: Request, response: Response) {
  const validationMessage = handleValidationOrder({ ...body });

  if (validationMessage === true) {
    const order = await Order.create({ ...body });
    const orderDetails = await order.populate('products.product');

    io.emit('orders@new', orderDetails);
    return response.status(201).json(order).end();
  }

  return response.status(400).json(validationMessage);
}
