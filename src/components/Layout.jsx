import React, { useState, useContext } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import logoWithNameLight from './images/icon-with-name-light-theme.png';
import logoWithNameDark from './images/icon-with-name-dark-theme.png';
import logoLight from './images/icon-light-theme.png';
import logoDark from './images/icon-dark-theme.png';
import './css/root.css'
import cookie from 'js-cookie';
import LoginContext from './LoginContext'
const Layout = () => {
    const location = useLocation();
    // const [isLoggedIn, setIsLoggedIn] = useState(useContext(LoginContext));
    const { isUserLoggedIn, setIsUserLoggedIn } = useContext(LoginContext)
    const [activeTheme, setActiveTheme] = useState('light');

    return (<>
        <header className="header">
            <nav className="top-nav">
                <span className="logo">
                    <img className={"website-logo"} src={(activeTheme === "light") ? logoWithNameLight : logoWithNameDark} alt="website Logo" />
                </span>

                <span className={"nav-options"}>
                    {!isUserLoggedIn ? <a className={`nav-button ${location.pathname.split('/')[1] === '' ? 'active' : ''}`} id="home" href="/"> Home</a> : <a className={`nav-button ${location.pathname.split('/')[1] === 'dashboard' ? 'active' : ''}`} id="dashboard" href="/dashboard"> Dashboard</a>}
                    <span className={"nav-divider"}></span>
                    {!isUserLoggedIn ? <a className={`nav-button ${location.pathname.split('/')[1] === 'contactus' ? 'active' : ''}`} id="contact" href="/contactus"> Contact us</a> : <a className={`nav-button ${location.pathname.split('/')[1] === 'profile' ? 'active' : ''}`} id="profile" href="/profile"> Profile</a>}
                    <span className={"nav-divider"}></span>
                    {!isUserLoggedIn ? <a className={`nav-button ${location.pathname.split('/')[1] === 'login' ? 'active' : ''}`} id="login" href="/login"> Login</a> : <a className={`nav-button ${location.pathname.split('/')[1] === 'cart' ? 'active' : ''}`} id="cart" href="/cart"> Cart</a>}
                    <span className={"nav-divider"}></span>
                    {!isUserLoggedIn ? <a className={`nav-button ${location.pathname.split('/')[1] === 'signup' ? 'active' : ''}`} id="signup" href="/signup"> Sign up</a> : <a className={`nav-button ${location.pathname.split('/')[1] === 'logout' ? 'active' : ''}`} onClick={() => { cookie.remove('username'); cookie.remove('jwt'); return }} id="logout" href="/"> Log out</a>}

                </span>
            </nav>
        </header>
        <Outlet />
        <footer className="footer">
            <div className="footer-nav">
                <img src={(activeTheme === "light") ? logoLight : logoDark} alt="footer logo" className="footer-logo" />
                <p className="footer-note">© 2023 GitHub, Inc.</p>
                <p className="footer-note"><a href="">Terms</a></p>
                <p className="footer-note"><a href="">Privacy</a></p>
                <p className="footer-note"><a href="">Security</a></p>
                <p className="footer-note"><a href="">Status</a></p>
                <p className="footer-note"><a href="">Docs</a></p>
                <p className="footer-note"><a href="/contactus">Contact</a></p>

            </div>
        </footer>

    </>)
}

export default Layout;