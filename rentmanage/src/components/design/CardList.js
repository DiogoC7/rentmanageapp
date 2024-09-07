import React from 'react';
import Card from './Card'; // Import the default Card component

// Componente CardList para gerar múltiplos cards dinamicamente
const CardList = ({ items = [], onItemClick, renderItem }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {items.map((item) => (
        <div key={item.id}>
          {/* Use renderItem if provided, otherwise render Card */}
          {renderItem ? (
            renderItem(item)
          ) : (
            <Card
              title={item.title}
              fields={item.fields}
              onClick={() => onItemClick(item.id)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default CardList;
