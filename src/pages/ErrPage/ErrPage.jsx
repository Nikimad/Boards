import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ErrPage = () => {
    const navigate = useNavigate();
    const { pathname } = useLocation();

    useEffect(() => {
        const timer = setTimeout(() => navigate("/"), 1000);

        return () => {
            clearTimeout(timer);
        };
    });

    return (
        <h3>No match for {pathname}</h3>
    );
};

export default ErrPage;
