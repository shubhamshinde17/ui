import React, { useEffect } from 'react'
import { Link } from "react-router-dom";
import './Header.css'

const Header = () => {
    useEffect(() => {
        let sidebar = document.querySelector(".sidebar");
        sidebar.classList.remove("close");
    }, []);

    function onArrowClick(e) {
        let arrowParent = e.target.parentElement.parentElement; //selecting main parent of arrow
        arrowParent.classList.toggle("showMenu");
    }

    function onMenuClick() {
        let sidebar = document.querySelector(".sidebar");
        sidebar.classList.toggle("close");
    }

    return (
        <div className="sidebar">
            <div className="logo-details">
                <i onClick={onMenuClick} className='bx bx-menu'></i>
                <span className="logo_name">SparkTech</span>
            </div>
            <ul className="nav-links">
                <li>
                    <Link to="/">
                        <i className='bx bx-grid-alt'></i>
                        <span className="link_name">Dashboard</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/">Dashboard</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <Link to="/">
                            <i className='bx bx-collection'></i>
                            <span className="link_name">Category</span>
                        </Link>
                        <i onClick={onArrowClick} className='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link className="link_name" to="/">Category</Link></li>
                        <li><Link to="/">HTML CSS</Link></li>
                        <li><Link to="/">JavaScript</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="iocn-link">
                        <Link to="/">
                            <i className='bx bx-book-alt'></i>
                            <span className="link_name">Posts</span>
                        </Link>
                        <i onClick={onArrowClick} className='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link className="link_name" to="/">Posts</Link></li>
                        <li><Link to="/">Web Design</Link></li>
                        <li><Link to="/">Login Form</Link></li>
                        <li><Link to="/">Card Design</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/">
                        <i className='bx bx-pie-chart-alt-2'></i>
                        <span className="link_name">Analytics</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/">Analytics</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/">
                        <i className='bx bx-line-chart'></i>
                        <span className="link_name">Chart</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/">Chart</Link></li>
                    </ul>
                </li>
                {/* <li>
                    <div className="iocn-link">
                        <Link to="/">
                            <i className='bx bx-plug'></i>
                            <span className="link_name">Plugins</span>
                        </Link>
                        <i className='bx bxs-chevron-down arrow'></i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link className="link_name" to="/">Plugins</Link></li>
                        <li><Link to="/">UI Face</Link></li>
                        <li><Link to="/">Pigments</Link></li>
                        <li><Link to="/">Box Icons</Link></li>
                    </ul>
                </li> */}
                <li>
                    <Link to="/">
                        <i className='bx bx-compass'></i>
                        <span className="link_name">Explore</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/">Explore</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/">
                        <i className='bx bx-history'></i>
                        <span className="link_name">History</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/">History</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to="/user/profile">
                        <i className='bx bx-cog'></i>
                        <span className="link_name">Setting</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link className="link_name" to="/user/profile">Setting</Link></li>
                    </ul>
                </li>
                <li>
                    <div className="profile-details">
                        <div className="profile-content">
                            <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.pngitem.com%2Fpimgs%2Fm%2F146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png&f=1&nofb=1" alt="profileImg" />
                        </div>
                        <div className="name-job">
                            <div className="profile_name">PROFILE_NAME</div>
                            <div className="job">TAG</div>
                        </div>
                        <Link to="/logout">
                            <i className='bx bx-log-out'></i>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Header;