export default function Button(props) {
    return (
    <button 
        className={`p-2 rounded hover:brightness-105 active:brightness-90 ${ props.className }`} 
        onClick={ props.onClick }>

        { props.children }
    </button>
    );
}