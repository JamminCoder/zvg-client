import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, isLoggedIn } from "../lib/auth";

export default function DashboardLayout(props) {
    const [verified, setVerified] = useState("FILLER VALUE");
    
    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })
    });

    if (!isLoggedIn() || !verified) return <Navigate to="/login"/>;

    return (
        <div className={ `relative flex bg-slate-50 ${ props.className }` } { ...props }>
            { props.children }
        </div>
    );
}