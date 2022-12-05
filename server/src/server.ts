import express from 'express';
import { orders } from './routes/orders/routes';
import { products } from './routes/products/routes';
import { categories } from './routes/categories/routes';
import { connection } from './database/connection/connection';

const app = express();

app.use(express.json());
app.use(categories);
app.use(orders);
app.use(products);

const mongoConnection: Promise<boolean> = connection();
const port: number = 3000;

const server = async () => {
  if (await mongoConnection) {
    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    return;
  }

  console.log('Não foi possivel se conectar ao mongoDB!');
};

server();
