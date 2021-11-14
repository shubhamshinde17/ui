import React from 'react'
import SignUpForm from '../../components/SignUpForm'
import '../Login/Login.css'

export const Signup = (props) => {
    return (
        <div>
            <SignUpForm setToken={props.setToken} />
        </div>
    )
}

export default Signup