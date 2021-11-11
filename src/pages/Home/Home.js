import { useEffect } from "react";
import Header from "../../components/Header";
import ValidateUser from "../../utils/ValidateUser";

const Home = () => {
    const { validate } = ValidateUser();
    useEffect(() => {
        validate();
    })

    return (
        <div style={{ display: 'flex' }}>
            <Header />
            <div>
                Welcome Home!
            </div>
        </div>
    )
}

export default Home;