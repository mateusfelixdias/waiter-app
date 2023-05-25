import { IOrder } from '../../interfaces/Order';
import closeIcon from '../../assets/images/close-icon.svg';
import { currencyFormat } from '../../utils/currencyFormat';

import './index.css';

interface IOrderModal {
  visible: boolean;
  isLoading: boolean;
  order: IOrder | null;
  onClose: () => void;
  onCancelOrder: () => void;
  onOrderStatusChange: () => void;
}

export const OrderModal = ({
  order,
  visible,
  isLoading,
  onClose,
  onCancelOrder,
  onOrderStatusChange,
}: IOrderModal) => {
  if (!visible || !order) return null;

  const { table } = order;

  const total = order.products.reduce((acc, { product, quantity }) => {
    return acc + product.price * quantity;
  }, 0);

  return (
    <div className="overlay">
      <div className="modal-body">
        <header>
          <strong>Mesa {table}</strong>

          <button type="button" onClick={onClose}>
            <img
              src={closeIcon}
              className="image-close-icon"
              alt="Icone para fechar modal!"
            />
          </button>
        </header>

        <div className="status-container">
          <small>Status do pedido</small>

          <div>
            <strong>
              {order.status === 'DONE' && 'Pronto!'}
              {order.status === 'WAITING' && 'Fila de espera'}
              {order.status === 'IN_PRODUCTION' && 'Em preperação'}
            </strong>
          </div>
        </div>

        <div className="orders-datails">
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => {
              return (
                <div className="item" key={_id}>
                  <img
                    width="56"
                    height="28.51"
                    alt={product.name}
                    src={`http://localhost:3000/uploads/${product.imagePath}`}
                  />

                  <span className="quantity">{quantity}x</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>

                    <span>{currencyFormat(product.price)}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="total">
            <span>Total</span>
            <strong>{currencyFormat(total)}</strong>
          </div>
        </div>

        <footer>
          {order.status !== 'DONE' ? (
            <button
              type="button"
              disabled={isLoading}
              className="primary"
              onClick={onOrderStatusChange}
            >
              <strong>
                {order.status === 'WAITING' && 'Iniciar Produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir Pedido'}
              </strong>
            </button>
          ) : null}

          <button
            type="button"
            disabled={isLoading}
            className="secondary"
            onClick={onCancelOrder}
          >
            <strong>Cancelar Pedido</strong>
          </button>
        </footer>
      </div>
    </div>
  );
};
