import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({ products }) => {
  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <Link to={`/product/${product.id}`}>
            <h2>{product.name}</h2>
          </Link>
          <p>{product.category}</p>
          <p>Price: ${product.price}</p>
          <p>Rating: {product.rating}</p>
        </div>
      ))}
    </div>
  );
}

export default ProductList;
