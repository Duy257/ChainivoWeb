'use client';

import productAction from '@/api/actions/ProductAction';
import {ProductItem} from '@/types/ProductItem';
import {useEffect, useState} from 'react';

const ProductFilterPage = () => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  useEffect(() => {
    initData();
  }, []);

  const initData = async () => {
    const result = await productAction.fetch({
      page: 1,
      size: 10,
    });
    setProducts(result.data);
  };

  return (
    <div className="center container m-auto">
      <h1>Product Filter</h1>
      <div className="grid grid-cols-4 gap-4">
        {products.map(product => (
          <div key={product.Id} className="border p-4">
            <img
              src={product.Img}
              alt={product.Name}
              className="w-full h-48 object-cover"
            />
            <h2 className="text-lg font-semibold">{product.Name}</h2>
            <p className="text-gray-600">{product.Description}</p>
            <p className="text-lg font-semibold">{product.Price}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductFilterPage;
