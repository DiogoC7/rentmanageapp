import React, { useState } from 'react';

const Sidebar = () => {
  // Estado para controlar os menus que estão abertos
  const [openMenus, setOpenMenus] = useState({});

  // Função para alternar o estado de um submenu
  const toggleMenu = (menu) => {
    setOpenMenus((prevState) => ({
      ...prevState,
      [menu]: !prevState[menu], // Inverte o estado (abre ou fecha o submenu)
    }));
  };

  return (
    <div className="bg-gray-800 text-white h-screen w-50 p-6">
      <h2 className="text-2xl font-semibold mb-6">Menu</h2>

      {/* Menu Item 1 */}
      <div>
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:bg-gray-700"
          onClick={() => toggleMenu('menu1')}
        >
          <span>Imóveis</span>
          <span>{openMenus['menu1'] ? '-' : '+'}</span> {/* Ícone para expandir/colapsar */}
        </button>
        {openMenus['menu1'] && (
          <ul className="pl-4">
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 1.1</li>
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 1.2</li>
          </ul>
        )}
      </div>

      {/* Menu Item 2 */}
      <div className="mt-4">
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:bg-gray-700"
          onClick={() => toggleMenu('menu2')}
        >
          <span>Inquilinos</span>
          <span>{openMenus['menu2'] ? '-' : '+'}</span>
        </button>
        {openMenus['menu2'] && (
          <ul className="pl-4">
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 2.1</li>
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 2.2</li>
          </ul>
        )}
      </div>

      {/* Menu Item 3 */}
      <div className="mt-4">
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:bg-gray-700"
          onClick={() => toggleMenu('menu3')}
        >
          <span>Contratos</span>
          <span>{openMenus['menu3'] ? '-' : '+'}</span>
        </button>
        {openMenus['menu3'] && (
          <ul className="pl-4">
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 3.1</li>
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 3.2</li>
          </ul>
        )}
      </div>

      {/* Menu Item 3 */}
      <div className="mt-4">
        <button 
          className="w-full text-left flex justify-between items-center py-2 px-4 hover:bg-gray-700"
          onClick={() => toggleMenu('menu3')}
        >
          <span>Análise</span>
          <span>{openMenus['menu3'] ? '-' : '+'}</span>
        </button>
        {openMenus['menu3'] && (
          <ul className="pl-4">
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 3.1</li>
            <li className="py-1 hover:bg-gray-700 px-2">Submenu 3.2</li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
