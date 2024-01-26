// 'use client'
// import { createContext, useContext, useState, ReactNode, Dispatch, SetStateAction, useEffect } from 'react';

// // Define the types
// interface CartItem {
//   id: number;
//   name: string;
//   size: string;
//   color: string;
// }

// interface CartContextProps {
//   cart: CartItem[];
//   addToCart: (item: CartItem) => void;
// }
// const defaultCartContext: CartContextProps = {
//   cart: [], // Start with an empty cart
//   addToCart: () => {} // Stub function for addToCart
// };
// // Create the context with initial undefined value, but with proper typing
// const CartContext = createContext<CartContextProps>(defaultCartContext);

// // Create the provider component
// export const CartProvider = ({ children }) => {
//   // const [cart, setCart] = useState<CartItem[]>([]);
//   const [cart, setCart] = useState(() => {
//     if (typeof window !== 'undefined') {
//       const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//     }
    
//   });

//   // Save cart to localStorage when it changes
//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       localStorage.setItem("cart", JSON.stringify(cart));
//     }
//   }, [cart]);

  
//   const addToCart = (item: CartItem) => {
//     console.log("ADDING TO CART")
//     console.log("EXISTING")
//     console.log(cart)
//     setCart((prevCart) => [...prevCart, item]);
//   };

//   return (
//     <CartContext.Provider value={{ cart, addToCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// // Create a custom hook for using the context
// export const useCart = (): CartContextProps => {
//   const context = useContext(CartContext);
//   // if (!context) {
//   //   throw new Error('useCart must be used within a CartProvider');
//   // }
//   return context;
// };
