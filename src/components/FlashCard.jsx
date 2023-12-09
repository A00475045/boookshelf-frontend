import './css/flashcard.css'
import axios from 'axios';
import URL from './url';
import Cookies from 'js-cookie';
import { useState } from 'react';


const FlashCard = ({book, userID, dataIncart}) => {

    const [canBeAdded, setCanBeAdded] = useState(true);
    
    const addToCart = async () => {
        try{
            console.log(userID, book.bookId)
            const response = await axios.post(`${URL}/cart/addItem`,{
                UserId: userID,
                BookId: book.bookId
            }, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('jwt')}`,
                },
                    

            })
            console.log(response)
            setCanBeAdded(false)


        }catch(error) {
            console.log(error)

        }
    }
    
    return (<>
        { <div className="cards">
            
            <h5>{book.title}</h5>
<span><p>{book.categoryName} CAD${book.price}</p> <img src={book.imageUrl} alt="" /></span>
            
            {canBeAdded && <button className='add-to-cart' onClick={addToCart}> Add to Cart </button>}
        </div>}
        </>
    )
}

export default FlashCard;