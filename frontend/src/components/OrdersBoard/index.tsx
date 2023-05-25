import { useState } from 'react';
import { api } from '../../services';
import { toast } from 'react-toastify';
import { OrderModal } from '../OrderModal';
import { IOrder } from '../../interfaces/Order';
import { IOrdersBoard } from '../../interfaces/OrdersBoard';

import './index.css';

export const OrdersBoard = ({
  title,
  orders,
  onCancelOrder,
  onOrderStatusChange,
}: IOrdersBoard) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const handleOpenModal = (order: IOrder) => {
    setIsModalVisible(true);
    setSelectedOrder(order);
  };

  const handleCloseModal = () => {
    setSelectedOrder(null);
    setIsModalVisible(false);
  };

  const handleOrderStatusChange = async () => {
    try {
      const { status } = selectedOrder || {};
      const newStatus = status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

      await api.patch(`/orders/${selectedOrder!._id}`, { status: newStatus });

      onOrderStatusChange(selectedOrder!._id, newStatus);

      const { table } = selectedOrder || {};
      toast.success(`O status dá mesa ${table} foi alterado!`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  const handleCancelOrder = async () => {
    try {
      setIsLoading(true);

      await api.delete(`/orders/${selectedOrder!._id}`);

      const { table } = selectedOrder || {};
      toast.success(`O pedido dá mesa ${table} foi cancelado!`);
    } catch (err) {
      console.log(err);
    } finally {
      onCancelOrder(selectedOrder!._id);

      setIsLoading(false);
      setIsModalVisible(false);
    }
  };

  return (
    <>
      <OrderModal
        order={selectedOrder}
        isLoading={isLoading}
        visible={isModalVisible}
        onClose={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />

      <div className="board-conteiner">
        <header>
          <strong>{title}</strong>
          <span>(1)</span>
        </header>

        <div className="orders-conteiner">
          {orders.map((order) => {
            const { _id, products, table } = order;
            const length = products.length;

            return (
              <button
                key={_id}
                type="button"
                onClick={() => handleOpenModal(order)}
              >
                <strong>Mesa {table}</strong>

                <span>{length} Item(s)</span>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
