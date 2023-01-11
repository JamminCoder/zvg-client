import { useState, useEffect } from "react"; 
import { getCabinSectionIFrame } from "../../endpoints/content";

export default function CabinSection() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(null);

    useEffect(() => {
        if (!isLoaded) {
            getCabinSectionIFrame()
            .then(iframeUrl => {
                setIframeUrl(iframeUrl);
                console.log(iframeUrl)
                setIsLoaded(true);
            })
            .catch(err => {
                setIsLoaded(true);
                console.error(err);
            })
        }
    });

    function modifyIframeLinks() {
        const iframe = document.getElementById("hipcamp_iframe");
        const anchors = iframe.getElementsByTagName("a");
        anchors.forEach(el => {
            console.log(el);
            el.setAttribute("target", "_blank");
        });

        console.log("loaded");
    }

    return (
    <div className="grid place-items-center py-16">
        <div className="mb-16 grid place-items-center gap-4">
            <h2 className="text-6xl font-medium text-center">Zoar Valley Ridge Campgrounds</h2>
            <a className="link w-fit text-center rounded text-3xl font-medium " href={ iframeUrl }>Visit Hipcamp Page</a>
        </div>

        <p className="text-center">Page preview of the real <a className="link text-xl" href={ iframeUrl }>Hipcamp Page</a></p>
        <iframe 
        onLoad={ modifyIframeLinks }
        id="hipcamp_iframe" 
        loading="lazy" 
        src={ iframeUrl } 
        className="max-w-[60rem] w-[100%] h-[80vh] border shadow-lg">
        </iframe>
    </div>
    )
}