import { hasJwt } from "../auth";

export default function IfNotAuth(props) {
    let content;
    !hasJwt() ? content = props.children: content = "";

    return content;
}