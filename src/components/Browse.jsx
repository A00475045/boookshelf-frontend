import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import URL from './url';
import './css/browser.css'


const Browse = () => {
    const [data, setData] = useState([]);
    useEffect(() => {

        const bearerToken = cookie.get('jwt') !== undefined ? cookie.get('jwt') : "";

        axios.get(`${URL}/Books/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        })
            .then((resp) => {
                setData(resp.data)
                console.log(resp, resp === undefined);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])


    return (
        <main className='main-browser'>
            {data.map((element) => {
                return <p style={{backgroundColor:"red", borderRight:"1px solid black"}}>{element.title}</p>
            })}
        </main>
    )
}

export default Browse;