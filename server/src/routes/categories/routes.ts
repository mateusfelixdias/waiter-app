import { Router } from 'express';
import { read } from '../../api/categories/read';
import { create } from '../../api/categories/create';
import { readProductsByCategory } from '../../api/categories/readProductsByCategory';

export const categories = Router();

categories.post('/categories', create);

categories.get('/categories', read);

categories.get('/categories/:categoryId/products', readProductsByCategory);
