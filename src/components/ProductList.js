import React from 'react';
import { Link } from 'react-router-dom'

function ProductList({ products }) {
    
    return (
        products ? 
        (
            <table>
                <thead>
                    <tr>
                    <th>Name</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                {
                    products.map(product =>(
                    <tr key={product.id}>
                        <th><Link to={`/products/${product.id}`}>{product.name}</Link></th>
                        <th>{product.price}</th>
                    </tr>
                    ))
                }
                </tbody>
            </table>
        ) : (
            <div>Loading&hellip;</div>
        )

    )
}

export default ProductList