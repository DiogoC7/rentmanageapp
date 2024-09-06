const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const { body, validationResult } = require('express-validator');

//função de pesquisa de contratos, fora da página de detalhe do inquilino
router.get('/', async (req, res) => {
  const { isActive, rentAmountMin, rentAmountMax, endDate, monthsDueMin, MonthsDueMax } = req.query;  // Captura os query parameters
  const where = {};

  if (isActive !== undefined) {
    where.isActive = isActive === 'true';  // Convert to boolean
  }

  if (rentAmountMin !== undefined && rentAmountMax !== undefined) {
    where.rentAmount = {
      gte: parseFloat(rentAmountMin),  // Greater than or equal to rentAmountMin
      lte: parseFloat(rentAmountMax),  // Less than or equal to rentAmountMax
    };
  } else if (rentAmountMin !== undefined) {
    where.rentAmount = { gte: parseFloat(rentAmountMin) };  // Greater than or equal to rentAmountMin
  } else if (rentAmountMax !== undefined) {
    where.rentAmount = { lte: parseFloat(rentAmountMax) };  // Less than or equal to rentAmountMax
  }

  if (endDate !== undefined) {
    where.endDate = Date(endDate);  
  }
  
  if (monthsDueMin !== undefined && MonthsDueMax !== undefined) {
    where.monthsDue = {
      gte: parseFloat(monthsDueMin),  // Greater than or equal to monthsDueMin
      lte: parseFloat(MonthsDueMax),  // Less than or equal to MonthsDueMax
    };
  } else if (monthsDueMin !== undefined) {
    where.monthsDue = { gte: parseFloat(monthsDueMin) };  // Greater than or equal to monthsDueMin
  } else if (MonthsDueMax !== undefined) {
    where.monthsDue = { gte: parseFloat(monthsDueMin) };  // Greater than or equal to monthsDueMin
  }

  try {
    // Find contracts based on the 'where' conditions
    const rentalContracts = await prisma.rentalContract.findMany({
      where: where,
      include: {
        tenant: true,  // Include contracts if needed in the results
      },
    });
    
    res.status(200).json(rentalContracts);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao procurar os contratos de arrendamento.' });
    }
  });


//função de pesquisa de contratos, na página de detalhe do inquilino
router.get('/tenants/:tenantId/contracts', async (req, res) => {
  const { tenantId } = req.params;  // Recolhe o tenantId da URL

  try {
    let rentalContracts;
    

    if (isActive !== undefined) {
      // Converte para booleano e filtra por contratos ativos/inativos
      const isActiveBool = isActive === 'true';
      rentalContracts = await prisma.rentalContract.findMany({
        where: {
          tenantId: parseInt(tenantId), // Filtra pelos contratos do inquilino
          isActive: isActiveBool,  
        },

    // Procura todos os contratos associados a um inquilino específico
    })} else { 
      
      rentalContracts = await prisma.rentalContract.findMany({
      where: {
        tenantId: parseInt(tenantId),  // Filtra pelos contratos do inquilino
      },
    });
    }

    if (rentalContracts.length === 0) {
      return res.status(404).json({ message: 'Nenhum contrato encontrado para este inquilino.' });
    }

    // Retorna os contratos do inquilino
    res.status(200).json(rentalContracts);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao procurar os contratos do inquilino.' });
  }
});


router.post('/tenants/:tenantId/contracts', 
    
    async (req, res) => {
    const { tenantId } = req.params;  // Captura o tenantId da URL
    const { propertyId, startDate, endDate, rentAmount, paidUntil, monthsDue, totalDue, extraMonth, isActive } = req.body;
  
    // Validate if all required fields are provided
    if (!propertyId || !startDate || !rentAmount) {
      return res.status(400).json({ error: 'propertyId, startDate, and rentAmount are required.' });
    }
  
    try {
      // Create a new rental contract
      const newRentalContract = await prisma.rentalContract.create({
        data: {
          propertyId: parseInt(propertyId), // Ensure IDs are integers
          tenantId: parseInt(tenantId),
          startDate: new Date(startDate),  // Ensure dates are in the correct format
          endDate: endDate ? new Date(endDate) : null,  // Optional end date
          rentAmount: parseFloat(rentAmount),
          paidUntil: paidUntil ? new Date(paidUntil) : null, // Optional field
          extraMonth: extraMonth ?? false,
          monthsDue: parseInt(monthsDue) ?? 0, // Optional field that defaults to 0 if no value
          totalDue: parseFloat(totalDue) ?? 0, // Optional field that defaults to 0 if no value
          isActive: isActive ?? true,  //defaults to true if not provided
        },
      });
  
      // Return the created rental contract
      res.status(201).json(newRentalContract);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar o novo contrato. Volte a tentar ou contacte o administrador.' });
    }
  });
  
  module.exports = router;