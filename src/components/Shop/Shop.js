import React, { useEffect, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { addToDb, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    const products = useLoaderData();
    const [cart, setCart] = useState([]);

    useEffect(() =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        for(const id in storedCart){
        const addedProducts = products.find(product => product.id === id);
        if(addedProducts){
            const quantity = storedCart[id];
            addedProducts.quantity = quantity;
            savedCart.push(addedProducts);
            console.log(addedProducts);
        }
      }
      setCart(savedCart);
    },[products]);

    const handleAddToCart = (selectedProducts) =>{
        let newCart = [];
        const existed = cart.find(product => product.id === selectedProducts.id)
        if(!existed){
            selectedProducts.quantity = 1;
            newCart = [...cart, selectedProducts];
        }
        else{
            const rest = cart.filter(product => product.id !== selectedProducts.id);
            existed.quantity = existed.quantity + 1;
            newCart = [...rest, existed];
        }
        // const newCart = [...cart, selectedProducts];
        setCart(newCart);
        addToDb(selectedProducts.id)
    };
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product key={product.id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart}></Cart>
            </div>
        </div>
    );
};

export default Shop;