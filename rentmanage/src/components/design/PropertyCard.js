import React from 'react';

const PropertyCard = ({ property }) => {
  // Destructure the property data
  const { name, street, postalCode, city, tenant, rent, isActive } = property || {}; // Default to empty object

  return (
    <div className="border rounded-lg p-4 shadow-lg flex justify-between">
      {/* Left - Property Information */}
      <div className="flex flex-col">
        <h3 className="text-xl font-bold mb-2">{name || 'No name available'}</h3>  {/* Ensure name is defined */}
        <p className="text-gray-700">{street || 'No street provided'}</p>
        <p className="text-gray-700">{postalCode || 'No postal code'}</p>
        <p className="text-gray-700">{city || 'No city provided'}</p>
        <p className="mt-2 text-gray-700 font-semibold">Inquilino: {tenant || 'No tenant'}</p>
        <p className="mt-2 text-gray-700 font-semibold">Renda: {rent ? `${rent} €` : 'No rent available'}</p>
      </div>

      {/* Right - Edit button and status */}
      <div className="flex flex-col justify-between items-end">
        {/* Edit button */}
        <button className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
          Editar
        </button>
        
        {/* Simulated image */}
        <div className="bg-gray-200 w-32 h-32 mt-4 flex items-center justify-center">
          <p className="text-gray-500">Imagem</p>
        </div>

        {/* Active/Inactive status */}
        <span className={`mt-4 text-sm font-bold ${isActive ? 'text-green-500' : 'text-red-500'}`}>
          {isActive ? 'Ativo' : 'Inativo'}
        </span>
      </div>
    </div>
  );
};

export default PropertyCard;
