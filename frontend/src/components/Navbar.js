import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { cartContext } from '../CartContext'

const Navbar = () => {
    const { state } = useContext(cartContext)
    const { cart } = state

    return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">amazon</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                        <Link className="nav-link" to="/cart">
                            <button className='btn btn-sm position-relative'>
                                <i className="text-white fas fa-shopping-basket"></i>
                                {
                                    cart.cartItems.length > 0 && (
                                        // this line will increase the quantity of existing item but cart number won't increase 
                                        // <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{cart.cartItems.length}</span>
                                        // this will increase the cart number too along with product quantity where 0 is accumulator default value
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">{
                                            cart.cartItems.reduce((accumulator, currentItem) => 
                                                accumulator + currentItem.quantity, 0
                                            )
                                        }</span>
                                    )
                                }
                            </button>
                        </Link>
                    </li>
                </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar