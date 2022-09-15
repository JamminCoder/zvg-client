export default function Card(props) {
    
    return (
        <div className="w-[100%] max-w-[20rem] border shadow-lg">
             { props.children }
        </div>
    );
}