import React from 'react'

import { ReactComponent as Cart } from '../assets/cart.svg'
import { ReactComponent as Account } from '../assets/account.svg'

const Header = () => {
  return (
    <div className='container-fluid bg-success p-3 d-flex flex-row justify-content-around align-items-center'>
        <a href='/cart/' className='text-white'><Cart /></a>
        <a href='/' className='link-underline link-underline-opacity-0'><h1 className='text-white fw-bold'>Vova Hayek Shop</h1></a>
        <a href='#' className='text-white'><Account /></a>
    </div>
  )
}

export default Header