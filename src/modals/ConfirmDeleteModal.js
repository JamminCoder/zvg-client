import { stopPropagation } from "../lib/utils";
import Overlay from "./Overlay";
import Button from "../components/Button";

export default function ConfirmDeleteModal(props) {
    return (
    <Overlay onClick={(e) => props.onClick(e)}>
        <div className="bg-white p-5 grid gap-5" onClick={ stopPropagation }>
            <h1 className="text-3xl font-bold max-w-[30ch]">Are you sure you want to delete this catagory and ALL of its products?</h1>
            <h2 className="text-2xl">Catagory: <span className="text-red-500 font-bold">{ props.catagory.name }</span></h2>
            
            <Button
                className="text-white bg-green-500 font-bold" 
                onClick={ props.cancel }>                            
                Cancel
            </Button>

            <Button
                className="text-white bg-red-500 w-fit text-xs" 
                onClick={ props.delete }>
                
                Delete { props.catagory.name } Catagory
            </Button>
        </div>
    </Overlay>
    );
}