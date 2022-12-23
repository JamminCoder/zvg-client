import { stopPropagation } from "../lib/utils";
import Overlay from "../layouts/Overlay";

export default function Modal(props) {
    return (
    <Overlay onClick={ props.close }>
        <div className={`bg-white p-5 grid gap-5 relative ${ props.className }`} style={ props.style } onClick={ stopPropagation }>
            { props.children }
        </div>
    </Overlay>
    );
}