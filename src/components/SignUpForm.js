import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL, REQUEST_HEADERS } from '../config/envConfig';
import { SIGNUP } from "../constants/ApiEndpoints";
import { useNavigate, useLocation } from 'react-router-dom';

export default function SignInForm(props) {
    const USER_DATA = {
        fullName: "",
        loginId: "",
        email: "",
        age: 18,
        password: "",
        confirmpassword: "",
        role: "user",
    }

    const BLANK_ERROR = {
        errorMessage: "",
        isVisible: false
    }

    const errorMessageStyles = {
        textAlign: "center",
        backgroundColor: "#faafaa",
        width: "100%",
        padding: "5% 3%",
        borderRadius: "15px"
    }

    const navigate = useNavigate();
    const location = useLocation();
    const [userData, setUserData] = useState(USER_DATA);
    const [error, setError] = useState(BLANK_ERROR);
    const [loggingIn, setLoggingIn] = useState(false);
    const isMounted = React.useRef(true);
    useEffect(() => {
        if (isMounted.current) {
            return () => {
                isMounted.current = false;
            };
        }
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (error.isVisible) setError(BLANK_ERROR);

        setUserData(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (userData.loginId !== "" && userData.email !== "" && userData.password !== "") {
                if (userData.password === userData.confirmpassword) {
                    await signupUser(userData);
                } else {
                    setError({
                        errorMessage: "Password doesn't match with Confirmed Password!",
                        isVisible: true
                    })

                    setTimeout(() => {
                        setError(BLANK_ERROR)
                    }, 2000);
                }
            } else {
                console.log(JSON.stringify(userData));
                setError({
                    errorMessage: "Please fill in the Form!",
                    isVisible: true
                })

                setTimeout(() => {
                    setError(BLANK_ERROR)
                }, 2000);
            }

        } catch (err) {
            if (err.response.status !== 200) {
                setError({
                    errorMessage: err.response.data.message,
                    isVisible: true
                })
            }
        }
    }

    const signupUser = async (userData) => {
        setLoggingIn(true);
        try {
            const response = await axios.post(`${API_URL}${SIGNUP}`, userData, { headers: REQUEST_HEADERS });
            const responseData = response.data;
            if (responseData.code === 200) {

                const accessToken = responseData.data.accessToken;
                const userId = responseData.data.id;
                const email = responseData.data.email;
                const name = responseData.data.name;
                const joiningDate = responseData.data.joiningDate;

                const NOCTokenDetails = {
                    accessToken, userId, email, name, joiningDate, loggedInOn: new Date()
                }

                props.setToken(NOCTokenDetails);
                navigate('/home')
                setLoggingIn(false);
                return responseData;
            } else {
                setLoggingIn(false);
                setError({ errorMessage: responseData.userMessage, isVisible: true });
                return null;
            }
        } catch (error) {
            console.log(error)
            setError({ errorMessage: 'Server Error!', isVisible: true });
            setLoggingIn(false);
        }
    }

    return (
        <div className="login-wrapper">
            <form className="signInForm" onSubmit={handleOnSubmit}>
                <h1 className="signinTitle">Sign Up</h1>
                <div className="row justify-center">
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Full Name"
                        name="fullName"
                        onChange={handleChange}
                        value={userData.fullName}
                    />
                </div>
                <div className="row justify-center">
                    <input
                        className="auth-input"
                        type="text"
                        placeholder="Username"
                        name="loginId"
                        onChange={handleChange}
                        value={userData.loginId}
                    />
                </div>
                <div className="row justify-center">
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Email"
                        name="email"
                        onChange={handleChange}
                        value={userData.email}
                    />
                </div>
                <div className="row justify-center">
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Password"
                        name="password"
                        onChange={handleChange}
                        value={userData.password}
                    />
                </div>
                <div className="row justify-center">
                    <input
                        className="auth-input"
                        type="password"
                        placeholder=" Confirm Password"
                        name="confirmpassword"
                        onChange={handleChange}
                        value={userData.confirmpassword}
                    />
                </div>
                <div className="row justify-center">
                    <div className="col-6 col-lg-6">
                        <button
                            className="signinButton"
                            type="submit">
                            {loggingIn ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Sign Up</span>}
                        </button>
                    </div>
                </div>
                <div style={{ visibility: error.isVisible ? "visible" : "hidden", padding: "5% 15%" }}>
                    <h4 style={errorMessageStyles}>{error.errorMessage}</h4>
                </div>
            </form>

        </div>
    )
}