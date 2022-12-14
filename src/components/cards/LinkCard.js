import { Link } from "react-router-dom";

export default function LinkCard(props) {
    return (
        <Link onClick={ props.onClick } to={ props.to } className={ `w-[100%] max-w-[20rem] border shadow-lg ${ props.className }` }>
             { props.children }
        </Link>
    );
}