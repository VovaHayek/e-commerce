import React, {useEffect, useState} from 'react'

import ProductItem from '../components/ProductItem'
import Filters from '../components/Filters'

const ProductsPage = () => {

    let [products, setProduct] = useState([])

    useEffect(() => {
        getProducts();
    }, [])

    let getProducts = async (e) => {
        let parameters = new URLSearchParams();
        parameters.append("product_price_min", e?.minPrice || '');
        parameters.append("product_price_max", e?.maxPrice || '');
        parameters.append("category", e?.category || '');
        parameters.append("product_name", e?.productName || '');

        let response = await fetch('http://127.0.0.1:8000/products?' + parameters);
        let data = await response.json();
        setProduct(data);
    }

    /*Function that creates delay, after which next line of code will be executed*/
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
    /*Function to show notification, that item was added to the cart, when "Add to Cart" button has been pressed*/
    let showNotification = async () => {
        let notification = document.getElementById('add-to-cart-notification');
        notification.classList.add('pop-up-notification')
        await delay(3000);
        notification.classList.remove('pop-up-notification')
    }

  return (
    
    <div className='row mt-5 m-0'>

        <div className='bg-primary bg-opacity-50 text-white position-absolute end-0 m-2' style={{width: '20vw', height: '10vh', top: '-15%'}} id='add-to-cart-notification'>
            <p className='text-center'>Item has been added to the Cart!</p>
        </div>

        <div className='col-12 col-lg-2 border border-top-0 mb-3'>
            <Filters productsGetFunction={getProducts} />
        </div>

        <div className='col-12 col-lg-10 d-flex flex-column justify-content-center align-items-center'>
            <div className='w-100 mb-3 d-flex flex-row'>
                <input type='text' className='form-control' placeholder='Search...' onChange={(e) => getProducts({productName: e.target.value})} />
            </div>
            <div className='col-12 col-lg-10 d-flex justify-content-evenly align-items-center flex-wrap'>
                {products.map((product, index) => (
                    <ProductItem key={index} product={product} callNotification={showNotification} />
                ))}
            </div>
        </div>

    </div>
  )
}

export default ProductsPage