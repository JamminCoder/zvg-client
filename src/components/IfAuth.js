import { isLoggedIn } from "../auth";

export default function IfAuth(props) {
    let content;
    isLoggedIn() ? content = props.children: content = "";

    return content;
}