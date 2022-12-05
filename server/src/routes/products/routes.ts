import { Router } from 'express';
import { read } from '../../api/products/read';
import { create } from '../../api/products/create';

export const products = Router();

products.post('/products', create);

products.get('/products', read);
