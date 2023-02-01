import Button from "../../components/Button";
import { preventDefaults, serverURL, setPreviewImage } from "../../lib/utils";
import { useState, useEffect } from "react";
import * as contentEndpoints from "../../endpoints/content";


export default function ManageShopHeader(props) {
    const [shopHeader, setShopHeader] = useState(null);
    const [attempt, setAttempt] = useState(false);

    useEffect(() => {
        if (shopHeader || attempt) return;

        contentEndpoints.getShopHeader().then(setShopHeader);

        setAttempt(true);
    });

    function save(e) {
        preventDefaults(e);

        contentEndpoints.updateShopHeader(document.querySelector("#header_form"))
        .then(res => {
            console.log(res);
        })
        .catch(err => {
            console.log(err);
        })
    }

    if (!attempt) return;
    return (
    <>
        <h1 className="text-4xl mb-4">Manage Shop Header</h1>
        <div className="relative grid place-items-center max-h-[65vh] w-[100%] aspect-video">
            <img className="absolute w-[100%] h-[100%] bg-slate-100 object-cover brightness-[70%]" id="bg_image" src={shopHeader ? serverURL(shopHeader.image_path): "" } alt="No image uploaded" />
            
            <form 
                action={ contentEndpoints.SHOP_HEADER_UPDATE }
                method="POST"
                onSubmit={ save }
                id="header_form"
                className="absolute text-center grid place-items-center bg-white bg-opacity-30 p-8 rounded">
                <input name="header_text" className="text-4xl sm:text-6xl mb-4 clean-input font-medium" defaultValue={ shopHeader ? shopHeader.header: "" }/>
                <textarea name="lead_text" className="max-w-[80%] w-[100%] mb-4 clean-input h-24" defaultValue={ shopHeader ? shopHeader.lead: "" }></textarea>
                <input className="bg-white mb-8" type="file" name="image" onChange={ (e) => setPreviewImage(e, "bg_image") }/>
                <Button className="bg-green-600 text-white">Save</Button>
            </form>
        </div>
    </>
    );
}