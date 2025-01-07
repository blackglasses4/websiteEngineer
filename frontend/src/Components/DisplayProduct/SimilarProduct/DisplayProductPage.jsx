import React from 'react';
import { ProductProvider } from '../../ProductContext';
import DisplayProduct from '../DisplayProduct';

const DisplayProductPage = () => {
  return (
    <ProductProvider>
      <DisplayProduct />
    </ProductProvider>
  );
};

export default DisplayProductPage;
