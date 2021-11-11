import React from 'react'
import SignInForm from '../../components/SignInForm'
import './Login.css';

export const Login = (props) => {
    return (
        <div>
            <SignInForm setToken={props.setToken} />
        </div>
    )
}

export default Login