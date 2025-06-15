import React from "react";
import './home.css';
import SideNavbar from "../../Components/SideNavbar/sideNavbar.jsx";
import HomePage from "../../Components/HomePage/homePage.jsx";

// Receive sideNavbar as a prop here
const Home = ({ sideNavbar }) => {
    return (
        <>
            {/* Main home page */}
            <div className="home">
               
                <SideNavbar sideNavbar={sideNavbar} />
                <HomePage sideNavbar={sideNavbar} />
            </div>
        </>
    );
};

export default Home;
