import LoadingPage from '../components/Loading';
import { useState, useEffect } from "react";
import { getAboutPage } from "../endpoints/content";

export default function About() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageData, setPageData] = useState();

    useEffect(() => {
        if (isLoaded) return;

        getAboutPage()
        .then(setPageData).catch(console.error)
        .finally(() => setIsLoaded(true));
    });

    if (!isLoaded) return <LoadingPage />;

    return (
        <div className="py-24 px-4 grid place-content-center">
            <h1 className="text-4xl font-medium mb-8">{ pageData.header }</h1>
            <p>{ pageData.body }</p>    
        </div>
    );
}