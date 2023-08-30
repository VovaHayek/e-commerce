import React, {useState, useEffect} from 'react'
import axios from 'axios'

import UserImage from '../assets/userProfileImage.png'

const AccountPage = () => {

    let [account, setAccount] = useState({});

    useEffect(() => {
        getAccountInformation();
    }, []);

    let getAccountInformation = async () => {
        axios.get('http://127.0.0.1:8000/account').then((response) => {
            setAccount(response.data);
        });
    }

  return (
    <div className='container-fluid d-flex flex-row flex-wrap justify-content-center'>
        <div className='col-10 col-md-5 d-flex justify-content-center align-items-center'><img src={UserImage} className='img-fluid' /></div>
        <div className='col-10 col-md-7'><h1 className='text-center'>{account?.username}</h1></div>
    </div>
  )
}

export default AccountPage