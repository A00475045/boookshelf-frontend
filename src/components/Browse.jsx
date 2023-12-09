import { useEffect, useState } from 'react';
import axios from 'axios';
import cookie from 'js-cookie';
import URL from './url';
import './css/browser.css'
import FlashCard from './FlashCard';

const Browse = () => {
    const [data, setData] = useState([]);
    // const [dataIncart, setDataInCart] = useState([]);
    const [dataInUse, setDataInUse] = useState([]);
    const [search, setSearch] = useState("");
    useEffect(() => {
        const bearerToken = cookie.get('jwt') !== undefined ? cookie.get('jwt') : "";
        axios.get(`${URL}/Books/activeListing?userId=${cookie.get('userID')}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${bearerToken}`
            }
        })
            .then((resp) => {
                setData(resp.data)
                setDataInUse(resp.data)
            })
            .catch((err) => {
            })
            
    }, [])
    useEffect(() => {
        setDataInUse(data.filter(book => book.title.includes(search)));


    },[search])


    return (
        <>
        <div className='search'> <input type='text' value={search} placeholder='Search books here' onChange={(e) => setSearch(e.target.value)}/></div>
        <main className='main-browser'>
            
            {/* <div> */}
            {dataInUse.map((element) => {
                return <FlashCard book={element} userID={cookie.get("userID")} />
            })}
            {/* </div> */}
        </main>
        </>
    )
}

export default Browse;