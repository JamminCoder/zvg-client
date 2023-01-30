import { preventDefaults } from "../../lib/utils";
import Button from "../../components/Button";
import { getAboutPage, updateAboutPage } from "../../endpoints/content";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/Loading";

function AboutPageForm() {
    const formID = "about_page_form";
    const [aboutPageData, setAboutPageData] = useState();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        if (isLoaded) return;
        
        getAboutPage()
        .then(data => setAboutPageData(data))
        .catch(console.error)
        .finally(() => {
            setIsLoaded(true)
            console.log(aboutPageData);
        });
    });

    function submit(e) {
        preventDefaults(e);
        updateAboutPage(document.getElementById(formID)).then(res => {
            console.log(res);
        }).catch(err => console.error(err));
    }

    if (!isLoaded) return <LoadingPage />;

    return (
        <form id={ formID } action="#" method="POST" onSubmit={ submit }>
            <div className="mb-8">
                <label htmlFor="header">Header</label><br />
                <input className="border-x-0 border-t-0 rounded h-8 w-80 text-2xl" type="text" name="header"
                defaultValue={ aboutPageData.header }/>
            </div>

            <div>
                <label htmlFor="body">Body</label><br />
                <textarea className="border" name="body" cols="50" rows="20"
                defaultValue={ aboutPageData.body } placeholder="Enter site description"></textarea>
            </div>

            <Button className="bg-green-600 text-white" onClick={ submit }>Save</Button>
        </form>
    );
}

export default function ManageAboutPage() {

    return (
        <div>
            <h1 className="text-4xl font-medium mb-8">Manage About Page</h1>

            <AboutPageForm/>
        </div>
    );
}