import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/images/rent-manage-logo.png';

const Sidebar = () => {
  // Estado para controlar os menus que estão abertos
  const [openMenus, setOpenMenus] = useState({});

  const navigate = useNavigate();

  // Função para alternar o estado de um submenu
  const toggleMenu = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Inverte o estado (abre ou fecha o submenu)
    }));
  };

  return (
    <div className="bg-gray-800 text-white min-h-screen w-[150px] p-6">
      <div className="mb-6">
        <img src={logo} alt="Logo" className="h-12 w-auto m-auto" /> {/* Adjust size as needed */}
      </div>

      {/* Menu Item 1 */}
      <div>
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:font-semibold whitespace-nowrap"
          onClick={() => navigate('/properties')}
        >
          <span>Imóveis</span>
        </button>
      </div>

      {/* Menu Item 2 */}
      <div className="mt-4">
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:font-semibold whitespace-nowrap"
          onClick={() => toggleMenu('menu2')}
        >
          <span>Inquilinos</span>
        </button>
      </div>

      {/* Menu Item 3 */}
      <div className="mt-4">
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:font-semibold whitespace-nowrap"
          onClick={() => toggleMenu('menu3')}
        >
          <span>Contratos</span>
        </button>
      </div>

      {/* Menu Item 3 */}
      <div className="mt-4">
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:font-semibold"
          onClick={() => toggleMenu('menu3')}
        >
          <span>Análise</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
