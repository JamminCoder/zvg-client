export default function Overlay(props) {
    return (
        <div className="fixed z-50 top-0 left-0" { ...props }>
            <div className="fixed bg-black opacity-25 w-full h-full"></div>
            <div className="fixed grid place-content-center w-full h-full">
                { props.children }
            </div>
        </div>
    );
}