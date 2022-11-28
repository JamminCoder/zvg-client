import Button from "../../components/Button";
import { API_CONTENT_SLIDES_NEW } from "../../apiRoutes";
import { WITH_CREDENTIALS, XSRF_HEADER } from "../../lib/auth";
import { preventDefaults, serverURL } from "../../lib/utils";
import { useEffect, useState } from "react";
import ModalHandler from "./modals/handleModal";
import AddButtonToSlideModal from "./modals/AddButtonToSlideModal";
import { Link } from "react-router-dom";
import { getSlides } from "../../api";
const axios = require("axios").default;


function ButtonMap({ buttonsData }) {
    return buttonsData.buttons.map(
        btn => <Link key={ Math.random() } className="btn" to={ btn.link } style={{ backgroundColor: btn.bg, color: btn.color }}>{ btn.text }</Link>
    )
}

export default function ManageSlides(props) {
    const [modal, setModal] = useState(null);
    const [slides, setSlides] = useState(null);
    const [attempt, setAttempt] = useState(false);
    const [btnData, setBtnData] = useState({buttons: []})

    const modalHandler = new ModalHandler(modal, setModal);

    function handleNewButton(e) {
        preventDefaults(e);
        modalHandler.new(AddButtonToSlideModal, { btnData: btnData, setBtnData: setBtnData });
    }

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

    useEffect(() => {
        if (!attempt && !slides) {
            getSlides().then(slides => {
                setSlides(slides);
            });

            setAttempt(true);
        }
    });

    return (
    <div onClick={ () => modalHandler.closeIfExists(modal) }>
        { modal }
        
        <h1 className="text-4xl mb-8">Slides</h1>

        {/* Render existing slides */}
        
        <div className="mb-8 grid gap-8">
            { slides ? slides.map(
                slide => <div key={ slide.header }>
                    <h1 className="text-2xl font-bold">{ slide.header }</h1>
                    <p>{ slide.lead }</p>

                    <div className="flex gap-4 mb-2">
                        <ButtonMap buttonsData={ JSON.parse(slide.buttons) } />
                    </div>

                    <img src={ serverURL(slide.image_path) } alt="" />
                </div>
                ): "" 
            }
        </div>
        


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

                <input type="hidden" name="buttons" id="buttons" defaultValue={ JSON.stringify(btnData) } onChange={(e) => {setBtnData(e.target.value)}}/>
                

                <div className="flex gap-4">
                    <ButtonMap buttonsData={ btnData }/>
                </div>

                <Button className="bg-slate-700 text-white w-fit" onClick={ handleNewButton }>Add Button</Button>          
                
                <hr />

                <Button className="shadow bg-green-500" onClick={ submit }>Add new slide</Button>
            </form>
            
        </div>
    </div>
    );
}