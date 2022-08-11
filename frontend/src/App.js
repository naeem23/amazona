import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import Navbar from './components/Navbar';
import FeaturedProd from './container/FeaturedProd';
import ProductDetails from './components/ProductDetails';
import Cart from './container/Cart';
import Signin from './container/Signin';

function App() {
    return (
        <div className="d-flex flex-column h-full">
            {/* toastify alert */}
            <ToastContainer position="top-right" limit={1} />

            {/* navbar */}
            <Navbar />

            {/* main content */}
            <main className="container py-4">
                <Routes>
                    <Route path="/" element={<FeaturedProd />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/signin" element={<Signin />} />
                    <Route path="/product/:slug" element={<ProductDetails />} />
                </Routes>
            </main>

            {/* footer */}
            <footer className="p-3 bg-secondary">
                <div className="text-center text-white">
                    All rights reserved!
                </div>
            </footer>
        </div>
    );
}

export default App;
