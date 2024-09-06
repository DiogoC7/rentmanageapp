import React from 'react';
import Card from './Card'; // Importa o componente Card

// Componente CardList para gerar múltiplos cards
const CardList = ({ items, onItemClick }) => {
  return (
    <div>
      {/* Mapeia e exibe os itens na lista */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <Card
            key={item.id}
            title={item.title} // Passa o título para o Card
            fields={item.fields} // Passa os campos para o Card
            onClick={() => onItemClick(item.id)} // Função de clique para cada Card
          />
        ))}
      </div>
    </div>
  );
};

export default CardList;
