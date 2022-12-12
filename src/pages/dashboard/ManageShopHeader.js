import axios from "axios";
import { API_CONTENT_SHOP_HEADER, API_CONTENT_SHOP_HEADER_UPDATE } from "../../apiRoutes";
import Button from "../../components/Button";
import { XSRF_HEADER } from "../../lib/auth";
import { preventDefaults, serverURL, setPreviewImage } from "../../lib/utils";
import { useState, useEffect } from "react";
import { getShopHeader } from "../../api";

export default function ManageShopHeader(props) {
    const [shopHeader, setShopHeader] = useState(null);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (shopHeader || attempt) return;

        getShopHeader().then(setShopHeader);

        setAttempt(true);
    });

    function save(e) {
        preventDefaults(e);

        axios.post(
            API_CONTENT_SHOP_HEADER_UPDATE,
            new FormData(document.querySelector("#header_form")),
            {
                headers: XSRF_HEADER,
                withCredentials: true,
            }
        )
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (!shopHeader) return;
    return (
    <>
        <h1 className="text-4xl mb-4">Manage Shop Header</h1>
        <div className="relative grid place-items-center max-h-[65vh] w-[100%] aspect-video">
            <img className="absolute w-[100%] h-[100%] bg-slate-100 object-cover brightness-[70%]" id="bg_image" src={serverURL(shopHeader.image_path) } alt="No image uploaded" />
            
            <form 
                action={ API_CONTENT_SHOP_HEADER_UPDATE }
                method="POST"
                onSubmit={ save }
                id="header_form"
                className="absolute text-center grid place-items-center bg-white bg-opacity-30 p-8 rounded">
                <input name="header_text" className="text-4xl sm:text-6xl mb-4 clean-input font-medium" defaultValue={ shopHeader.header }/>
                <textarea name="lead_text" className="max-w-[80%] w-[100%] mb-4 clean-input h-24" defaultValue={ shopHeader.lead }></textarea>
                <input className="bg-white mb-8" type="file" name="image" onChange={ (e) => setPreviewImage(e, "bg_image") }/>
                <Button className="bg-green-600 text-white">Save</Button>
            </form>
        </div>
    </>
    );
}