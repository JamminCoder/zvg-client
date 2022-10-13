export default function GridEvenContainer(props) {
    const productsSectionStyle = {
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${ props.itemMin || "18rem" }, 100%), 1fr))`,
        display: "grid"
    }

    return (
        <div className={ `py-24 px-2 md:px-10 gap-5 place-content-center ${props.className}` } style={ productsSectionStyle }>
            { props.children }
        </div>
    );
}