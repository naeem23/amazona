import axios from 'axios'
import { useReducer, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

import Rating from './Rating'
import Loading from './Loading'
import AlertBox from './AlertBox'
import { getError } from '../utils'
import { cartContext } from '../CartContext'

// reducer for fetching product details 
const reducer = (state, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return {...state, loading: true}
        case 'FETCH_SUCCESS':
            return {...state, product: action.payload, loading: false}
        case 'FETCH_FAIL':
            return {...state, loading: false, error: action.payload}
        default:
            return state
    }
}

const ProductDetails = () => {
    const { slug } = useParams()
    const [{ loading, product, error }, dispatch] = useReducer(reducer, {loading: true, product: [], error: ''})

    useEffect(() => {
        const fetchData = async () => {
            dispatch({type: 'FETCH_REQUEST'})
            try {
                const result = await axios.get(`/api/product/${slug}`)
                dispatch({type: 'FETCH_SUCCESS', payload: result.data})
            } catch (error) {
                dispatch({type: 'FETCH_FAIL', payload: getError(error)})
            }
        }
        fetchData()
    }, [slug])
    
    // add to cart funcationality 
    const { dispatch: cartDispatch } = useContext(cartContext)
    const addToCartHandler = () => {
        cartDispatch({type: 'CART_ADD_ITEM', payload: {...product, quantity: 1}})
    }

    return (
        <div className='container'>
            {
                loading ? (
                    <Loading />
                ) : error ? (
                    <AlertBox variant="danger">{error}</AlertBox>
                ) : (
                    <div className='row'>
                        {/* set page title */}
                        <Helmet>
                            <title>{product.name}</title>
                        </Helmet>
                        {/* end page title */}
                        
                        <div className='col-md-6'>
                            <img src={product.image} alt={product.name} className="img-large" />
                        </div>
                        <div className='col-md-3'>
                            <h2 className='fw-semibold'>{product.name}</h2>
                            <Rating rating={product.rating} numReviews={product.numReviews} />
                            <p className='my-1'>Price: ${product.price}</p>
                            <p className='mb-0'>Description:</p>
                            <p>{product.description}</p>
                        </div>
                        <div className='col-md-3'>
                            <div className='card'>
                                <div className='card-body'>
                                    <div className='row'>
                                        <div className='col-6'>Price:</div>
                                        <div className='col-6'>${product.price}</div>
                                    </div>
                                    <div className='row mt-2'>
                                        <div className='col-6'>Status:</div>
                                        <div className='col-6'>
                                            {
                                                product.countInStock > 0 ? (
                                                    <span className="badge bg-success">In Stock</span>
                                                ) : (
                                                    <span className="badge bg-danger">Out of Stock</span>
                                                ) 
                                            }
                                        </div>
                                    </div>
                                    <div className='row mt-3'>
                                        <div className='d-grid'>
                                            {
                                                product.countInStock > 0 && (
                                                    <button className='btn btn-warning btn-sm' onClick={addToCartHandler}>Add to cart</button>
                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default ProductDetails