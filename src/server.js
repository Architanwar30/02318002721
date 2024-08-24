const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// Sample data (this would usually come from a database)
const products = [
  { id: 1, name: 'Product 1', company: 'Company A', category: 'Category 1', price: 100, rating: 4.5, discount: 10, availability: 'In Stock' },
  { id: 2, name: 'Product 2', company: 'Company B', category: 'Category 2', price: 200, rating: 4.0, discount: 15, availability: 'In Stock' },
  { id: 3, name: 'Product 3', company: 'Company A', category: 'Category 1', price: 150, rating: 3.5, discount: 5, availability: 'Out of Stock' },
  // Add more products as needed
];

// API to get all products with filtering and sorting
app.get('/api/products', (req, res) => {
  let filteredProducts = [...products];

  // Apply filters
  if (req.query.category) {
    filteredProducts = filteredProducts.filter(product => product.category === req.query.category);
  }
  if (req.query.company) {
    filteredProducts = filteredProducts.filter(product => product.company === req.query.company);
  }
  if (req.query.price) {
    const [min, max] = req.query.price.split('-').map(Number);
    filteredProducts = filteredProducts.filter(product => product.price >= min && product.price <= max);
  }

  // Apply sorting
  if (req.query.sortBy) {
    const sortBy = req.query.sortBy;
    const order = req.query.order === 'desc' ? -1 : 1;
    filteredProducts.sort((a, b) => (a[sortBy] > b[sortBy] ? 1 : -1) * order);
  }

  res.json(filteredProducts);
});

// API to get a single product by ID
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).send('Product not found');
  res.json(product);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

