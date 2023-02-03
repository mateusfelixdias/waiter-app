import logo from '../../assets/images/logo.svg';

import './index.css';

export function Header() {
  return (
    <header className="header-conteiner">
      <div className="page-details">
        <h1>Pedidos</h1>
        <h2>Acompanhe os pedidos dos clientes</h2>
      </div>

      <img src={logo} alt="Waiter App" />
    </header>
  );
}
