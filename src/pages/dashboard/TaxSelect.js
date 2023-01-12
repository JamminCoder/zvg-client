import { useEffect, useState } from "react";

export default function TaxSelect({ name }) {
    const [taxInputUpdated, setTaxInputUpdated] = useState(false);
    
    useEffect(() => {
        if (!taxInputUpdated) {
            try {
                updateTaxInput();
                setTaxInputUpdated(true);
            } catch(err) {}
        }
    });

    function updateTaxInput() {
        const taxInput = document.getElementById("tax_percent");
        const taxPercent = document.getElementById("tax_select_component").value;
        taxInput.value = taxPercent;
    }

    return (
        <div>
            <select id="tax_select_component" onChange={ updateTaxInput }>
                <option value="4">Clothing and Accessories (4%)</option>
                <option value="8.75">Jewelry and Gifts (8.75%)</option>
            </select><br />
            
            or custom value: 
            <input type="text" id="tax_percent" name={ name || "tax_percent" } className="w-16 max-w-fit border" required/>%
        </div>
        
    )
}