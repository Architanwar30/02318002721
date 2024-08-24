import React, { useState, useEffect } from 'react';
import ProductList from '../Components/ProductList';

const AllProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [filters, setFilters] = useState({});
  
  useEffect(() => {
    let query = '';
    if (filters.category) query += `&category=${filters.category}`;
    if (filters.company) query += `&company=${filters.company}`;
    if (filters.price) query += `&price=${filters.price}`;
    if (filters.sortBy) query += `&sortBy=${filters.sortBy}&order=${filters.order}`;

    fetch(`/api/products?${query}`)
      .then(response => response.json())
      .then(data => setProducts(data));
  }, [filters]);

  const applyFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  return (
    <div>
      <h1>All Products</h1>
      {/* Add filter components here */}
      <ProductList products={products} />
    </div>
  );
}

export default AllProductsPage;


