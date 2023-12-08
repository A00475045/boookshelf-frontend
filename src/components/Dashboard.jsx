import { Navigate } from 'react-router-dom';
import cookie from 'js-cookie';
const Dashboard = () => {

    console.log("Dashboard working!!", cookie.get("jwt"));

    if (!cookie.get("jwt")) {
        console.log("user not found")
        return <Navigate replace to="/login" />
    }

    return (<>
        this is the Dashboard
    </>)
}
export default Dashboard;