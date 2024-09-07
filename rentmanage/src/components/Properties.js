import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './design/CardList';  // Assumindo que você tem um CardList existente
import PropertyCard from './design/PropertyCard';

function Properties() {
  /*const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error(error));
  }, []);*/

  const properties = [
    {
      id: 1,
      name: 'Imóvel A',
      street: 'Rua A',
      postalCode: '1234-567',
      city: 'Lisboa',
      tenant: 'João Silva',
      rent: 1200,
      isActive: true
    },
    {
      id: 2,
      name: 'Imóvel B',
      street: 'Rua B',
      postalCode: '8901-234',
      city: 'Porto',
      tenant: 'Maria Souza',
      rent: 950,
      isActive: false
    },
    // Mais imóveis...
  ];

  return (
    <div>
      <div className='px-20'>
        <div className='flex inline'>
          <div className='flex inline justify-between items-center w-[40%]'>
            <div className='flex inline'>
              <p className='text-lg font-semibold text-gray-600 mb-4'>Imóveis atuais: </p>
              <span className='pl-2 text-lg font-semibold text-gray-600 mb-4'>12</span>
            </div>
            <div className='flex inline'>
              <p className='text-lg font-semibold text-gray-600 mb-4'>Imóveis ativos: </p>
              <span className='pl-2 text-lg font-semibold text-gray-600 mb-4'>12</span>
            </div>
            <div className='flex inline'>
              <p className='text-lg font-semibold text-gray-600 mb-4'>Renda mensal atual: </p>
              <span className='pl-2 text-lg font-semibold text-gray-600 mb-4'>2600</span>
            </div>
          </div>
          <div className='flex inline ml-auto'>
            <span className='mx-2'>+</span><p>Adicionar imóvel</p>
        </div>
        </div>
      </div>
      <div className="border-b border-gray-300 mt-2 w-full"></div>

       {/* Use CardList to render PropertyCards */}
       <CardList
        items={properties}
        renderItem={property => (
          <PropertyCard key={property.id} property={property} />
        )}
      />
    </div>
  );
}

export default Properties;
