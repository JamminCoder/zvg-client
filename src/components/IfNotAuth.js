import { isLoggedIn } from "../lib/auth";

export default function IfNotAuth(props) {
    let content;
    !isLoggedIn() ? content = props.children: content = "";

    return content;
}