export default function CatagorySelect({ catagories, name, id }) {
    if (!catagories || !catagories.length) return "No catagories.";

    return (
        <select name={ name } id={ id }>
            { catagories.map(c => <option key={ c.catagory } value={ c.catagory }>{ c.catagory }</option> )}
        </select>
    );
}