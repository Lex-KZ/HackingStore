import React from 'react'
import { Link } from 'react-router-dom'

function Product({ product }) {
    return (
        <div>
            <dl>
                <dt>Id:</dt>
                <dd>{product.id}</dd>
            </dl>
            <dl>
                <dt>Name:</dt>
                <dd>{product.name}</dd>
            </dl>
            <dl>
                <dt>Price:</dt>
                <dd>{product.price}</dd>
            </dl>
            <Link to='/products'>&larr;&nbsp;Back</Link>
        </div>

   );
}

export default Product