import { preventDefaults } from "../../lib/utils";
import Button from "../../components/Button";

function AboutPageForm() {
    function submit(e) {
        preventDefaults(e);


    }

    return (
        <form action="#" method="POST" onSubmit={ submit }>
            <div>
                <label htmlFor="header">Header</label><br />
                <input className="border-x-0 border-t-0 rounded h-8 w-80 text-2xl" type="text" name="header"/>
            </div>

            <div>
                <label htmlFor="body">Body</label><br />
                <textarea className="border" name="body" cols="50" rows="20"></textarea>
            </div>

            <Button className="bg-green-600 text-white" onClick={ submit }>Save</Button>
        </form>
    );
}

export default function ManageAboutPage() {

    return (
        <div>
            <h1 className="text-4xl font-medium">Manage About Page</h1>

            <AboutPageForm/>
        </div>
    );
}