export default function CatagorySelect(props) {
    if (!props.catagories || !props.catagories.length) return "No catagories.";

    return (
        <select name={ props.name } id={ props.id } defaultValue={ props.defaultValue }>
            { props.catagories.map(c => <option key={ c.catagory } value={ c.catagory }>{ c.catagory }</option> )}
        </select>
    );
}