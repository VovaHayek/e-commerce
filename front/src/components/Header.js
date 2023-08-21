import React, {useEffect, useState} from 'react'

import { ReactComponent as Cart } from '../assets/cart.svg'
import { ReactComponent as Account } from '../assets/account.svg'
import { ReactComponent as Logout } from '../assets/logout.svg'

const Header = () => {

  let [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    if (localStorage.getItem('access_token') !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <div className='container-fluid bg-success p-3 d-flex flex-row justify-content-around align-items-center'>
        <a href='/cart/' className='text-white'><Cart /></a>
        <a href='/' className='link-underline link-underline-opacity-0'><h1 className='text-white fw-bold'>Vova Hayek Shop</h1></a>
        
        {isAuth ? <div><a href='#' className='text-white mx-2'><Account /></a> <a href='/logout/' className='text-white mx-2'><Logout /></a></div> :
                  <div><a href='/login/' className='btn btn-primary'>Sign In</a> <a href='/' className='btn btn-dark'>Sign Up</a></div>}
        
    </div>
  )
}

export default Header