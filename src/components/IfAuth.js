import { isLoggedIn } from "../lib/auth";

export default function IfAuth(props) {
    let content;
    isLoggedIn() ? content = props.children: content = "";

    return content;
}