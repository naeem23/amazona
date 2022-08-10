import axios from 'axios';
import { useContext } from 'react';
import { Link } from 'react-router-dom';

import { cartContext } from '../CartContext';
import Rating from '../components/Rating';

const Product = ({ product }) => {
    // add to cart
    const { state, dispatch: cartDispatch } = useContext(cartContext);
    const { cart } = state;
    const addToCartHandler = async () => {
        const existItem = cart.cartItems.find((x) => x._id === product._id);
        const quantity = existItem ? existItem.quantity + 1 : 1;
        const { data } = await axios.get(`/api/products/${product._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry, Product is out of stock');
            return;
        }
        cartDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...product, quantity },
        });
    };

    return (
        <div className="card">
            <Link to={`product/${product.slug}`}>
                <img
                    src={product.image}
                    className="card-img-top"
                    alt={product.name}
                />
            </Link>
            <div className="card-body">
                <Link to={`product/${product.slug}`}>
                    <h5 className="card-title">{product.name}</h5>
                </Link>
                <Rating
                    rating={product.rating}
                    numReviews={product.numReviews}
                />
                <p className="card-text mt-2">
                    <strong>${product.price}</strong>
                </p>
                {product.countInStock === 0 ? (
                    <button className="btn btn-light btn-sm" disabled>
                        Out of Stock
                    </button>
                ) : (
                    <button
                        className="btn btn-warning btn-sm"
                        onClick={addToCartHandler}
                    >
                        Add to cart
                    </button>
                )}
            </div>
        </div>
    );
};

export default Product;
