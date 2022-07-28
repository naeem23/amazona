import { useParams, Link } from 'react-router-dom'
import Rating from './Rating'

const Product = ({ product }) => {
    const { slug } = useParams()
    return (
        <div className='card'>
			<Link to={`product/${product.slug}`}>
				<img src={product.image} className="card-img-top" alt={product.name} />
			</Link>
			<div className="card-body">
				<Link to={`product/${product.slug}`}>
					<h5 className='card-title'>{product.name}</h5>
				</Link>
				<Rating rating={product.rating} numReviews={product.numReviews} />
				<p className='card-text mt-2'><strong>${product.price}</strong></p>
				<button className='btn btn-warning btn-sm'>Add to cart</button>
			</div>
		</div>
    )
}

export default Product