import { updateCabinSection } from "../../endpoints/content";
import { preventDefaults, setPreviewImage } from "../../lib/utils";
import Button from "../../components/Button";

export default function ManageCabinSection() {
    const formID = "update_cabin_form";

    function submit(e) {
        preventDefaults(e);
        updateCabinSection(document.getElementById(formID))
        .then(console.log).catch(console.error);
    }

    return(
    <form id={ formID } className="py-24 bg-gray-900 text-white px-10 gap-10 flex flex-col-reverse md:grid place-items-center grid-cols-2" onSubmit={ submit }>
        <div>
            <img id="image_preview" src={`${process.env.PUBLIC_URL}/img/cabin.png`} alt="cabin" />
            <input type="file" name="image" id="image" onChange={ (e) => setPreviewImage(e, "image_preview") }/>
        </div>

        <div>
            <input 
            name="header"
            className="clean-input border-b-white text-3xl sm:text-5xl mb-5" 
            defaultValue="Lorum ipsum dolar sit amit"/>

            <textarea
            name="lead"
            className="mb-5 clean-input w-[100%] h-32 text-left"
            defaultValue="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit."/>

            <input className="text-center w-fit mb-8 px-7 py-3 rounded bg-blue-700 text-xl sm:text-2xl" defaultValue="Create a Reservation"/>
            
            <div className="flex gap-4 text-xl mb-8">
                <label htmlFor="link">Link:</label>
                <input className="text-sm clean-input text-left w-[100%]" type="text" name="link" defaultValue="https://www.hipcamp.com/en-US/land/new-york-zoar-valley-ridge-j29h5pnj"/>    
            </div>

            <Button className="bg-green-600 w-32" onClick={ submit } >Save</Button>
        </div>
    </form>
    );
}