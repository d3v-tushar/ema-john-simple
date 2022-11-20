import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import Cart from '../Cart/Cart';
import Product from '../Product/Product';
import './Shop.css';

const Shop = () => {
    // const {products, count} = useLoaderData();
    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(15);

    useEffect(() =>{
        const url = `http://localhost:5000/products?page=${page}&size=${size}`;
        fetch(url)
        .then(res => res.json())
        .then(data =>{
            setProducts(data.products);
            setCount(data.count);
        })
    }, [page, size])

    const pages = Math.ceil(count / size);

    useEffect(() =>{
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart);
        fetch('http://localhost:5000/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)
        })
        .then(res => res.json())
        .then(data =>{
            // console.log(data);
            for(const id in storedCart){
                const addedProducts = data.find(product => product._id === id);
                if(addedProducts){
                    const quantity = storedCart[id];
                    addedProducts.quantity = quantity;
                    savedCart.push(addedProducts);
                    //console.log(addedProducts);
                }
            }
        setCart(savedCart);
        })
    
    },[products]);

    const clearCart = () =>{
        setCart([]);
        deleteShoppingCart()
    }

    const handleAddToCart = (selectedProducts) =>{
        let newCart = [];
        const existed = cart.find(product => product._id === selectedProducts._id)
        if(!existed){
            selectedProducts.quantity = 1;
            newCart = [...cart, selectedProducts];
        }
        else{
            const rest = cart.filter(product => product._id !== selectedProducts._id);
            existed.quantity = existed.quantity + 1;
            newCart = [...rest, existed];
        }
        // const newCart = [...cart, selectedProducts];
        setCart(newCart);
        addToDb(selectedProducts._id)
    };
    return (
        <div className='shop-container'>
            <div className='products-container'>
                {
                    products.map(product => <Product key={product._id} product={product} handleAddToCart={handleAddToCart}></Product>)
                }
            </div>
            <div className='cart-container'>
                <Cart clearCart={clearCart} cart={cart}>
                    <Link to={'/orders'}>
                        <button>Review Order</button>
                    </Link>
                </Cart>
            </div>
            <div className="pagination">
                <p>Currently Selected Page: {page} And Size {size}</p>
                {
                    [...Array(pages).keys()].map(number => 
                    <button 
                    key={number}
                    className={page === number ? 'selected' : undefined}
                    onClick={() => setPage(number)}>{number + 1}
                    </button>)
                }
                <select onChange={event => setSize(event.target.value)}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15" selected>15</option>
                    <option value="20">20</option>
                </select>
            </div>
        </div>
    );
};

export default Shop;