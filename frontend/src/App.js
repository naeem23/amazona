import { Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import FeaturedProd from './container/FeaturedProd'
import ProductDetails from './components/ProductDetails'

function App() {
	return (
		<div className='d-flex flex-column h-full'>
			{/* navbar */}
			<Navbar />

			{/* main content */}
			<main className='container py-4'>
				<Routes>
					<Route path='/' element={<FeaturedProd />} />
					<Route path='/product/:slug' element={<ProductDetails />} />
				</Routes>
			</main>

			{/* footer */}
			<footer className='p-3 bg-secondary'>
				<div className='text-center text-white'>All rights reserved!</div>
			</footer>
		</div>
	);
}

export default App;
