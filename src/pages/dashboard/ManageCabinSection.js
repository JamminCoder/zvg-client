import { getCabinSectionIFrame, updateCabinSectionIFrame } from "../../endpoints/content";
import { preventDefaults } from "../../lib/utils";
import { useEffect, useState } from "react";
import Button from "../../components/Button";

export default function ManageCabinSection() {
    const [isLoaded, setIsLoaded] = useState(false);
    const [iframeUrl, setIframeUrl] = useState(null);
    const [message, setMessage] = useState(null);
    const formID = "iframe_url_form";

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

    function submit(e) {
        preventDefaults(e);
        updateCabinSectionIFrame(document.getElementById(formID))
        .then(res => {
            setMessage(res.data);
        })
        .catch(err => {
            setMessage("Something went wrong");
            console.error(err);
        })
    }

    if (!isLoaded) return "Loading...";

    return <>
    <h1 className="text-4xl font-medium mb-8">Mange cabin section Iframe URL</h1>
    <form id={ formID } onSubmit={ submit }>
        { message ? <p>{ message }</p>: "" }
        <label htmlFor="iframe_url">Cabin section IFrame URL (the link to your hipcamp page)</label><br />
        <textarea 
        name="iframe_url"
        className="w-[100%] max-w-[50em] mb-8" 
        defaultValue={iframeUrl || "https://www.hipcamp.com/en-US/land/new-york-zoar-valley-ridge-j29h5pnj" }/>

        <Button className="bg-green-600 text-white block" onClick={ submit }>Save</Button>
    </form>
    </>
}