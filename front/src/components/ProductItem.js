import React, {useState} from 'react'

const ProductItem = ({product, callNotification}) => {

  let [cartProduct, setCartProduct] = useState([])

  let CreateCart = async () => {
    let cart = fetch('http://127.0.0.1:8000/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  }

  let UpdateCart = async () => {
    let cart = fetch('http://127.0.0.1:8000/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(product)
    })
  }

  let addToCart = async () => {
    let order = await fetch('http://127.0.0.1:8000/cart', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => {
      const jsonOrder = response.json()
      jsonOrder.then(data => {
        UpdateCart()
      }).catch(error => {
        CreateCart()
      })
    })
  }

  return (
    <div className='col-11 col-md-5 col-lg-5 py-5 d-flex flex-column justify-content-center align-items-center product'>
      <div className='w-50'>
        <img src={`http://127.0.0.1:8000/${product.product_image}`} className='img-fluid' />
      </div>
        <h3>{product.product_name}</h3>
        <h2>${product.product_price}</h2>
        <button className='btn btn-primary px-5 py-2 mt-3' onClick={(e) => {addToCart(); callNotification()}}>&#128722; Add to Cart</button>
    </div>
  )
}

export default ProductItem