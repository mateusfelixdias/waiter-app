import { Request, Response } from 'express';
import { Order } from '../../database/models/Order';

export async function read(request: Request, response: Response) {
  const orders = await Order.find()
    .sort({ createdAt: 1 })
    .populate('products.product');

  const { result, status } = handleRead(orders);

  return response.status(status).json(result).end();
}

function handleRead(orders: any | Array<[]>) {
  if (!orders.length) {
    return { result: 'Não têm nenhum order!', status: 404 };
  }

  return { result: orders, status: 200 };
}
