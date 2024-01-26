// components/ProductCard.tsx

import React from 'react';

interface ProductCardProps {
  imageSrc: string;
  altText: string;
  productName: string;
  description: string;
  colors: string[];
  price: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ imageSrc, altText, productName, description, colors, price }) => {
  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-96">
        <img src={imageSrc} alt={altText} className="h-full w-full object-cover object-center sm:h-full sm:w-full" />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <h3 className="text-sm font-medium text-gray-900">
            <span aria-hidden="true" className="absolute inset-0" />
            {productName}
        </h3>
        <p className="text-sm text-gray-500">{description}</p>
        <div className="flex flex-1 flex-col justify-end">
        <p className="text-sm italic text-gray-500">{colors.join(', ')}</p>
          <p className="text-base font-medium text-gray-900">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
