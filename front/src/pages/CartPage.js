import React, {useEffect, useState} from 'react'

import { ReactComponent as Remove } from '../assets/remove.svg'

const CartPage = () => {

    let [orders, setOrder] = useState([])

    useEffect(() => {
        getOrders()
        console.log(orders)
    }, [])

    let getOrders = async () => {
        let response = await fetch('http://127.0.0.1:8000/cart')
        let data = await response.json()
        setOrder(data);
    }

    let removeOrderProduct = async (product_id, product_price) => {
      fetch('http://127.0.0.1:8000/cart/remove_product', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'product_id': product_id, 'product_price': product_price}),
      })
      .then(() => {
        getOrders();
      })
    }

  return (
    <div className='container-fluid'>
        <h1>Order:</h1>
        <div className='row m-3 d-flex flex-column'>
          {orders.products?.map((product, index) => (
            <div key={index} className='col-12 d-flex flex-row justify-content-between align-items-center my-2 border border-dark'>
              <div className='col-10 col-md-6 d-flex flex-row flex-wrap'>
                <div className='col-3 col-md-1'>
                  <img src={`http://127.0.0.1:8000/${product.product_image}`} className='img-fluid' />
                </div>
                <div>
                  <p className='fs-3 fw-bolder m-auto p-auto'>{product.product_name}</p>
                  <p className='fs-4'>${product.product_price}</p>
                </div>
              </div>
              <Remove className='text-danger' type='button' values={product.id} onClick={() => removeOrderProduct(product.id,product.product_price)} />
            </div>
          ))}
        </div>
        <div className='d-flex flex-row-reverse me-3'>
          <h1>Amount: ${orders?.amount}</h1>
        </div>
        <div className='d-flex flex-row-reverse me-3'>
          <button className='btn btn-danger mx-2'>Cancel</button>
          <button className='btn btn-success mx-2'>Submit</button>
        </div>
    </div>
  )
}

export default CartPage