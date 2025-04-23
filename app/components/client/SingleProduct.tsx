import { productItem } from '@/types';
import React from 'react';

const SingleProduct = ({item}:{item:productItem}) => {
  return (
    <div className='py-40'>
      <h1>helllow {item.name}</h1>
    </div>
  );
}

export default SingleProduct;
