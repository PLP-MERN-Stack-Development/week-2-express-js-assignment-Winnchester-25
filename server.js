// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');

//  Import custom middleware
const auth = require('./middleware/auth')
const logger = require('./middleware/logger');
const validateProduct = require('./middleware/validateProducts');
const errorHandler = require('./middleware/errorHandler');

// Import custom errs
const ValidationError = require('./errors/ValidationError');
const NotFoundError = require('./errors/notFoundError');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware setup
app.use(bodyParser.json());
app.use(logger);


// Sample in-memory products database
let products = [
  {
    id: '1',
    name: 'Laptop',
    description: 'High-performance laptop with 16GB RAM',
    price: 1200,
    category: 'electronics',
    inStock: true
  },
  {
    id: '2',
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'electronics',
    inStock: true
  },
  {
    id: '3',
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'kitchen',
    inStock: false
  }
];

// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:
// GET /api/products - Get all products

//  GET /api/products
app.get('/api/products', (req, res) => {
  let result = [...products];

  // Filtering by category
  if (req.query.category) {
    result = result.filter(product =>
      product.category.toLowerCase() === req.query.category.toLowerCase()
    );
  }

  // Searching by name or description
  if (req.query.search) {
    const search = req.query.search.toLowerCase();
    result = result.filter(product =>
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search)
    );
  }

  // Pagination
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || result.length; // Default: return all
  const start = (page - 1) * limit;
  const end = start + limit;

  const paginatedResult = result.slice(start, end);

  res.json({
    page,
    limit,
    total: result.length,
    data: paginatedResult
  });
});



// GET /api/products/:id - Get a specific product

app.get('/api/products/:id', async (req, res, next) => {
  try {
    const product = products.find(p => p.id === req.params.id);
    if (!product) throw new NotFoundError('Product not found');
    res.json(product);

  } catch (err) {
    next(err);
  }
 

});

 
// POST /api/products - Create a new product

app.post('/api/products', auth, validateProduct, (req, res, next) => {
  try {
    const {name, description, price, category, inStock } = req.body;

  if (!name || !description || price === undefined || !category || inStock === undefined) {
    // return res.status(400).json({ message: 'Missing required fields' });
    throw new ValidationError("Missing required fields");
  }

  const newProduct = {
    id: uuidv4(),
    name,
    description,
    price,
    category,
    inStock

  };

  products.push(newProduct);
  res.status(201).json(newProduct);

  } catch (error) {
    next(error);
    
  }
  
});


// PUT /api/products/:id - Update a product

app.put('/api/products/:id', auth, validateProduct, (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError('Product not found');

     const updatedProduct = { ...products[index], ...req.body };
     products[index] = updatedProduct;

     res.json(updatedProduct);

      
  } catch (err) {
    next(err);
    
  }
  
})

// DELETE /api/products/:id - Delete a product


app.delete('/api/products/:id', (req, res, next) => {
  try {
    const index = products.findIndex(p => p.id === req.params.id);
    if (index === -1) throw new NotFoundError("Product not found");

  const deleted = products.splice(index, 1);
  res.json({message: 'Product deleted', product: deleted[0] });

  } catch (err) {
    next(err);
    
  }
  
});

// Global error handler
app.use(errorHandler);


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app;

