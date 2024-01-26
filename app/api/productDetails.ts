export const fetchProductDetails = async (productId: string) => {
    try {
      const response = await fetch(`https://dummyapi.online/api/products/${productId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch product details');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  