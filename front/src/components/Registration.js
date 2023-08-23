import React, { useState } from 'react'
import axios from 'axios'

const Registration = ({changeToSignIn}) => {

    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');

    const createUser = async e => {
        e.preventDefault();

        const newUser = {
            username: username,
            password: password
        };

        const response = await axios.post('http://127.0.0.1:8000/auth/registration/', newUser,
                                        {headers: {'Content-Type': 'application/json'}, withCredentials: false}).then((response) => {
                                            window.location.href = '/auth/'
                                        });

    }

  return (
    <form className='col-11 col-md-6 col-lg-3 mt-5 d-flex flex-column align-items-center' onSubmit={createUser}>
        <h3 className='fw-bolder'>Sign Up</h3>
        <div className='w-75 my-2 d-flex flex-column align-items-center'>
            <label>Username</label>
            <input type='text' className='form-control' name='username' placeholder='Enter Username' required onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className='w-75 my-2 d-flex flex-column align-items-center'>
            <label>Password</label>
            <input type='password' className='form-control' name='password1' placeholder='Enter Password' required onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div className='w-75 my-2 d-flex flex-column align-items-center'>
            <label>Password Confirmation</label>
            <input type='password' className='form-control' name='password2' placeholder='Confirm Password' required />
        </div>
        <div className='w-75 my-2'>
            <button type='submit' className='form-control btn btn-primary'>Submit</button>
        </div>
        <p>Already have an account? <button className='btn btn-success' onClick={() => changeToSignIn('login')}>Sign In</button></p>
    </form>
  )
}

export default Registration