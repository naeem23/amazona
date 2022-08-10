import { useEffect, useReducer } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet-async';

import Product from './Product';
import Loading from '../components/Loading';
import AlertBox from '../components/AlertBox';
import { getError } from '../utils';

// reducer for fetching products
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return { ...state, loading: true };
        case 'FETCH_SUCCESS':
            return { ...state, products: action.payload, loading: false };
        case 'FETCH_FAIL':
            return { ...state, loading: false, error: action.payload };
        default:
            return state;
    }
};

const FeaturedProd = () => {
    // const [products, setProducts] = useState([])
    const [{ loading, products, error }, dispatch] = useReducer(reducer, {
        loading: true,
        products: [],
        error: '',
    });

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: 'FETCH_REQUEST' });
            try {
                const result = await axios.get('/api/products/');
                dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
            } catch (error) {
                dispatch({ type: 'FETCH_FAIL', payload: getError(error) });
            }
            // setProducts(result.data)
        };
        fetchData();
    }, []);

    return (
        <div>
            {/* setting page title  */}
            <Helmet>
                <title>Amozona</title>
            </Helmet>
            {/* end page title  */}

            <h1 className="mb-3">Featured Products</h1>

            <div className="row">
                {loading ? (
                    <Loading />
                ) : error ? (
                    <AlertBox variant="danger">{error}</AlertBox>
                ) : (
                    products.map((product) => (
                        <div
                            className="col-sm-6 col-md-4 col-lg-3"
                            key={product.slug}
                        >
                            <Product product={product} />
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FeaturedProd;
