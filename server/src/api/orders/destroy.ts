import { Request, Response } from 'express';
import { Order } from '../../database/models/Order';

export async function destroy(
  { params: { orderId } }: Request,
  response: Response
) {
  const order = await Order.findOne({ id: orderId });

  if (!order) return response.status(404).json('Order não encotrado!').end();

  const destroy = Order.deleteOne({ id: orderId }, undefined, (err) => {
    if (err) console.log(err);
  });

  if (!destroy) {
    return response.status(400).json('Não foi possivel deletar o order!').end();
  }

  return response.sendStatus(204);
}
