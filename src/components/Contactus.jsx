import './css/contact.css'
import ContactUs from './images/contactus.png'
import cookie from 'js-cookie'
import { Navigate } from 'react-router-dom'

const Contactus = () => {

    if (cookie.get('jwt')) {
        return <Navigate replace to="/dashboard" />
    }
    return (
        <main className={"main-contact"}>
            <div className="container-contact">
                <div className="image-contact">
                    <img src={ContactUs} alt="" />
                </div>
                <div className="utils-contact">
                    <p className={"contact-us"} >&#x1F4CD; 6743, Fork Street, HFX, NS</p>
                    <span className={"divider"}></span>
                    <p className={"contact-us"} >&#x260E; +1 (732)-822-6342</p>
                    <span className={"divider"}></span>
                    <p className={"contact-us"} >&#x2709; micheal.scott@smu.ca</p>
                    <span className={"divider"}></span>
                </div>

            </div>
        </main>
    )
}

export default Contactus;
