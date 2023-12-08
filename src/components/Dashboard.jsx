import { useState } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import cookie from 'js-cookie';
import './css/dashboard.css'
const Dashboard = () => {
    const location = useLocation();

    // console.log("Dashboard working!!", cookie.get("jwt"));
    const [activeSideTab, setActiveSideTab] = useState(location.pathname.split('/')[2]);

    if (!cookie.get("jwt")) {
        console.log("user not found")
        return <Navigate replace to="/login" />
    }

    return (
        <main className={"main-dashboard"}>
            <nav className="side-nav">
                <a className="side-button" href="/dashboard/" ><span className={`nav-element ${activeSideTab === "" ? "active" : ""}`}>Browse all</span></a>
                <a className="side-button" href="/dashboard/yourselling" ><span className={`nav-element ${activeSideTab === "yourselling" ? "active" : ""}`}>Your sellings</span></a>
            </nav>
            <div className="content-contai">
                <Outlet />
            </div>


        </main>)
}
export default Dashboard;