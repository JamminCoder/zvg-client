import Overlay from "./Overlay";
import { Card } from "../Cards";
import { preventDefaults } from "../../lib/utils";
import { imageURL } from "../../lib/utils";
import { deleteProductBySKU } from "../../api";

export default function UpdateItemModal({ product }) {
    async function deleteProduct() {
        try {   
            const res = await deleteProductBySKU(product.sku);
            console.log(res);
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }

    return (
    <Overlay>
        <Card className="rounded overflow-hidden bg-white p-1" onClick={ preventDefaults }>
            <div>
                <img className="bg-gray-400 w-[100%] aspect-square object-cover object-top" src={  imageURL(product.images[0]) }/>
            </div>

            <div className="py-2">
                <div className="flex flex-col gap-2 mb-4">
                    <div className="flex gap-2">
                        <label htmlFor="catagory">Catagory: </label>
                        <input type="text" name="catagory" className="w-[80%] border" defaultValue={ product.catagory }/>
                    </div> 

                    <div className="flex gap-2">
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" className="w-[80%] border" defaultValue={ product.name }/>
                    </div>

                    <div className="flex gap-2">
                        <label htmlFor="price">Price $</label>
                        <input type="text" name="price" className="w-[80%] border" defaultValue={ product.price }/>
                    </div>

                    <div>
                        <label htmlFor="description">Description: </label><br/>
                        <textarea className="w-[100%] h-32 border" name="description" id="description" defaultValue={ product.description }></textarea>
                    </div>
                </div>
                
                <div className="grid gap-4 mx-2">
                    <button className="bg-gray-800 px-2 py-1 rounded text-white w-fit">Save</button>
                    <button onClick={ () => deleteProduct() } className="bg-red-500 p-1 rounded text-white text-xs w-fit">DELETE</button>
                </div>
            </div>
        </Card>
    </Overlay>
    );
}