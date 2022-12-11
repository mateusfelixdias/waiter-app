import { Router } from 'express';
import { read } from '../../api/products/read';
import { create } from '../../api/products/create';
import { upload } from '../../api/products/upload';

export const products = Router();

products.post('/products', upload.single('image'), create);

products.get('/products', read);
