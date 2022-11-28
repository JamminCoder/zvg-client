import { preventDefaults, stopPropagation } from "../../../lib/utils";
import Overlay from "../../../layouts/Overlay";
import Button from "../../../components/Button";


export default function AddButtonToSlideModal(props) {

    function save(e) {
        preventDefaults(e);

        const btnText = document.querySelector("#btn_text").value;
        const btnLink = document.querySelector("#btn_link").value;
        const btnBg = document.querySelector("#btn_bg").value;
        const btnColor = document.querySelector("#btn_color").value;


        props.btnData.buttons.push({
            "text": btnText,
            "link": btnLink,
            "bg": btnBg,
            "color": btnColor
        });

        props.close();
    }


    return (
    <Overlay>
        <div className="bg-white p-5 grid gap-5" onClick={ stopPropagation }>
            <h4>Button 1:</h4>
            <div className="grid gap-4 justify-start">
                
                <div>
                    <label htmlFor="btn_text">Text</label><br/>
                    <input className="border" type="text" name="btn_text" id="btn_text"/>
                </div>

                <div>
                    <label htmlFor="btn_1_link">Link</label><br/>
                    <input className="border" type="text" name="btn_link" id="btn_link"/>
                </div>
                
                <div>
                    <label htmlFor="btn_bg">Background color</label><br/>
                    <input type="color" name="btn_bg" id="btn_bg" defaultValue="#ffffff"/>
                </div>
                <div>
                    <label htmlFor="btn_color">Text Color</label><br/>
                    <input type="color" name="btn_color" id="btn_color"/>
                </div>

            </div>

            <Button className="text-white bg-green-500 font-bold"  onClick={ save } >Save</Button>
            <Button
                className="bg-slate-700 text-white"
                onClick={ props.close }>                            
                Cancel
            </Button>
        </div>
    </Overlay>
    );
}