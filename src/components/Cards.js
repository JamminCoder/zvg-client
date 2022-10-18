import { Link, useParams } from 'react-router-dom';
import ShoppingCartManager from "../lib/shoppingCartManager";
import { deleteProductBySKU } from "../api";
import { imageURL } from "../lib/utils";


export function LinkCard(props) {
    return (
        <Link to={ props.to } className={ `w-[100%] max-w-[20rem] border shadow-lg ${ props.className }` }>
             { props.children }
        </Link>
    );
}

export function Card(props) {
    return (
        <div to={ props.to } className={ `w-[100%] max-w-[20rem] border shadow-lg ${ props.className }` }>
             { props.children }
        </div>
    );
}


export function ProductCard({ name, description, price }) {
    const type = useParams().productType;
    const productUrl = `/shop/${type}/${name}`;
    function handleClick(e) {
        ShoppingCartManager.addItem(name, price, 1);
        e.stopPropagation();
        e.preventDefault(); 
    }

    return (
        <LinkCard 
        to={ productUrl }
        className="hover:-translate-y-[2px] transition-all hover:shadow-xl cursor-pointer">
            <div>
                <img className="bg-gray-400 w-[100%] aspect-video"/>
            </div>

            <div className="px-2 py-2">
                <h2 className="font-medium text-xl">{ name }</h2>
                <h3 className="mb-2">${ price }</h3>

                { description ? <p className="text-xs mb-4">{ description }</p>: "" }

                <button  
                    onClick={ handleClick }
                    className="py-1 px-2 w-[100%] bg-green-600 text-white rounded hover:shadow-lg hover:bg-green-500 transition-all"
                >Add to Cart</button>
                
            </div>
        </LinkCard>
    );
}

export function CatagoryListingCard({ name, description }) {
    const catagoryUrl = `/shop/${ name }`
    return (
        <LinkCard 
        to={ catagoryUrl }
        className="hover:-translate-y-[3px] transition-all hover:shadow-xl cursor-pointer">
            <div>
                <img className="bg-gray-400 w-[100%] aspect-video"/>
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
        <Card className="w-64 rounded overflow-hidden">
            <div>
                <img className="bg-gray-400 w-[100%] aspect-square object-cover object-top" src={  imageURL(product.images[0]) }/>
            </div>

            <div className="px-2 py-2">
                <div className="mb-4">
                    <small>Catagory: { product.catagory }</small>
                    <h2 className="font-medium text-xl">{ product.name }</h2>
                    <p>${ product.price }</p>
                </div>
                
                <div className="grid gap-4">
                    <button className="bg-gray-800 p-1 rounded text-white text-xs w-fit">Modify Product Info</button>
                    <button onClick={ () => deleteProduct() } className="bg-red-500 p-1 rounded text-white text-xs w-fit">DELETE</button>
                </div>
            </div>
        </Card>
    );
}
