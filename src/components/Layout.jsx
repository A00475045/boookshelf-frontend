import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import logoWithNameLight from './images/icon-with-name-light-theme.png';
import logoWithNameDark from './images/icon-with-name-dark-theme.png';
import logoLight from './images/icon-light-theme.png';
import logoDark from './images/icon-dark-theme.png';
import './css/root.css'

const Layout = () => {

    const [activeTheme, setActiveTheme] = useState('light');

    return (<>
        <header className="header">
            <nav className="top-nav">
                <span className="logo">
                    <img className={"website-logo"} src={(activeTheme === "light") ? logoWithNameLight : logoWithNameDark} alt="website Logo" />
                </span>

                <span className={"nav-options"}>
                    <button className="nav-button active"> Home</button>
                    <span className={"nav-divider"}></span>
                    <button className="nav-button"> Contact us</button>
                    <span className={"nav-divider"}></span>
                    <button className="nav-button"> Login</button>
                    <span className={"nav-divider"}></span>
                    <button className="nav-button"> Sign up</button>

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
                <p className="footer-note"><a href="">Contact</a></p>

            </div>
        </footer>

    </>)
}

export default Layout;