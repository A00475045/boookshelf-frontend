import img1 from './images/home-1.jpeg';
import img2 from './images/home-2.jpg';
import img3 from './images/home3.jpeg';
import cookie from 'js-cookie';
import { Navigate } from 'react-router-dom';
import './css/home.css'


const Home = () => {

    if (cookie.get('jwt')) {
        return <Navigate replace to="/dashboard/" />
    }


    return (
        <main className={"main"}>
            <div className="content">
                <span className={"content-img"}><img src={img1} style={{ height: "30vh", width: "20vw" }} alt="" /></span>
                <span className={"content-data"}>
                    <h6 className={"content-data-header"}>Curated Collections for Literary Exploration</h6>
                    <p className={"content-data-para"}>Welcome to a literary journey like no other! Our first page introduces you to thoughtfully curated book collections, handpicked by our team of avid readers. Instead of a generic display of random titles, we present you with carefully themed collections that span genres, eras, and cultures. Whether you're into classic literature, contemporary fiction, or niche genres, these collections serve as gateways to exciting literary realms. Explore "Hidden Gems from the 20th Century," embark on a "World Tour of Mysteries," or delve into "Under-the-Radar Sci-Fi Classics." Each collection is a carefully crafted narrative waiting for you to discover. Immerse yourself in the joy of exploration, and let our curated collections redefine the way you experience and acquire used books. Happy reading!</p>
                </span>
            </div>
            <div className="content">
                <span className={"content-data"}>
                    <h6 className={"content-data-header"}>Personalized Reading Recommendations</h6>
                    <p className={"content-data-para"} style={{ width: "45vw" }}>Embark on a personalized reading journey with our cutting-edge recommendation engine. By understanding your literary preferences, reading history, and favorite genres, our website tailors book suggestions uniquely suited to your tastes. No more sifting through endless titles; let our algorithm be your literary guide. Discover hidden gems you might have overlooked and receive real-time updates on new arrivals that align with your interests. Your next favorite book is just a personalized recommendation away. Embrace the joy of serendipitous discoveries and make your reading experience truly one-of-a-kind.</p>
                </span>
                <span className={"content-img"}><img src={img2} style={{ height: "40vh", width: "20vw" }} alt="" /></span>

            </div>
            <div className="content">
                <span className={"content-img"}><img src={img3} alt="" /></span>
                <span className={"content-data"}>
                    <h6 className={"content-data-header"}>Book Swap Community Hub</h6>
                    <p className={"content-data-para"}>Become a part of our thriving book-loving community! Our first page introduces you to a dynamic Book Swap feature where users can trade their pre-loved books with fellow enthusiasts. Clear out space on your bookshelves and, in return, explore a treasure trove of titles contributed by others. It's a sustainable way to refresh your reading list while fostering connections with like-minded readers. Join discussions about your favorite books, share reading recommendations, and celebrate the joy of giving and receiving. Our Book Swap Community Hub transforms your used books website into more than just a marketplace; it's a communal space where stories find new homes and readers build lasting connections. Happy swapping!</p>
                </span>
            </div>

        </main>
    )
}

export default Home;