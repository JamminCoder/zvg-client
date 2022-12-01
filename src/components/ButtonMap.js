import { Link } from "react-router-dom"

export default function ButtonMap({ buttonsData }) {
    return buttonsData.buttons.map(
        btn => <Link key={ Math.random() } className="btn" to={ btn.link } style={{ backgroundColor: btn.bg, color: btn.color }}>{ btn.text }</Link>
    )
}
