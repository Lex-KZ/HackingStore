import React from 'react';
import { Link } from 'react-router-dom'

function ProductList({ products }) {
    
    return (
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
    )
}

export default ProductList