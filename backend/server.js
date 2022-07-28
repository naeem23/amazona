import express from 'express'
import data from './data.js'

const app = express()

// product list api 
app.get('/api/products', (req, res) => {
    res.send(data.products)
})

// get product detials 
app.get('/api/product/:slug', (req, res) => {
    const product = data.products.find(x => x.slug === req.params.slug)
    if (product) {
        res.send(product)
    } else {
        res.status(404).send({message: 'Product Not Found'})
    }
})

const port = process.env.PORT || 5000
app.listen(port, () => {
    console.log(`serve at http://localhost:${port}`)
})

