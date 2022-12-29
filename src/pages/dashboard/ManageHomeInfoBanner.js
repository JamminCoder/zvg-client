import axios from "axios";
import Button from "../../components/Button";
import { XSRF_HEADER } from "../../lib/auth";
import { preventDefaults } from "../../lib/utils";

export default function ManageHomeInfoBanner() {
    const formID = "submit_homepage_info_form";
    
    function submit(e) {
        preventDefaults(e);
        axios.post(
            "#",
            new FormData(document.getElementById(formID)),

            {
                ...XSRF_HEADER,
                withCredentials: true,
            }
        )
        .then(console.log)
        .catch(console.log);
    }

    return (
        <div>
            <form onSubmit={ submit } id={ formID } method="POST" className="grid place-content-center py-16 bg-slate-100">
                <input className="text-4xl font-medium mb-8 text-center border-black border-b bg-inherit" defaultValue="Shop Awesomeness"/>
                <textarea rows={ 6 } 
                className="font-light text-xl text-center border-black border-b bg-inherit"
                defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis amet aperiam nesciunt mollitia totam quisquam molestias. Impedit pariatur tempore sit veritatis, similique, sunt reiciendis illum, unde non maiores voluptatum magnam?"
                />
                
                <Button onClick={ submit } className="bg-green-500 text-white w-fit m-auto mt-8">Submit</Button>
            </form>
        </div>
    );
}