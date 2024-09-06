import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaUsers, FaBuilding, FaDollarSign } from 'react-icons/fa';
import CardList from './design/CardList';

const Dashboard = () => {
    // Dados para os cards do dashboard
    const dashboardItems = [
      {
        id: 1,
        title: 'Imóveis Arrendados', // Título do Card
        fields: [
          ['Total de inquilinos: 150', 'Contratos Ativos: 120'], // Linha 1 com múltiplos campos
          ['Inquilinos Pendentes: 10', 'Inquilinos Inativos: 20'], // Linha 2 com múltiplos campos
        ],
      },
      {
        id: 2,
        title: 'Imóveis em obras',
        fields: [
          ['Total de propriedades: 30', 'Vagas: 5'],
          ['Manutenção: 2'],
        ],
      },
      {
        id: 3,
        title: 'Imóveis parados',
        fields: [
          ['Total acumulado: €250,000', 'Receita de 2023: €50,000'],
          ['Previsão 2024: €300,000'],
        ],
      },
    ];

    const dashboardItems2 = [
        {
          id: 1,
          title: 'Inquilinos ativos',
          fields: [
            ['Total acumulado: €250,000', 'Receita de 2023: €50,000'],
            ['Previsão 2024: €300,000'],
          ],
        },
        {
          id: 2,
          title: 'Inquilinos em dívida',
          fields: [
            ['Total acumulado: €250,000', 'Receita de 2023: €50,000'],
            ['Previsão 2024: €300,000'],
          ],
        },
      ];

      const dashboardItems3 = [
        {
          id: 1,
          title: 'Balanço do ano à data',
          fields: [
            ['Total acumulado: €250,000', 'Receita de 2023: €50,000'],
            ['Previsão 2024: €300,000'],
          ],
        },
        {
          id: 2,
          title: 'Imóveis mais rentáveis',
          fields: [
            ['Total acumulado: €250,000', 'Receita de 2023: €50,000'],
            ['Previsão 2024: €300,000'],
          ],
        },
      ];
  
    const handleCardClick = (id) => {
      console.log(`Card com ID ${id} foi clicado`);
    };
  
    return (
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-semibold mb-6">Dashboard</h1>
        
        <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-6'>Imóveis</h2>
            <div className="border-b border-gray-300 mt-2 w-full"></div>
        </div>
        
        <CardList items={dashboardItems} onItemClick={handleCardClick} />

        <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-6'>Inquilinos</h2>
            <div className="border-b border-gray-300 mt-2 w-full"></div>
        </div>

        <CardList items={dashboardItems2} onItemClick={handleCardClick} />

        <div className='mb-6'>
            <h2 className='text-2xl font-semibold mb-6'>Balanço</h2>
            <div className="border-b border-gray-300 mt-2 w-full"></div>
        </div>
        <CardList items={dashboardItems3} onItemClick={handleCardClick} />
      </div>
    );
  };
    
    export default Dashboard;