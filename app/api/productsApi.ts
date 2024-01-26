export const fetchAllProducts = async () => {
    try {
      const response = await fetch('https://dummyapi.online/api/products');
      if (!response.ok) {
        throw new Error('Failed to fetch products');
      }
      return await response.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  };
  