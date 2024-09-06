import React from 'react';
import Sidebar from './Sidebar'; // Importa o componente Sidebar
import { Outlet } from 'react-router-dom'; // Importa o Outlet para renderizar as rotas dinâmicas

const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar sempre presente */}
      <Sidebar />
      
      {/* Conteúdo da página dinâmico */}
      <div className="flex-grow p-6">
        {/* Outlet vai renderizar o conteúdo das rotas */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;