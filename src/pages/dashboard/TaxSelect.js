export default function TaxSelect(props) {
    return (
        <select { ...props }>
            <option value="4">Clothing and Accessories (4%)</option>
            <option value="8.75">Jewelry and Gifts (8.75%)</option>
        </select>
    )
}