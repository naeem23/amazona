import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import axios from 'axios';
import { useContext, useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { cartContext } from '../CartContext';
import { getError } from '../utils';

const Signin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const userInfo =
        localStorage.getItem('userInfo') !== 'undefined'
            ? JSON.parse(localStorage.getItem('userInfo'))
            : null;

    const { search } = useLocation();
    const redirectUrl = new URLSearchParams(search).get('redirect');
    const redirect = redirectUrl ? redirectUrl : '/';
    const navigate = useNavigate();

    const { dispatch: cartDispatch } = useContext(cartContext);

    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('/api/users/signin', {
                email,
                password,
            });
            cartDispatch({ type: 'USER_INFO', payload: data });
            localStorage.setItem('userInfo', JSON.stringify(data));
            navigate(redirect);
        } catch (error) {
            toast.error(getError(error));
        }
    };

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
        }
    }, [navigate, redirect, userInfo]);

    return (
        <div className="row justify-content-center">
            <div className="col-md-6">
                <Helmet>
                    <title>Sign In</title>
                </Helmet>
                <h1>Sign In</h1>

                <form onSubmit={submitHandler}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Submit
                    </button>
                    <div className="mt-3">
                        New Customer?{' '}
                        <Link to={`/signup?redirect=${redirect}`}>
                            Create your account
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signin;
