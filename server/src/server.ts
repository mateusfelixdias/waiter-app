import path from 'node:path';
import http from 'node:http';
import express from 'express';
import { Server } from 'socket.io';
import { orders } from './routes/orders/routes';
import { connection } from './database/connection';
import { products } from './routes/products/routes';
import { categories } from './routes/categories/routes';

const app = express();

const createdServer = http.createServer(app);
export const io = new Server(createdServer);

app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  response.setHeader('Access-Control-Allow-Methods', '*');
  response.setHeader('Access-Control-Allow-Headers', '*');

  next();
});

app.use(express.json());

app.use(orders);
app.use(products);
app.use(categories);
app.use('/uploads', express.static(path.resolve(__dirname, '../', 'uploads')));

const mongoConnection: Promise<boolean> = connection();
const port: number = 3000;

const server = async () => {
  if (await mongoConnection) {
    createdServer.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });

    return;
  }

  console.log('Não foi possivel se conectar ao mongoDB!');
};

server();
