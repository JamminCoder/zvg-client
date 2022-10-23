import { Link, useParams } from 'react-router-dom';
import ShoppingCartManager from "../lib/shoppingCartManager";
import { deleteProductBySKU } from "../api";
import { imageURL, serverURL } from "../lib/utils";
import { useState } from "react";
import Overlay from "./modals/Overlay";
import { preventDefaults } from "../lib/utils";
import UpdateItemModal from "./modals/UpdateItemModal";


export function LinkCard(props) {
    return (
        <Link to={ props.to } className={ `w-[100%] max-w-[20rem] border shadow-lg ${ props.className }` }>
             { props.children }
        </Link>
    );
}

export function Card(props) {
    return (
        <div onClick={ props.onClick } className={ `w-[100%] max-w-[20rem] border shadow-lg ${ props.className }` }>
             { props.children }
        </div>
    );
}


export function ProductCard({ product }) {
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

export function CatagoryListingCard({ name, imageSrc, description }) {
    const catagoryUrl = `/shop/${ name }`
    return (
        <LinkCard 
        to={ catagoryUrl }
        className="hover:-translate-y-[3px] transition-all hover:shadow-xl cursor-pointer">
            <div>
                <img className="bg-gray-400 w-[100%] aspect-video object-cover object-top" src={ serverURL(imageSrc) }/>
            </div>

            <div className="px-2 py-2">
                <h2 className="font-medium text-xl">{ name }</h2>
                <p className="mb-2">
                    { description }
                </p>

                <Link className="py-1 px-2 bg-green-600 text-white rounded" to={ `${ name }` }>Explore</Link>
            </div>
        </LinkCard>
    );
}

export function AdminProductCard({ product }) {
    const [modal, setModal] = useState(null);

    function handleModal() {
        if (!modal) {
            setModal(<UpdateItemModal product={ product }/>);
        } else {
            setModal(null);
        }
    }

    return (
        <Card className="w-64 rounded overflow-hidden" onClick={ handleModal }>
            { modal }
            <div>
                <img className="bg-gray-400 w-[100%] aspect-square object-cover object-top" src={  imageURL(product.images[0]) }/>
            </div>

            <div className="px-2 py-2">
                <div className="mb-4">
                    <small>{ product.catagory }</small>
                    <h2 className="font-medium text-xl">{ product.name }</h2>
                    <p>${ product.price }</p>
                </div>
            </div>
        </Card>
    );
}
