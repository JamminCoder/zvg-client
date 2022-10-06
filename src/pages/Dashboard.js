import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { isVerified, hasJwt } from "../auth";


export default function Dashboard(props) {
    const [verified, setVerified] = useState("FILLER VALUE");

    useEffect(() => {
        isVerified().then(result => {
            setVerified(result);
        })
    });

    if (!hasJwt() || !verified) return <Navigate to="/login"/>;

    return <h1 className="text-4xl font-bold">Dashboard</h1>;
}