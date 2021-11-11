import { useNavigate } from "react-router"
import * as RoutePaths from "../constants/RoutePaths";

const ValidateUser = () => {
    let navigate = useNavigate()

    const validate = () => {
        const tokenString = localStorage.getItem('NOCTokenDetails');
        const userToken = JSON.parse(tokenString);
        if (!userToken) {
            navigate(RoutePaths.LOGIN)
        }
    }

    return {
        validate
    }

}

export default ValidateUser;