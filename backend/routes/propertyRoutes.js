const express = require('express');
const { PrismaClient } = require('@prisma/client');
const router = express.Router();
const prisma = new PrismaClient();
const multer = require('multer');
const path = require('path');
const { body, validationResult } = require('express-validator');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../assets/images'));  // Ensure this path is correct relative to backend
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);  // Rename file with timestamp
  },
});

const upload = multer({ storage });

// GET route for fetching properties with filters
router.get('/', async (req, res) => {
  const { typology, occupied, minimumYear, maximumYear, hasWorks, activeContracts } = req.query;  // Capture query parameters

  // Initialize the 'where' object that will be passed to Prisma
  const where = {};

  // Check if 'occupied' was provided and is a valid boolean string
  if (occupied !== undefined) {
    where.occupied = occupied === 'true';  // Convert to boolean
  }

  // Check the typology of the property
  if (typology !== undefined) {
    where.typology = typology;
  }

  // Filter based on year range
  if (minimumYear !== undefined && maximumYear !== undefined) {
    where.year = {
      gte: parseInt(minimumYear),  // Greater than or equal to minimumYear
      lte: parseInt(maximumYear),  // Less than or equal to maximumYear
    };
  } else if (minimumYear !== undefined) {
    where.year = {
      gte: parseInt(minimumYear),
    };
  } else if (maximumYear !== undefined) {
    where.year = {
      lte: parseInt(maximumYear),
    };
  }

  // Check if 'hasWorks' was provided and is a valid boolean string
  if (hasWorks !== undefined) {
    where.hasWorks = hasWorks === 'true';  // Convert to boolean
  }

  // Check if filtering for active contracts is required
  if (activeContracts !== undefined) {
    where.rentalContracts = {
      some: { isActive: activeContracts === 'true' },
    };
  }

  try {
    // Fetch properties with the provided filters
    const properties = await prisma.property.findMany({
      where: where,
      include: {
        rentalContracts: {  // Include rental contracts
          include: {
            tenant: true,  // Include tenants (no filtering inside here)
          },
        },
        works: true,  // Include associated works
      },
    });

    // Respond with the filtered properties
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ocorreu um erro ao procurar os imóveis.' });
  }
});

// POST route for creating a new property
router.post(
  '/',
  upload.single('image'),  // Multer middleware to handle the image upload
  /*body('postalCode')
  .trim()  // Trims leading and trailing spaces
  .matches(/^\d{4}-\d{3}$/)
  .withMessage('O código postal deve ter o formato xxxx-xxx'),*/
  async (req, res) => {
    console.log('Postal Code:', req.body.postalCode);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, street, postalCode, city, year, typology, description, occupied, hasWorks } = req.body;

    if (!name || !street || !postalCode || !city || !year || !typology) {
      return res.status(400).json({ error: 'Campos obrigatórios: nome, rua, código postal, cidade, ano, tipologia.' });
    }

    try {
      const newProperty = await prisma.property.create({
        data: {
          name,
          street,
          postalCode,
          city,
          year: parseInt(year),
          occupied: occupied === 'true',  // Convert to boolean
          description: description || null,
          typology,
          hasWorks: hasWorks === 'true',
          imageUrl: req.file ? `/assets/images/${req.file.filename}` : null,  // Save image path
        },
      });

      res.status(201).json(newProperty);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Ocorreu um erro ao criar o novo imóvel. Volte a tentar ou contacte o administrador.' });
    }
  }
);

module.exports = router;
