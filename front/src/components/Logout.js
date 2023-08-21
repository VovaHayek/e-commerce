import React, {useEffect} from 'react';
import axios from 'axios';

const Logout = () => {

    useEffect(() => {
        (async () => {
            try {
                const {data} = await axios.post('http://127.0.0.1:8000/auth/logout/',
                        {refresh_token: localStorage.getItem('refresh_token')},
                        {headers: {'Content-Type': 'application/json'}, withCredentials: false});
                
                localStorage.clear();
                axios.defaults.headers.common['Authorization'] = null;
                window.location.href = '/';
            } catch (e) {
                console.log('Logout is not working:(', e)
            }
        })();
    }, []);

  return (
    <div></div>
  )
}

export default Logout