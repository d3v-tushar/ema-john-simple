import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { removeFromDb } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import ReviewItems from '../ReviewItems/ReviewItems';

const Orders = () => {
    const {products, initialCart} = useLoaderData();
    const [cart, setCart] = useState(initialCart);

    const handleRemoveItem = (id) => {
        console.log(id);
        const remainning = cart.filter(product => product.id !== id);
        console.log(remainning);
        setCart(remainning);
        removeFromDb(id);
    }
    return (
        <div className='shop-container'>
            <div className='orders-container'>
                {
                    cart.map(product => <ReviewItems key={product.id} product={product}></ReviewItems>)
                }
            </div>
            <div className='cart-container'>
                <Cart cart={cart} handleRemoveItem={handleRemoveItem}></Cart>
            </div>
        </div>
    );
};

export default Orders;