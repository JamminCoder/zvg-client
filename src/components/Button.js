export default function Button(props) {
    return (
    <button 
        className={`btn ${ props.className }`}
        style={ props.style } 
        onClick={ props.onClick }>

        { props.children }
    </button>
    );
}