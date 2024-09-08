import React, { useState } from 'react';

const AddPropertyForm = ({ onSubmit }) => {
    // State variables for each form field
    const [name, setName] = useState('');
    const [street, setStreet] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [city, setCity] = useState('');
    const [year, setYear] = useState('');
    const [occupied, setOccupied] = useState(false); // default is false
    const [description, setDescription] = useState('');
    const [typology, setTypology] = useState('');
    const [hasWorks, setHasWorks] = useState(false); // default is false
    const [image, setImage] = useState(null); // Image file
  
    const handleImageChange = (e) => {
      setImage(e.target.files[0]); // Get the uploaded file
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        console.log('Form submitted!'); // Add this to check if submit is being triggered
        // Validation for typology
        const typologyRegex = /^T\d+$/;
        if (!typologyRegex.test(typology)) {
          alert("Tipologia deve estar no formato 'Tx', onde x é um número.");
          return; // Prevent form submission if validation fails
        }
      
        const formData = new FormData();
        formData.append('name', name);
        formData.append('street', street);
        formData.append('postalCode', postalCode);
        formData.append('city', city);
        formData.append('year', year);
        formData.append('occupied', occupied);
        formData.append('description', description);
        formData.append('typology', typology);
        formData.append('hasWorks', hasWorks);
        if (image) formData.append('image', image); // Add the image if present
      
        try {
          // Call the onSubmit function passed via props
          await onSubmit(formData);  // Make sure this sends the form data to the parent component
        } catch (error) {
          console.error('Form submission failed:', error);
        }
      };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Name */}
      <div className="mb-4">
        <label className="block text-gray-700">Nome:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Street */}
      <div className="mb-4">
        <label className="block text-gray-700">Rua:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
          required
        />
      </div>

      {/* Postal Code */}
      <div className="mb-4">
        <label className="block text-gray-700">Código Postal:</label>
        <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
            />
      </div>

      {/* City */}
      <div className="mb-4">
        <label className="block text-gray-700">Cidade:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
      </div>

      {/* Year */}
      <div className="mb-4">
        <label className="block text-gray-700">Ano:</label>
        <input
          type="number"
          className="w-full p-2 border border-gray-300 rounded"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          required
        />
      </div>

      {/* Occupied Checkbox */}
      <div className="mb-4">
        <label className="block text-gray-700">Ocupado:</label>
        <input
          type="checkbox"
          className="mr-2 leading-tight"
          checked={occupied}
          onChange={(e) => setOccupied(e.target.checked)}
        />
        <span className="text-gray-700">Sim</span>
      </div>

      {/* HasWorks Checkbox */}
      <div className="mb-4">
        <label className="block text-gray-700">Está em obras:</label>
        <input
          type="checkbox"
          className="mr-2 leading-tight"
          checked={hasWorks}
          onChange={(e) => setHasWorks(e.target.checked)}
        />
        <span className="text-gray-700">Sim</span>
      </div>

      {/* Description (Optional) */}
      <div className="mb-4">
        <label className="block text-gray-700">Descrição (opcional):</label>
        <textarea
          className="w-full p-2 border border-gray-300 rounded"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      {/* Typology */}
      <div className="mb-4">
        <label className="block text-gray-700">Tipologia:</label>
        <input
          type="text"
          className="w-full p-2 border border-gray-300 rounded"
          value={typology}
          onChange={(e) => setTypology(e.target.value)}
          placeholder="Ex: T2"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700">Upload da Imagem (opcional):</label>
        <input
          type="file"
          className="w-full p-2 border border-gray-300 rounded"
          onChange={handleImageChange}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Adicionar Imóvel
      </button>
    </form>
  );
};

export default AddPropertyForm;
