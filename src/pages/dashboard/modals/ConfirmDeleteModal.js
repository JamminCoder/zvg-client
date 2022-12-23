import Button from "../../../components/Button";
import Modal from "../../../components/Modal";

export default function ConfirmDeleteModal(props) {
    return (
    <Modal close={ props.close }>
        <h1 className="text-3xl font-bold max-w-[30ch]">Are you sure you want to delete this category and ALL of its products?</h1>
        <h2 className="text-2xl">Category: <span className="text-red-500 font-bold">{ props.category.name }</span></h2>
        
        <Button
            className="text-white bg-green-500 font-bold" 
            onClick={ props.close }>                            
            Cancel
        </Button>

        <Button
            className="text-white bg-red-500 w-fit text-xs" 
            onClick={ props.delete }>
            
            Delete { props.category.name } Category
        </Button>
    </Modal>
    );
}