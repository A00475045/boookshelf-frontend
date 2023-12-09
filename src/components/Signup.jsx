import { useState } from 'react';
import './css/signup.css';
import SignupImg from './images/signup.svg'
import cookie from 'js-cookie'
import { Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios';
import URL from './url';


const Signup = () => {
    const navigate = useNavigate();

    const [signupState, setSignupState] = useState("");
    const [signUpFormValid, setSignUpFormValid] = useState(false);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRepassword] = useState("");
    const [passwordDontMatch, setPasswordDontMatch ] = useState(false);
    const [signupFailed, setSignupFailed ] = useState(false);
    // const [array, setArray] = useState([]);

    if (cookie.get('jwt')) {
        return <Navigate replace to="/dashboard/" />
    }
    // console.log(signUpFormValid);
    const checkFormData = () => {
        if(
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            username === "" ||
            password === "" ||
            repassword  === "" || !isValidName(firstName) || !isValidName(lastName) || !isValidEmail(email)
        ) { setSignUpFormValid(false); return; }

        setSignUpFormValid(true);
    }
    const formSubmit =  async (e) => {
        setPasswordDontMatch(false);
        setSignupFailed(false);
        if(
            firstName === "" ||
            lastName === "" ||
            email === "" ||
            username === "" ||
            password === "" ||
            repassword  === "" || !isValidName(firstName) || !isValidName(lastName) || !isValidEmail(email)
        ) { alert("please check the format for names,email."); return;}
        if(password !== repassword){
            setPasswordDontMatch(true);
            return;
        } 
        setSignupState("await");

        

        try{
            const response = await axios.post(`${URL}/registration`,{
                title: '',
                body: '',
                FirstName: firstName,
                LastName: lastName,
                Username: username,
                Email: email,
                Password:password
            })
            console.log(response);
            navigate("/login");
        }
 catch(error ){
    console.log(error)
    setSignupFailed(error.response.data.error);
 }
 setSignupState("n");

        

    }

    function isValidName(name) {
        // Name should not contain specified characters
        const invalidCharactersRegex = /[;:!@#$%^*+?\\/<>1234567890]/;
        return !invalidCharactersRegex.test(name);
      }
      function isValidEmail(email) {
        // Basic email validation using a regular expression
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
      }

    return (
        <main className={"main-signup"}>
            <div className="container-signup">
                <div className="image-signup">
                    <img src={SignupImg} alt="" className="image-signup" />
                </div>
                <div>
                <div className="utils-signup">
                    <h4>Sign Up</h4>
                    <form action="#" className="signupform">

                        <span> <input type="text" className="firstname" onChange={(e) => {setFirstName(e.target.value); checkFormData(); return;}} id="firstname" value={firstName} placeholder={"firstName"} required /> <input type="text" onChange={(e) => {setLastName(e.target.value); checkFormData(); return;}} className="lastname" value={lastName} id="lastname" placeholder={"lastName"} required /> </span>
                        <input className={"username"} onChange={(e) => {setEmail(e.target.value); checkFormData(); return;}} value={email} id="email" placeholder={"the_tourist.coder@smu.ca"} type="email" required />
                        <input className={"username"} value={username} onChange={(e) => {setUsername(e.target.value); checkFormData(); return;}} id="username" placeholder={"username"} type="text" required />
                        <input className={"password"} value={password} onChange={(e) => {setPassword(e.target.value); checkFormData(); return;}} id="password" placeholder={"***password***"} type="password" required />
                        <input className={"password"} value={repassword} onChange={(e) => {setRepassword(e.target.value); checkFormData(); return;}} id="repassword" placeholder={"password again"} type="password" required />
                        <button title={signUpFormValid ? "Enabled" : "Disabled"} className={"submit"} style={{backgroundColor: signUpFormValid ? "var(--var-secondary-color)" : "grey"}} type="submit" disabled={!signUpFormValid} onClick={(e) => { e.preventDefault(); formSubmit(); return; }}>{(signupState === "await") ? <span className={"loader"}></span> : 'Sign up'}</button>
                    </form>
                </div>
                {passwordDontMatch && <p style={{color : "red", fontSize:8}}>Password & confirm Password dont match!!</p>}
                {signupFailed && <p style={{color : "red", fontSize:8}}>{signupFailed}</p>}
                </div>
            </div>
        </main>
    )
}

export default Signup;
