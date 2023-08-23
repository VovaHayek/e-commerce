import React, {useState} from 'react'

import Login from '../components/Login'
import Registration from '../components/Registration'

const AuthenticationPage = () => {

  let [authentication, setAuthentication] = useState('login')

  function changeAuthenticationType(authType) {
    setAuthentication(authType)
  }

  return (
    <div className='w-100 d-flex justify-content-center align-items-center'>
      {authentication === 'signup' ? <Registration changeToSignIn={changeAuthenticationType} /> : <Login changeToSignUp={changeAuthenticationType} />}
    </div>
  )
}

export default AuthenticationPage