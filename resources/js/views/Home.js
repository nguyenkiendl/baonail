import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        navigate('/login');
    }, [navigate]);

    return (
        <>
            <h3>HOME PAGE</h3>
        </>
    );
};

export default Home;
