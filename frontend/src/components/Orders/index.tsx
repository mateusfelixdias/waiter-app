import { api } from '../../services';
import socketIo from 'socket.io-client';
import { useEffect, useState } from 'react';
import { OrdersBoard } from '../OrdersBoard';
import { IOrder } from '../../interfaces/Order';

import './index.css';

export function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);

  useEffect(() => {
    const socket = socketIo('http://localhost:3000', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order) => {
      setOrders((prevState) => prevState.concat(order));
    });
  }, []);

  useEffect(() => {
    const handleOrders = async () => {
      try {
        const { data, status } = await api.get('/orders');

        if (status === 200) setOrders(data);
      } catch (err) {
        console.log(err);
      }
    };

    handleOrders();
  }, []);

  const done = orders.filter(({ status }) => status === 'DONE');
  const waiting = orders.filter(({ status }) => status === 'WAITING');
  const inProduction = orders.filter(({ status }) => {
    return status === 'IN_PRODUCTION';
  });

  const handleCancelOrder = (orderId: string) => {
    setOrders((prevState) => prevState.filter(({ _id }) => _id !== orderId));
  };

  const handleOrderStatusChange = (
    orderId: string,
    status: IOrder['status']
  ) => {
    setOrders((prevState) => {
      return prevState.map((order) => {
        return orderId === order._id ? { ...order, status } : order;
      });
    });
  };

  return (
    <div className="conteiner">
      <OrdersBoard
        orders={waiting}
        title="Fila de espera"
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />

      <OrdersBoard
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      
      <OrdersBoard
        orders={done}
        title="Pronto"
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </div>
  );
}
