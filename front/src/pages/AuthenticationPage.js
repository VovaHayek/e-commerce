import React, {useState} from 'react'
import axios from 'axios'

const AuthenticationPage = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const submit = async e => {
        e.preventDefault();

        const user = {
            username: username,
            password: password
        };

        const {data} = await axios.post('http://127.0.0.1:8000/token/', user, {headers: {'Content-Type': 'application/json'}, withCredentials: false});

        localStorage.clear();
        localStorage.setItem('access_token', data.access);
        localStorage.setItem('refresh_token', data.refresh);

        axios.defaults.headers.common['Authorization'] = `Bearer ${data['access']}`;

        window.location.href = '/'
    }

  return (
    <div className='w-100 d-flex justify-content-center align-items-center'>
        <form className='col-11 col-md-6 col-lg-3 mt-5 d-flex flex-column align-items-center' onSubmit={submit}>
            <h3 className='fw-bolder'>Sign In</h3>
            <div className='w-75 my-2 d-flex flex-column align-items-center'>
                <label>Username</label>
                <input type='text' className='form-control' name='username' placeholder='Enter Username' required onChange={e => setUsername(e.target.value)} />
            </div>
            <div className='w-75 my-2 d-flex flex-column align-items-center'>
                <label>Password</label>
                <input type='password' className='form-control' name='password' placeholder='Enter Password' required onChange={e => setPassword(e.target.value)} />
            </div>
            <div className='w-75 my-2'>
                <button type='submit' className='form-control btn btn-primary'>Submit</button>
            </div>
        </form>
    </div>
  )
}

export default AuthenticationPage