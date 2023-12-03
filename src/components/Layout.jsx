import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';

const Layout = () => {

    const [activeTab, setActiveTab] = useState('A');

    return (<>
        <header className="header">
            <span className="name-header-container"><p className="name-header">This is QA</p></span>
            <nav className={"nav-container"}>
                <span className={`nav-element${(activeTab === 'A') ? " active" : ""}`} onClick={() => setActiveTab('A')}><Link to="/" >About me </Link></span>
                <span className={`nav-element${(activeTab === 'M') ? " active" : ""}`} onClick={() => setActiveTab('M')}><Link to="/mycity" >My City </Link></span>
                {/* <span className={`nav-element${(activeTab == 'C') ? " active" : ""}`} onClick={() => setActiveTab('C')}><Link to="/contactme" >Contact me </Link></span> */}
            </nav>
        </header>
        <Outlet />
        <footer className="footer">
            <p>This is a Assignment for the MCDA5510 ©2023</p>
        </footer>

    </>)
}

export default Layout;