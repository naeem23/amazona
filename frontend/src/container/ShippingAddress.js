import { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { cartContext } from '../CartContext';
import CheckoutSteps from '../components/CheckoutSteps';

const ShippingAddress = () => {
    const navigate = useNavigate();
    const { state, dispatch: cartDispatch } = useContext(cartContext);
    const {
        cart: { shippingAddress },
        userInfo,
    } = state;

    const [fullName, setFullName] = useState(shippingAddress.fullName || '');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(
        shippingAddress.postalCode || ''
    );
    const [country, setCountry] = useState(shippingAddress.country || '');

    useEffect(() => {
        if (!userInfo) {
            navigate('/signin?redirect=/shipping');
        }
    }, [userInfo, navigate]);

    const submitHandler = (e) => {
        e.preventDefault();
        cartDispatch({
            type: 'SAVE_SHIPPING_ADDRESS',
            payload: { fullName, address, city, postalCode, country },
        });
        localStorage.setItem(
            'shippingAddress',
            JSON.stringify({ fullName, address, city, postalCode, country })
        );
        navigate('/payment');
    };

    return (
        <div>
            <Helmet>
                <title>Shipping Address</title>
            </Helmet>
            <CheckoutSteps step1 step2 />
            <div className="row justify-content-center">
                <div className="col-sm-9 col-md-7 col-lg-6">
                    <h1 className="mt-3 mb-4">Shipping Address</h1>
                    <form onSubmit={submitHandler}>
                        <div className="mb-3">
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Address</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">City</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Postal Code</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Country</label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="mb-3">
                            <button className="btn btn-primary" type="submit">
                                Continue
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ShippingAddress;
