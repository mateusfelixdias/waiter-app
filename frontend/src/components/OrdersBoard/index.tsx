import './index.css';

export const OrdersBoard = () => {
  return (
    <div className="board-conteiner">
      <header>
        <strong>Fila de espera</strong>
        <span>(1)</span>
      </header>

      <div className="orders-conteiner">
        <button type="button">
          <strong>Mesa 2</strong>

          <span>2 Itens</span>
        </button>

        <button type="button">
          <strong>Mesa 2</strong>

          <span>2 Itens</span>
        </button>
      </div>
    </div>
  );
};
