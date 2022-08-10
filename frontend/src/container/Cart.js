import { useContext } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

import { cartContext } from '../CartContext';
import AlertBox from '../components/AlertBox';

const Cart = () => {
    const navigate = useNavigate();
    const { state, dispatch: cartDispatch } = useContext(cartContext);
    const {
        cart: { cartItems },
    } = state;

    const updateCartHandler = async (item, quantity) => {
        const { data } = await axios.get(`/api/products/${item._id}`);
        if (data.countInStock < quantity) {
            window.alert('Sorry, Product is out of stock');
            return;
        }

        cartDispatch({
            type: 'CART_ADD_ITEM',
            payload: { ...item, quantity },
        });
    };

    const removeCartItem = (item) => {
        cartDispatch({
            type: 'CART_REMOVE_ITEM',
            payload: item,
        });
    };

    const checkoutHandler = () => {
        navigate('/signin?redirect=/shipping');
    };

    return (
        <>
            <Helmet>
                <title>Shopping Cart</title>
            </Helmet>

            <h1>Shoppinng Cart</h1>

            <div className="row">
                <div className="col-md-8">
                    {cartItems.length === 0 ? (
                        <AlertBox variant="warning">
                            Cart is empty. <Link to="/">Go Shopping</Link>
                        </AlertBox>
                    ) : (
                        <ul className="list-group">
                            {cartItems.map((item) => (
                                <li className="list-group-item" key={item._id}>
                                    <div className="row align-items-center">
                                        <div className="col-md-4">
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="img-fluid rounded img-thumbnail"
                                            />
                                            <Link to={`product/${item.slug}`}>
                                                {item.name}
                                            </Link>
                                        </div>

                                        <div className="col-md-3">
                                            <button
                                                className="btn btn-light btn-sm"
                                                disabled={item.quantity === 1}
                                                onClick={() =>
                                                    updateCartHandler(
                                                        item,
                                                        item.quantity - 1
                                                    )
                                                }
                                            >
                                                <i className="fas fa-minus-circle"></i>
                                            </button>
                                            <span>{item.quantity}</span>
                                            <button
                                                className="btn btn-light btn-sm"
                                                disabled={
                                                    item.quantity ===
                                                    item.countInStock
                                                }
                                                onClick={() =>
                                                    updateCartHandler(
                                                        item,
                                                        item.quantity + 1
                                                    )
                                                }
                                            >
                                                <i className="fas fa-plus-circle"></i>
                                            </button>
                                        </div>

                                        <div className="col-md-3">
                                            ${item.price}
                                        </div>

                                        <div className="col-md-2">
                                            <button
                                                className="btn btn-light btn-sm"
                                                onClick={() =>
                                                    removeCartItem(item)
                                                }
                                            >
                                                <i className="fas fa-trash"></i>
                                            </button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="col-md-4">
                    <div className="card">
                        <div className="card-body">
                            <ul className="list-group">
                                <li className="list-group-item">
                                    <h4>
                                        Subtotal (
                                        {cartItems.reduce(
                                            (a, c) => a + c.quantity,
                                            0
                                        )}{' '}
                                        items) : ${' '}
                                        {cartItems.reduce(
                                            (a, c) => a + c.price * c.quantity,
                                            0
                                        )}
                                    </h4>
                                </li>

                                <li className="list-group-item">
                                    <div className="d-grid">
                                        <button
                                            className="btn btn-warning btn-sm"
                                            disabled={cartItems.length === 0}
                                            onClick={checkoutHandler}
                                        >
                                            Proceed to Checkout
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
