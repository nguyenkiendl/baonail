import { useEffect } from "react";
import authService from "~/services/authService";

function PrintLayout({ children }) {
    const isAuthenticated = authService.isAuthenticated();
    useEffect(() => {
        if (!isAuthenticated) {
            navigate("/login");
        }
    }, [isAuthenticated]);
    return (
        <>
            {children}
        </>
    );
}

export default PrintLayout;
