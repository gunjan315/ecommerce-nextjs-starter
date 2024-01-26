'use client'
import React from 'react';
import {useState, useEffect } from 'react';
import { UnderConstructionIcon } from './icon';
import Link from 'next/link'; 

// change import style
const CartPage = () => {
    const [isClient, setIsClient] = useState(false);
    const [cart, setCart] = useState([])

    useEffect(() => {
        function getItems(){
            const storedCart = localStorage.getItem("cart");
            if (storedCart) {
                setCart(storedCart ? JSON.parse(storedCart) : []);
            }
        }
        setTimeout(getItems, 1000);
        setIsClient(true);
    }, []);
    
    if (!isClient) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div className="flex flex-col justify-center items-center h-screen bg-white text-black font-mono text-sm">
                <UnderConstructionIcon/>
                <pre className="whitespace-pre-wrap break-words">{JSON.stringify(cart, null, 2)}</pre>
            <Link href="/product">
              <button
                type="submit"
                className="mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                BACK TO PRODUCTS
              </button>
              </Link>
            </div>
        </div>
    );
};

export default CartPage;
