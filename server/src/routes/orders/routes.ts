import { Router } from 'express';

export const orders = Router();

orders.post('/orders');

orders.get('/orders');

orders.patch('/orders/:orderId');

orders.delete('/orders/:orderId');
