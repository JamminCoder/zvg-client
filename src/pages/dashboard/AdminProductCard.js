import { useState } from "react";
import UpdateItemModal from "./modals/UpdateItemModal";
import Card from "../../components/cards/Card";
import { imageURL } from "../../lib/utils";

export default function AdminProductCard({ product }) {
    const [modal, setModal] = useState(null);

    const handleModal = () =>
        !modal ? setModal(<UpdateItemModal product={ product }/>) : setModal(null);

    return (
        <Card className="w-64 rounded overflow-hidden" onClick={ handleModal }>
            { modal }
            <div>
                <img className="bg-gray-400 w-[100%] aspect-square object-cover object-top" src={  imageURL(product.images[0]) }/>
            </div>

            <div className="px-2 py-2">
                <div className="mb-4">
                    <small>{ product.category }</small>
                    <h2 className="font-medium text-xl">{ product.name }</h2>
                    <p>Price: ${ product.price }</p>
                    <p>Tax: { product.tax_percent }%</p>
                    <p style={{ color: !product.stock ? "red": "green" }}>Stock: { product.stock }</p>
                </div>
            </div>
        </Card>
    );
}