'use client'
import Link from 'next/link';
import ProductCard from '@/components/productList';
import { useEffect, useState } from 'react';
import { fetchAllProducts } from '../api/productsApi';

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await fetchAllProducts();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="bg-white">
      <div className="grid grid-cols-1 gap-y-4 sm:grid-cols-2 sm:gap-x-6 sm:gap-y-10 lg:grid-cols-3 lg:gap-x-8">
        {products.map((product) => (
          <div key={product.id}>
            <Link href={`/product/${product.id}`}>
            <ProductCard
            imageSrc={product.featuredImage}
            altText={product.description}
            productName={product.name}
            description={product.description}
            colors={product.colorOptions}
            price={product.basePrice}
          />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;