import Button from "../../components/Button";
import ButtonMap from "../../components/ButtonMap";
import { API_CONTENT_SLIDES_NEW, API_CONTENT_SLIDES_UPDATE, API_CONTENT_SLIDES_DELETE } from "../../apiRoutes";
import { XSRF_HEADER } from "../../lib/auth";
import { preventDefaults, serverURL, setPreviewImage } from "../../lib/utils";
import { useEffect, useState } from "react";
import AddButtonToSlideModal from "./modals/AddButtonToSlideModal";
import { getSlides } from "../../api";
import { Link } from "react-router-dom";
const axios = require("axios").default;

function SlideContentEdit({ slide, formID }) {
    const [btnData, setBtnData] = useState(slide.buttons);
    const [modal, setModal] = useState(null);
    const imageID = `slide_${ slide.id }_image`;

    function handleNewButton(e) {
        preventDefaults(e);
        setModal(<AddButtonToSlideModal btnData={ btnData } close={ () => setModal(null) }/>);
    }

    function DeletableButtons() {
        const buttons = [];
        let i = 0;

        function deleteButton(e, btnText) {
            preventDefaults(e);
            
            const idx = btnData.findIndex(btn => btn.text === btnText);
            btnData.splice(idx, 1);
            console.log(btnData);
            setBtnData([...btnData]);
            console.log(btnData);
        }

        btnData.forEach(btn => {
            buttons.push(
            <div key={ i } >
                <Link 
                    className="btn" 
                    to={ btn.link } 
                    style={{ backgroundColor: btn.bg, color: btn.color }}

                >{ btn.text }</Link>
                <Button 
                onClick={ (e) => deleteButton(e, btn.text) }
                className="bg-red-500 p-2 cursor-pointer">X</Button>
            </div>)

            i++;
        })

        return buttons;
    }

    return (
    <form id={ formID } method="POST" action={ API_CONTENT_SLIDES_UPDATE(slide.id) } className="flex-grow w-[100%] relative grid place-items-center">
        { modal }
        <div className="w-[100%]">
            {/* Image */}
            <img id={ imageID } src={ serverURL(slide.image_path) } alt="description here" className="h-[50vh] lg:h-[65vh] w-[100%] object-cover" />
            
        </div>

        <div className="welcome-header-section w-[100%] h-[100%] absolute grid place-items-center">
            <div className="flex flex-col items-center gap-4 max-w-[80%]">

                {/* Header and lead */}
                <input name="header" className="text-center text-2xl font-bold text-white bg-transparent border-b" style={{fontSize: "clamp(2rem, 4vw, 4.5rem)", color: slide.color }} defaultValue={ slide.header }/>
                <input name="lead" className="text-center text-2xl font-light text-white bg-transparent border-b" defaultValue={ slide.lead }/>
                
                <div className="flex gap-4 mt-2">
                    <DeletableButtons/>
                    <input type="hidden" name="buttons" id="buttons" defaultValue={ JSON.stringify(btnData) } onChange={(e) => {setBtnData(e.target.value)}}/>
                </div>
                <Button className="bg-slate-700 text-white w-fit bg-opacity-75 py-1" onClick={ handleNewButton }>Add Button to Slide</Button>          
                
            </div>
            <input type="file" name="image" id="image" className="bg-white absolute top-1 left-1 z-40" onChange={ (e) => setPreviewImage(e, imageID) }/>
        </div>
    </form>
    );
}

function SlideContentDefault({ slide }) {
    return (
    <section className="flex-grow w-[100%] relative grid place-items-center">
        <div className="w-[100%]">
            {/* Image */}
            <img src={ serverURL(slide.image_path) } alt="description here" className="h-[50vh] lg:h-[65vh] w-[100%] object-cover" />
        </div>

        <div className="welcome-header-section w-[100%] h-[100%] absolute grid place-items-center">
            <div className="flex flex-col items-center gap-4 max-w-[80%]">

                {/* Header and lead */}
                <h1 className="text-2xl font-bold text-white" style={{fontSize: "clamp(2rem, 4vw, 4.5rem)", color: slide.color }}>{ slide.header }</h1>                    
                <p className="text-center text-2xl font-light text-white">{ slide.lead }</p>
                
                <div className="flex gap-4 mt-2">
                    <ButtonMap buttonsArray={ slide.buttons } />
                </div>
            </div>
        </div>
    </section>
    );
}

function RenderSlide({ slide }) {
    const [isEditing, setIsEditing] = useState(false);
    const formID = `edit_slide_${ slide.id }_form`;

    function submitEdit() {
        const formData = new FormData(document.getElementById(formID));

        axios.post(
            API_CONTENT_SLIDES_UPDATE(slide.id),
            formData, 
            {
                headers: XSRF_HEADER,
                withCredentials: true,
            }
        ).then(res => {
            window.location.reload();
            console.log(res);
        })
    }
    
    function handleEditClick() {
        setIsEditing(!isEditing); // Toggle edit status
    }

    function submitDelete() {
        axios.post(
            API_CONTENT_SLIDES_DELETE(slide.id),
            XSRF_HEADER,
            {withCredentials: true}

        ).then(res => {
            window.location.reload();
            console.log(res);
        })
    }

    return (
    <div key={ slide.header } className="mb-8">
        <div className="flex gap-4 mb-4">
            <Button onClick={ handleEditClick } className="bg-slate-700 text-white">{ isEditing ? "Cancel": "Edit" }</Button>
            {
                isEditing ? 
                <>
                    <Button 
                        onClick={ submitEdit }
                        className="bg-green-500 text-white">Save</Button>

                    <Button 
                        onClick={ submitDelete }
                        className="bg-red-500 text-white">Delete</Button>
                </>
                : ""
            }
        </div>

        {
            isEditing
            ? <SlideContentEdit slide={ slide } formID={ formID }/>
            : <SlideContentDefault slide={ slide }/>
        }
    </div>
    );
}

export default function ManageSlides(props) {
    const [modal, setModal] = useState(null);
    const [slides, setSlides] = useState(null);
    const [attempt, setAttempt] = useState(false);
    const [btnData, setBtnData] = useState({buttons: []})

    function handleNewButton(e) {
        preventDefaults(e);
        setModal(<AddButtonToSlideModal btnData={btnData.buttons} close={ () => setModal(null) }/>);
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
    <div>
        { modal }

        <h1 className="text-4xl my-8">Slides</h1>

        <div className="mb-12">
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
                    <ButtonMap buttonsArray={ btnData.buttons }/>
                </div>

                <Button className="bg-slate-700 text-white w-fit" onClick={ handleNewButton }>Add Button</Button>          
                
                <hr />

                <Button className="shadow bg-green-500" onClick={ submit }>Add new slide</Button>
            </form>
            
        </div>

        {/* Render existing slides */}
        
        <div className="mb-8 grid gap-8">
            { slides ? slides.map(slide => <RenderSlide slide={ slide }/>): "" }
        </div>
    </div>
    );
}