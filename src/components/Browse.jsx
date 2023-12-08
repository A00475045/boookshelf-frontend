import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import URL from './url';


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
        <>
            {data.map((element) => {
                return <p>{element.title}</p>
            })}
        </>
    )
}

export default Browse;