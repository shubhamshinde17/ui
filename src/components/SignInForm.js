import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { API_URL, REQUEST_HEADERS } from '../config/envConfig';
import { useNavigate, useLocation } from 'react-router-dom';

const BLANK_CREDENTIALS = {
    email: "",
    password: ""
};

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

export default function SignInForm(props) {
    const history = useNavigate();
    const location = useLocation();
    const [creds, setCreds] = useState(BLANK_CREDENTIALS);
    const [error, setError] = useState(BLANK_ERROR);
    const [loggingIn, setLoggingIn] = useState(false);

    useEffect(() => {
        if (location.state) {
            setCreds(prev => {
                return {
                    ...prev,
                    email: location.state.email
                };
            });
        }
    }, [location.state]);

    const loginUser = async (creds) => {
        setLoggingIn(true);
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, creds, { headers: REQUEST_HEADERS });
            const responseData = response.data;
            if (responseData.code === 200) {

                const accessToken = responseData.data.accessToken;
                const userId = response.data.id;
                const email = response.data.email;
                const name = response.data.name;
                const joiningDate = response.data.joiningDate;

                const NOCTokenDetails = {
                    accessToken, userId, email, name, joiningDate, loggedInOn: new Date()
                }

                props.setToken(NOCTokenDetails);
                history('/home')
                setLoggingIn(false);
                return response;
            } else {
                setTimeout(() => {
                    setError({ errorMessage: responseData.userMessage, isVisible: true });
                }, 2000);
                setLoggingIn(false);
                return null;
            }
        } catch (error) {
            setError({ errorMessage: 'Server Error!', isVisible: true });
            setLoggingIn(false);
        }
    }

    const handleOnSubmit = async (e) => {
        e.preventDefault();
        try {
            if (creds.email !== "" && creds.password !== "") {

                await loginUser(creds);

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

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (error.isVisible) setError(BLANK_ERROR);

        setCreds(prev => {
            return {
                ...prev,
                [name]: value
            };
        });
    }

    return (
        <div className="form-container sign-in-container">
            <form className="signInForm" onSubmit={handleOnSubmit}>
                <h1 className="signinTitle">Sign In</h1>
                <input
                    className="auth-input"
                    type="email"
                    placeholder="Email"
                    name="email"
                    onChange={handleChange}
                    value={creds.email}
                />
                <input
                    className="auth-input"
                    type="password"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                    value={creds.password}
                />
                <button
                    className="signinButton"
                    type="submit">
                    {loggingIn ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : <span>Sign In</span>}
                </button>
                <div style={{ visibility: error.isVisible ? "visible" : "hidden", padding: "5% 15%" }}>
                    <h4 style={errorMessageStyles}>{error.errorMessage}</h4>
                </div>
            </form>

        </div>
    )
}