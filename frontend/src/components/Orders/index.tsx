import { OrdersBoard } from '../OrdersBoard';

import './index.css';

export function Orders() {
  return (
    <div className="conteiner">
      <OrdersBoard />
      <OrdersBoard />
      <OrdersBoard />
    </div>
  );
}
