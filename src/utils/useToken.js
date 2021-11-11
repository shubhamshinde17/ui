import { useState } from 'react';

export default function useToken() {
    const getToken = () => {
        const tokenString = localStorage.getItem('NOCTokenDetails');
        const userToken = JSON.parse(tokenString);
        return userToken?.accessToken
    };

    const [token, setToken] = useState(getToken());

    const saveToken = userToken => {
        localStorage.setItem('NOCTokenDetails', JSON.stringify(userToken));
        setToken(userToken.accessToken);
    };

    return {
        setToken: saveToken,
        token
    }
}