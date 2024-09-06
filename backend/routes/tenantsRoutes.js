const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const { body, validationResult } = require('express-validator');

router.get('/', async (req, res) => {
  const { isActive, hasDebt } = req.query;  // Capture query parameters
  
  // Initialize the 'where' object that will be passed to Prisma
  const where = {};
  
  // Check if 'isActive' was provided and is a valid boolean string
  if (isActive !== undefined) {
    where.isActive = isActive === 'true';  // Convert to boolean
  }
  
  // Check if 'hasDebt' was provided and is a valid boolean string
  if (hasDebt !== undefined) {
    const hasDebtBool = hasDebt === 'true';  // Convert to boolean
    
    if (hasDebtBool) {
      // Filter for tenants who have at least one contract with debt (totalDue > 0)
      where.rentalContracts = {
        some: { totalDue: { gt: 0 } },  // At least one contract with debt
      };
    } else {
      // Filter for tenants who have no contracts with debt (totalDue = 0)
      where.rentalContracts = {
        every: { totalDue: 0 },  // All contracts have no debt
      };
    }
  }
  
  try {
    // Find tenants based on the 'where' conditions
    const tenants = await prisma.tenant.findMany({
      where: where,
      include: {
        rentalContracts: true,  // Include contracts if needed in the results
      },
    });
    
    res.status(200).json(tenants);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao procurar os inquilinos.' });
    }
  });


  router.post('/', 
    
    [
        // Validate NIF (Número de Contribuinte)
        body('nif')
          .matches(/^[1|2|5|6|7|8|9][0-9]{8}$/)
          .withMessage('Tem que inserir um número de contribuinte válido.'),
    
        // Validate Email
        body('email')
          .isEmail()
          .withMessage('Tem que inserir um email válido.'),
    
        // Validate Phone Number
        body('phoneNumber')
          .matches(/^9[12369]\d{7}$/)
          .withMessage('Tem que inserir um número de telemóvel válido.'),
      ],

    async (req, res) => {
      // Check if there are any validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    
    const { firstName, lastName, email, phoneNumber, nif, isActive } = req.body;
  
    // Validate if all required fields are provided
    if (!firstName || !lastName || !phoneNumber) {
      return res.status(400).json({ error: 'Tem que preencher todos os campos obrigatórios (Primeiro nome, último nome e número de telemóvel).' });
    }
  
    try {
      // Create a new tenant
      const newTenant = await prisma.tenant.create({
        data: {
          firstName: firstName, // Ensure IDs are integers
          lastName: lastName,
          email: new Date(startDate),  // Ensure dates are in the correct format
          endDate: endDate ? new Date(endDate) : null,  // Optional end date
          rentAmount: parseFloat(rentAmount),
          paidUntil: paidUntil ? new Date(paidUntil) : null, // Optional field
          extraMonth: extraMonth ?? false,
          monthsDue: parseInt(monthsDue) ?? 0, // Optional field that defaults to 0 if no value
          totalDue: parseFloat(totalDue) ?? 0, // Optional field that defaults to 0 if no value
          isActive: isActive ?? true,  //Defaults to true if not provided
        },
      });
  
      // Return the created tenant
      res.status(201).json(newTenant);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar o novo inquilino. Volte a tentar ou contacte o administrador.' });
    }
  });
  
  module.exports = router;