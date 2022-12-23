export default function CenterPage(props) {
    return (
        <div className={`grid place-content-center h-[90vh] px-2 ${ props.className }`}>
            { props.children }
        </div>
    );
}