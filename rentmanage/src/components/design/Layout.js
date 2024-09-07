import React from 'react';
import Sidebar from './Sidebar'; // Importa o componente Sidebar
import { Outlet } from 'react-router-dom'; // Importa o Outlet para renderizar as rotas dinâmicas
import { useLocation, Link } from 'react-router-dom';

// Function to generate breadcrumbs from the current path
const Breadcrumbs = () => {
  const location = useLocation();
  
  // Split the pathname into parts (excluding the root "/")
  const pathnames = location.pathname.split('/').filter(x => x);

  return (
    <nav className="text-gray-500 text-sm mb-4">
      <ul className="flex space-x-1">
        {/* Root breadcrumb */}
        <li>
          <Link to="/" className="text-blue-500 hover:underline">Home</Link>
          {pathnames.length > 0 && <span className="mx-1">{'>'}</span>}
        </li>

        {/* Breadcrumbs for each path segment */}
        {pathnames.map((value, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          
          // If it's the last element, don't make it a link
          const isLast = index === pathnames.length - 1;
          return (
            <li key={index} className="flex items-center">
              {isLast ? (
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              ) : (
                <Link to={routeTo} className="text-blue-500 hover:underline">
                  {value.charAt(0).toUpperCase() + value.slice(1)}
                </Link>
              )}
              {!isLast && <span className="mx-1">{'>'}</span>}
            </li>
          );
        })}
      </ul>
    </nav>
  );
};


const Layout = () => {
  return (
    <div className="flex">
      {/* Sidebar always present */}
      <Sidebar />
      
      {/* Dynamic content */}
      <div className="flex-grow p-6">
        {/* Breadcrumbs at the top */}
        <Breadcrumbs />

        {/* Outlet renders the content for the current route */}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;