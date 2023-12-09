import './css/login.css'
import { useState, useContext } from 'react';
import LoginImg from './images/login.png';
import axios from 'axios';
import URL from './url';
import cookie from 'js-cookie';
import { useNavigate, Navigate } from 'react-router-dom'
import LoginContext from './LoginContext'



function Login() {
    const navigate = useNavigate();
    const { setIsUserLoggedIn } = useContext(LoginContext);
    const [loginState, setLoginState] = useState("nil");
    const [inputErr, setInputErr] = useState(null);
    const [loginErr, setLoginErr] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    if (cookie.get('jwt')) {
        return <Navigate replace to="/dashboard/" />
    }

    async function formSubmit() {

        if (password === '' || username === '') { setInputErr('h'); return; }
        setInputErr('')
        setLoginState("await");
        try {
            const response = await axios.post(`${URL}/Login/login`, {
                title: '',
                body: '',
                Username: username,
                Password: password
            })
            setLoginErr(null);
            setLoginState("");
            cookie.set("username", response.data.username);
            console.log("userID", response.data.userId, response)
            cookie.set("userID", response.data.userId);
            cookie.set("jwt", response.data.token);
            setLoginState("LoggedIn");
            setIsUserLoggedIn(true);

        } catch (error) {
            setLoginState("");
            setLoginErr(error);
            return;
        }
    }
    if (loginState === "LoggedIn") {
        navigate('/dashboard/');
    }

    return (
        <main className={"main-login"}>
            <div className="container-login">
                <div className="image-login">
                    <img src={LoginImg} alt="" />
                </div>
                <div>
                    <div className="utils-login">
                        <h4>Login</h4>
                        <form action="#" className="loginform">

                            <input className={"username"} placeholder={"yourUzaNAme123"} value={username} type="text" onChange={(e) => setUsername(e.target.value)} required />
                            <input className={"password"} placeholder={"***password***"} value={password} type="password" onChange={(e) => setPassword(e.target.value)} pattern={`^(?=.*[a-z])(?=.*[A-Z])(?=.*d)(?=.*[!@#$%^&*()_+{}[]:;<>,.?~\\-]).{8,16}$`} title="Password must be 8-16 characters long and include at least one lowercase letter, one uppercase letter, one digit, and one special character." required />
                            <button className={"submit"} type="submit" disabled={(loginState === "await")} onClick={(e) => { e.preventDefault(); formSubmit(); return; }}>{(loginState === "await") ? <span className={"loader"}></span> : 'Log in'}</button>
                        </form>
                    </div>
                    {inputErr && <p style={{ fontSize: 8, color: "red" }}>**All fields are required </p>}
                    {loginErr && <p style={{ fontSize: 8, color: "red" }}>**{loginErr.response.data}</p>}
                </div>
            </div>
        </main>
    )
}

export default Login;
