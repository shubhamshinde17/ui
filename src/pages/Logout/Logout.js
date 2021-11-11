import { Component, useEffect } from "react";
import { useNavigate } from "react-router";
import './Logout.css'

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
        <div>
            <h1>Logging out!</h1>
        </div>
    )
}

export default Logout;