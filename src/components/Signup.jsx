import { useEffect, useState } from 'react';
import './css/signup.css';
import SignupImg from './images/signup.svg'
import cookie from 'js-cookie'
import { Navigate } from 'react-router-dom'


const Signup = () => {

    const [signupState, setSignupState] = useState("");

    if (cookie.get('jwt')) {
        return <Navigate replace to="/dashboard" />
    }
    const formSubmit = (e) => {
        setSignupState("await");


    }

    return (
        <main className={"main-signup"}>
            <div className="container-signup">
                <div className="image-signup">
                    <img src={SignupImg} alt="" className="image-signup" />
                </div>
                <div className="utils-signup">
                    <h4>Sign Up</h4>
                    <form action="#" className="signupform">

                        <span> <input type="text" className="firstname" id="firstname" placeholder={"firstName"} required /> <input type="text" className="lastname" id="lastname" placeholder={"lastName"} required /> </span>
                        <input className={"username"} id="email" placeholder={"the_tourist.coder@smu.ca"} type="email" required />
                        <input className={"username"} id="username" placeholder={"username"} type="text" required />
                        <input className={"password"} id="password" placeholder={"***password***"} type="password" required />
                        <input className={"password"} id="password" placeholder={"password again"} type="password" required />
                        <button className={"submit"} type="submit" onClick={(e) => { e.preventDefault(); formSubmit(); return; }}>{(signupState === "await") ? <span className={"loader"}></span> : 'Sign up'}</button>
                    </form>
                </div>

            </div>
        </main>
    )
}

export default Signup;
