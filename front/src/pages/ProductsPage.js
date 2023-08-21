import React, {useEffect, useState} from 'react'

import ProductItem from '../components/ProductItem'
import Filters from '../components/Filters'

const ProductsPage = () => {

    let [products, setProduct] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    let getProducts = async (e) => {
        let response = await fetch('http://127.0.0.1:8000/products');
        let data = await response.json();
        setProduct(data);
    }

  return (
    <div className='row mt-5 m-0'>
        <div className='col-12 col-lg-2 border border-top-0 mb-3'>
            <Filters productsGetFunction={getProducts} />
        </div>
        <div className='col-12 col-lg-10 d-flex flex-column justify-content-center align-items-center'>
            <div className='w-100 mb-3 d-flex flex-row'>
                <input type='text' className='form-control' placeholder='Search...' />
                <button className='btn btn-primary rounded-end'>Search</button>
            </div>
            <div className='col-12 col-lg-10 d-flex justify-content-evenly align-items-center flex-wrap'>
                {products.map((product, index) => (
                    <ProductItem key={index} product={product} />
                ))}
            </div>
        </div>
    </div>
  )
}

export default ProductsPage