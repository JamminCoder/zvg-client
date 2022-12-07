import { useState } from "react";
import { stopPropagation } from "../lib/utils";
import Overlay from "../layouts/Overlay";
import ModalHandler from "../pages/dashboard/modals/handleModal";

export default function Modal(props) {
    const [display, setDisplay] = useState(true);

    if (!display) return;

    return (
    <Overlay onClick={ ModalHandler.close }>
        <div className="bg-white p-5 grid gap-5" onClick={ stopPropagation }>
            { props.children }
        </div>
    </Overlay>
    );
}