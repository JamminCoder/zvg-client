import { Link, useParams } from 'react-router-dom';
import ShoppingCartManager from "../lib/shoppingCartManager";


export function Card(props) {
    return (
        <Link to={ props.to } className={ `w-[100%] max-w-[20rem] border shadow-lg ${ props.className }` }>
             { props.children }
        </Link>
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
        <Card 
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
        </Card>
    );
}

export function CatagoryListingCard({ name, description }) {
    const catagoryUrl = `/shop/${ name }`
    return (
        <Card 
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
        </Card>
    );
}