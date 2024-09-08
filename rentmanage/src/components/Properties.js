import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CardList from './design/CardList';  
import PropertyCard from './design/PropertyCard';
import Modal from './design/Modal';
import AddPropertyForm from './design/AddPropertyForm';

function Properties() {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/properties')
      .then(response => setProperties(response.data))
      .catch(error => console.error(error));
  }, []);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);console.log('Modal open clicked');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleAddProperty = (formData) => {
    console.log("handleAddProperty called");
  
    // Send a POST request to your backend
    axios.post('http://localhost:5000/properties', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'  // Ensure the correct content type for file upload
      }
    })
    .then((response) => {
      console.log('Property created successfully:', response.data);
      // Add the newly created property to the state to update the UI
      setProperties([...properties, response.data]);
      handleCloseModal(); // Close the modal after submission
    })
    .catch((error) => {
      console.error('Error creating property:', error);
    });
  };

  return (
    <div>
      <div className='px-20'>
        <div className='flex inline justify-between items-center'>
          <div className='flex inline'>
            <div className='flex inline'>
              <p className='text-lg font-semibold text-gray-600 mb-4'>Imóveis atuais: </p>
              <span className='pl-2 text-lg font-semibold text-gray-600 mb-4'>{properties.length}</span>
            </div>
            <div className='flex inline ml-4'>
              <p className='text-lg font-semibold text-gray-600 mb-4'>Imóveis ativos: </p>
              <span className='pl-2 text-lg font-semibold text-gray-600 mb-4'>{properties.filter(p => p.isActive).length}</span>
            </div>
            <div className='flex inline ml-4'>
              <p className='text-lg font-semibold text-gray-600 mb-4'>Renda mensal atual: </p>
              <span className='pl-2 text-lg font-semibold text-gray-600 mb-4'>
                {properties.reduce((total, property) => total + property.rent, 0)} €
              </span>
            </div>
          </div>
          <div className='flex inline ml-auto'>
            <button className='flex items-center text-blue-600 hover:text-blue-800' onClick={handleOpenModal}>
              <span className='mx-2 text-lg font-semibold'>+</span>
              <p>Adicionar imóvel</p>
            </button>
          </div>
        </div>
      </div>
      <div className="border-b border-gray-300 mt-2 w-full"></div>

      {/* Handle empty state */}
      {properties.length === 0 ? (
        <p className="text-gray-500 text-center">Nenhum imóvel disponível</p>
      ) : (
        <CardList
          items={properties}
          renderItem={property => (
            <PropertyCard key={property.id} property={property} />
          )}
        />
      )}

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-xl font-semibold mb-4">Adicionar Novo Imóvel</h2>
        <AddPropertyForm onSubmit={handleAddProperty} />
      </Modal>
    </div>
  );
}

export default Properties;
