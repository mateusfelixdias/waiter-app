import { Request, Response } from 'express';
import { Order } from '../../database/models/Order';

export async function update(
  { body: { status: orderStatus }, params: { orderId } }: Request,
  response: Response
) {
  const order = await Order.findOne({ id: orderId });

  if (!order) return response.status(404).json('Order não encotrado!').end();

  const checkStatus = statusValidation(orderStatus);

  if (typeof checkStatus === 'string') return response.status(400).json(checkStatus).end();

  const update = await Order.updateOne(
    { id: orderId },
    { status: orderStatus },
    null,
    (err) => {
      if (err) throw err;
    }
  ).clone().catch((err) => console.log(err));

  const { result, status } = handleupdate(update);

  if (!result) return response.sendStatus(status);

  return response.status(status).json(result).end();
}

function statusValidation(status: string) {
  const statusOptions = ['WAITING', 'IN_PRODUCTION', 'DONE'];

  if (!statusOptions.includes(status)) {
    return 'Status inválido, o deve ser uma dessas opções: WAITING, IN_PRODUCTION, DONE';
  }

  return true;
}

function handleupdate(update: any | Array<[]>) {
  if (!update) {
    return {
      result: 'Não foi possivel atulizar o status do pedido.',
      status: 400,
    };
  }

  return { status: 204 };
}
