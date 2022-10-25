import LinkCard from "./LinkCard";
import { useParams } from "react-router-dom";
import ShoppingCartManager from "../../lib/shoppingCartManager";
import { imageURL } from "../../lib/utils";

export default function ProductCard({ product }) {
    const type = useParams().productType;
    const productUrl = `/shop/${type}/${product.sku}`;
    function handleClick(e) {
        ShoppingCartManager.addItem(product.name, product.price, 1);
        e.stopPropagation();
        e.preventDefault(); 
    }

    return (
        <LinkCard 
        to={ productUrl }
        className="hover:-translate-y-[2px] transition-all hover:shadow-xl cursor-pointer">
            <div>
                <img className="bg-gray-400 w-[100%] aspect-video object-cover object-top" src={  imageURL(product.images[0]) }/>
            </div>

            <div className="px-2 py-2">
                <h2 className="font-medium text-xl">{ product.name }</h2>
                <h3 className="mb-2">${ product.price }</h3>

                { product.description ? <p className="text-xs mb-4">{ product.description }</p>: "" }

                <button  
                    onClick={ handleClick }
                    className="py-1 px-2 w-[100%] bg-green-600 text-white rounded hover:shadow-lg hover:bg-green-500 transition-all"
                >Add to Cart</button>
                
            </div>
        </LinkCard>
    );
}