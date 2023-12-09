import { useEffect, useState } from 'react';
import './css/profile.css';
import axios from 'axios';
import Cookies from 'js-cookie';
import URL from './url'
const Profile =() => {
    
    const [arr,setArr] = useState([])
    useEffect(() => {
        // console.log(`${URL}/transaction/getOrders?BuyerId=${Cookies.get('userID')}`)
        axios.get(`${URL}/transaction/getOrders?BuyerId=${Cookies.get('userID')}`,{
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${Cookies.get("jwt")}`,
            },
        })
        .then((resp) => {
            // console.log(resp)
            setArr(resp.data)

        })
        .catch((err) => {
            alert("there was an error!!");
        })
    },[])
    return (
        <main className='main-profile'>
            <h2>order details</h2>
        {(arr.length===0) ? <div>{`nothing to show... :(`} </div> : arr.map((ele,index) => {
            return <div> {index+1}.) Book id: {ele.bookId} CAD ${ele.totalAmount}</div>
        })}
        </main>
    )
}

export default Profile;