import { Router } from 'express';
import { create } from '../../api/categories/create';
import { read } from '../../api/categories/read';

export const categories = Router();

categories.post('/categories', create);

categories.get('/categories', read);

categories.get('/categories/:categoryId/products');
