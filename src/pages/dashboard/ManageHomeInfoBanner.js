import axios from "axios";
import { API_CONTENT_HOMEPAGE_INFO_UPDATE } from "../../apiRoutes";
import Button from "../../components/Button";
import { XSRF_HEADER } from "../../lib/auth";
import { preventDefaults } from "../../lib/utils";
import { useEffect, useState } from "react";
import { API_CONTENT_HOMEPAGE_INFO } from "../../apiRoutes";

export default function ManageHomeInfoBanner() {
    const [homepageInfo, setHomepageInfo] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const formID = "submit_homepage_info_form";

    useEffect(() => {
        if (!isLoaded) {
            axios.get(API_CONTENT_HOMEPAGE_INFO)
            .then(res => {
                setHomepageInfo(res.data);
                setIsLoaded(true);
            });
        }
    });
    
    function submit(e) {
        preventDefaults(e);
        axios.post(
            API_CONTENT_HOMEPAGE_INFO_UPDATE,
            new FormData(document.getElementById(formID)),
            {
                headers: XSRF_HEADER,
                withCredentials: true,
            }
        )
        .then(console.log)
        .catch(console.log);
    }

    if (!isLoaded) return;

    return (
        <div>
            <form onSubmit={ submit } id={ formID } method="POST" className="grid place-content-center py-16 bg-slate-100">
                <input name="header" 
                className="text-4xl font-medium mb-8 text-center border-black border-b bg-inherit" 
                defaultValue={ homepageInfo ? homepageInfo.header: "Header Here"}/>
                
                <textarea name="lead" rows={ 6 } 
                className="font-light text-xl text-center border-black border-b bg-inherit"
                defaultValue={ homepageInfo ? homepageInfo.lead: "Description text here" }
                />
                
                <Button onClick={ submit } className="bg-green-500 text-white w-fit m-auto mt-8">Submit</Button>
            </form>
        </div>
    );
}