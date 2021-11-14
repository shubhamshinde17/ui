import { useEffect } from "react";
import { useNavigate } from "react-router";
import './Logout.css'
import '../Login/Login.css'

const Logout = () => {
    let navigate = useNavigate()
    useEffect(() => {
        logout();
    })

    function logout() {
        localStorage.removeItem('NOCTokenDetails');
        setTimeout(() => {
            navigate('/')
        }, 1000)
    }

    return (
        <div className="login-wrapper">
            <div className="signInForm">
                <h1>Logging out!</h1>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            </div>
        </div>
    )
}

export default Logout;