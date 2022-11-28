import Button from "../../components/Button";
import { API_CONTENT_SLIDES_NEW } from "../../apiRoutes";
import { WITH_CREDENTIALS, XSRF_HEADER } from "../../lib/auth";
import { preventDefaults } from "../../lib/utils";
const axios = require("axios").default;

export default function ManageSlides(props) {

    function submit(e) {
        preventDefaults(e);

        const formData = new FormData(document.querySelector("#new_slide_form"));
        const requestOptions = {
            headers: XSRF_HEADER,
            withCredentials: true
        };

        axios.post(
            API_CONTENT_SLIDES_NEW,
            formData,
            requestOptions,    
        )
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }

    return <>
        <h1 className="text-4xl mb-8">Slides</h1>
        <div>
            <form id="new_slide_form" method="POST" action={ API_CONTENT_SLIDES_NEW } className="p-4 border shadow-lg rounded max-w-screen-sm grid gap-8 justify-start" onSubmit={ submit }>
                <h2 className="text-lg font-medium">Add New Slide</h2>

                <div>
                    <label htmlFor="image">Slide Background Image (use wide aspect-ratio images)</label><br/>
                    <input className="mt-2" type="file" name="image" required/>
                </div>
                
                <div >
                    <label htmlFor="header">Slide Header Text:</label><br/>
                    <input className="text-2xl" type="text" name="header" required/>
                </div>

                <div>
                    <label htmlFor="lead">Slide Lead Text:</label><br/>
                    <textarea className="p-2" name="lead" id="lead" cols="30" rows="3"></textarea>
                </div>

                <hr />
                <h3 className="text-lg font-medium">Slide Buttons:</h3>

                <h4>Button 1:</h4>
                <div className="grid gap-4 justify-start pl-6">
                    
                    <div>
                        <label htmlFor="btn_1_text">Text for Button 1</label><br/>
                        <input type="text" name="btn_1_text" id="btn_1_text"/>
                    </div>

                    <div>
                        <label htmlFor="btn_1_link">Link for Button 1</label><br/>
                        <input type="text" name="btn_1_link" id="btn_1_link"/>
                    </div>
                    
                    <div>
                        <label htmlFor="btn_1_bg">Background color for button 1</label><br/>
                        <input type="color" name="btn_1_bg" id="btn_1_bg" defaultValue="#ffffff"/>
                    </div>
                    <div>
                        <label htmlFor="btn_1_color">Text Color color for button 1</label><br/>
                        <input type="color" name="btn_1_color" id="btn_1_color"/>
                    </div>

                </div>

                <hr />

                <h4>Button 2:</h4>
                <div className="grid gap-4 justify-start pl-6 mb-4">
                    
                    <div>
                        <label htmlFor="btn_2_text">Text for Button 2</label><br/>
                        <input type="text" name="btn_2_text" id="btn_2_text"/>
                    </div>

                    <div>
                        <label htmlFor="btn_2_link">Link for Button 2</label><br/>
                        <input type="text" name="btn_2_link" id="btn_2_link"/>
                    </div>
                    
                    <div>
                        <label htmlFor="btn_2_bg">Background color for button 2</label><br/>
                        <input type="color" name="btn_2_bg" id="btn_2_bg" defaultValue="#ffffff"/>
                    </div>
                    <div>
                        <label htmlFor="btn_2_color">Text Color color for button 2</label><br/>
                        <input type="color" name="btn_2_color" id="btn_2_color"/>
                    </div>

                </div>

                <Button className="shadow bg-green-500" onClick={ submit }>Add new slide</Button>
            </form>
            
        </div>
    </>;
}