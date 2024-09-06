import React from 'react';

// Componente Card
const Card = ({ title, fields, onClick }) => {
  return (
    <div 
      className="bg-white shadow-md rounded-lg p-6 mb-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      {/* Título no canto superior esquerdo */}
      <h3 className="text-lg font-bold text-gray-800 mb-4">
        {title}
      </h3>

      {/* Conteúdo dinamicamente gerado */}
      <div className="space-y-4">
        {fields.map((fieldGroup, index) => (
          <div key={index} className="flex justify-between items-center">
            {/* Renderiza os campos de cada linha */}
            <div className="flex-grow flex space-x-4">
              {fieldGroup.map((field, fieldIndex) => (
                <p key={fieldIndex} className="text-gray-700 text-sm">
                  {field}
                </p>
              ))}
            </div>
            {/* Botão circular com seta fixo à direita */}
            <div className="flex-shrink-0">
              <button 
                className="flex items-center justify-center w-10 h-10 bg-gray-400 hover:bg-gray-300 text-white rounded-full transition-colors"
                onClick={onClick}
              >
                <span className="text-lg font-bold">&gt;</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;

