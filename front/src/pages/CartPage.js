import React, {useEffect, useState} from 'react'
import axios from 'axios'

import { ReactComponent as Remove } from '../assets/remove.svg'

const CartPage = () => {

    /*Personal Data States*/
    let [fullName, setFullName] = useState('');
    let [address, setAddress] = useState('');
    let [city, setCity] = useState('');

    let [cartStage, setCartStage] = useState(1);
    let [orders, setOrder] = useState([]);

    useEffect(() => {
        getOrders();
    }, []);

    let getOrders = async () => {
        let response = await fetch('http://127.0.0.1:8000/cart');
        let data = await response.json();
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
      });
    }

    let finishOrder = async () => {
      axios.post('http://127.0.0.1:8000/order', {
        full_name: fullName,
        address: address,
        city: city
      });

      window.location.href = '/'
    }

  return (
    <div className='container-fluid'>
      {cartStage === 1 ?

        <div>
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
            <button className='btn btn-success mx-2' onClick={(e) => setCartStage(2)}>Next &gt;</button>
          </div>
        </div>

      :

        <form onSubmit={finishOrder}>
          <h1>Personal Data:</h1>

          <div className='my-2'>
            <div>
              <label>Full Name<span className='text-danger'>*</span></label>
              <input type='text' className='form-control' id='full-name' required onChange={(e) => setFullName(e.target.value)}/>
            </div>

            <div>
              <label>Address<span className='text-danger'>*</span></label>
              <input type='text' className='form-control' id='address' required onChange={(e) => setAddress(e.target.value)}/>
            </div>

            <div>
              <label>City<span className='text-danger'>*</span></label>
              <input type='text' className='form-control' id='city' required onChange={(e) => setCity(e.target.value)}/>
            </div>
          </div>

          <div className='d-flex flex-row-reverse'>
            <button className='btn btn-success mx-2'>Submit</button>
            <button className='btn btn-danger mx-2' onClick={(e) => setCartStage(1)}>Back</button>
          </div>
        </form>

      }
    </div>
  )
}

export default CartPage