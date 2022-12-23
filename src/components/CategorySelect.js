export default function CategorySelect(props) {
    if (!props.categories || !props.categories.length) return "No categories.";

    return (
        <select name={ props.name } id={ props.id } defaultValue={ props.defaultValue }>
            { props.categories.map(c => <option key={ c.category } value={ c.category }>{ c.category }</option> )}
        </select>
    );
}