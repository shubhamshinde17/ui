import { useEffect } from "react";
import ValidateUser from "../../utils/ValidateUser";
import Header from '../../components/Header/Header';
const Home = () => {
    const { validate } = ValidateUser();
    useEffect(() => {
        validate();
    })

    return (
        <div style={{ display: 'flex' }}>
            <Header />
            <section className="home-section">
                <div className="home-content">
                    <h5>Hello Home!</h5>
                </div>
            </section>
        </div>
    )
}

export default Home;