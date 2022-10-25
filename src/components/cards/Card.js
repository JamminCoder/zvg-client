export default function Card(props) {
    return (
        <div onClick={ props.onClick } className={ `w-[100%] max-w-[20rem] border shadow-lg ${ props.className }` }>
             { props.children }
        </div>
    );
}
