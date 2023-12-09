import { useEffect, useState } from "react"
import Cookies from "js-cookie"
import URL from './url';
import axios from 'axios';
import {Navigate} from 'react-router-dom';
import './css/cart.css';

const Cart = () => {
    const [booksInCart, setBooksinCart] = useState([])
    const [deleteErr, setDeleteErr] = useState(false);

    useEffect(() => {
        axios.get(`${URL}/cart/getItem?UserId=${Cookies.get("userID")}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`
            }
        })
            .then((resp) => {
                setBooksinCart(resp.data)
                console.log(resp);
            })
            .catch((err) => {
            })
    },[])
    if (!Cookies.get("jwt")) {
        return <Navigate replace to="/login" />
    }
    const deleteFromCart = (id) => {
        axios.delete(`${URL}/cart/deleteItem?UserId=${Cookies.get("userID")}&bookID=${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${Cookies.get('jwt')}`
            }
        })
        .then((resp) => {
            axios.get(`${URL}/cart/getItem?UserId=${Cookies.get("userID")}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('jwt')}`
                }
            })
                .then((resp) => {
                    setBooksinCart(resp.data)
                })
                .catch((err) => {
                 
                })

            
        })
        .catch((err) => {
            setDeleteErr(true)
        })

    }
    return (
        <main className="main-cart">
            {booksInCart.map(book => {
               return <div className="cart-item">
                <h5>{book.bookId} {book.bookTitle}</h5>
                    {/* <a href=""></a> */}
                    <button className="delete-button" style={{color:"red", fontSize:26}} onClick={() => deleteFromCart(book.bookId)}>&#128465;</button>
                    {deleteErr && <p style={{color: "red", fontSize:8}}> An error occured while deleting the Item from the cart</p>}
               </div>
            })}
            {(booksInCart.length > 0) && <button oncli> Buy all</button>}


        </main>
    )
}
export default Cart;