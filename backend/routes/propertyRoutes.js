const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const { body, validationResult } = require('express-validator');


router.get('/', async (req, res) => {
  const { typology, occupied, minimumYear, maximumYear } = req.query;  // Capture query parameters
  
  // Initialize the 'where' object that will be passed to Prisma
  const where = {};
  
  // Check if 'occupied' was provided and is a valid boolean string
  if (occupied !== undefined) {
    where.occupied = occupied === 'true';  // Convert to boolean
  }
  
  //check the typology of the property
  if (typology !== undefined) {
    where.typology = typology;
  }

  if (minimumYear !== undefined && maximumYear !==undefined) {
    where.year = {
      gte: parseInt(minimumYear),  // Greater than or equal to rentAmountMin
      lte: parseInt(maximumYear),  // Less than or equal to rentAmountMax
    };
  } else if (minimumYear !== undefined) {
      where.year = {
      gte: parseInt(minimumYear),
    };
  }
    else if (maximumYear !== undefined) {
      where.year = {
        lte: parseInt(maximumYear),
      };
  }
  
  try {
    // Find tenants based on the 'where' conditions
    const properties = await prisma.property.findMany({
      where: where,
      include: {
        rentalContracts: {  // Inclui contratos de arrendamento
          include: {
            tenant: {
              where: {
                isActive: true,  // Dentro dos contratos, inclui o inquilino associado
              },
            }, 
          },
        },
      },
    });
    
    res.status(200).json(properties);
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao procurar os imóveis.' });
    }
  });



router.post('/',
    // Validate postal code format
    body('postalCode').matches(/^\d{4}-\d{3}$/).withMessage('O código postal deve ter o formatp xxxx-xxx'),
    async (req, res) => {
      // Check if there are any validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      // Destructure the request body
      const { name, street, postalCode, city, year, typology, imageUrl,  description, occupied } = req.body;

    // Validate if all required fields are provided
    if (!name || !street || !postalCode || !city || !year || !typology) {
      return res.status(400).json({ error: 'propertyId, tenantId, startDate, and rentAmount are required.' });
    }
  
      try {
        // Create a new property in the database
        const newProperty = await prisma.property.create({
          data: {
            name,
            street,
            postalCode,
            city,
            year: parseInt(year),
            occupied: occupied ?? false,  // Default to false if not provided
            description: description || null,  // Optional field
            typology,
            imageUrl: imageUrl || null,  // Optional field
          },
        });
    
        // Respond with the created property
        res.status(201).json(newProperty);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Ocorreu um erro ao criar o novo imóvel. Volte a tentar ou contacte o administrador.' });
      }
    });

    module.exports = router;