import Card from "../../components/cards/Card";
import { imageURL } from "../../lib/utils";
import { useNavigate, Link } from "react-router-dom";

export default function AdminProductCard({ product }) {
    const navigate = useNavigate();

    return (
        <Link to={ `/dashboard/products/${product.sku}/update` } className="w-64 rounded overflow-hidden shadow-lg">
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
        </Link>
    );
}