import { IOrder } from './Order';

export interface IOrdersBoard {
  title: string;
  orders: IOrder[];
  onCancelOrder: (orderId: string) => void;
  onOrderStatusChange: (orderId: string, status: IOrder['status']) => void;
}
