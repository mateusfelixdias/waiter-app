import { Router } from 'express';
import { read } from '../../api/orders/read';
import { create } from '../../api/orders/create';
import { update } from '../../api/orders/update';
import { destroy } from '../../api/orders/destroy';

export const orders = Router();

orders.post('/orders', create);

orders.get('/orders', read);

orders.patch('/orders/:orderId', update);

orders.delete('/orders/:orderId', destroy);
