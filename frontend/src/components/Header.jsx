import React from 'react';

const Header = () => {
  return (
    <header className="app-header">
      <div className="app-header__brand">
        <span className="app-header__logo">🎫</span>
        <div>
          <h1 className="app-header__title">TicketFlow</h1>
          <p className="app-header__subtitle">IT Support Ticket Dashboard</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
