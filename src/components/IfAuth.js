import { hasJwt} from "../auth";

export default function IfAuth(props) {
    let content;
    hasJwt() ? content = props.children: content = "";

    return content;
}