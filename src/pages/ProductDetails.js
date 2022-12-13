import { useParams } from "react-router-dom";
import { Children, useState } from "react";
import GridEvenContainer from '../layouts/GridEvenContainer';
import ShoppingCartManager from "../lib/shoppingCartManager";
import { imageURL } from "../lib/utils";
import { useEffect } from "react";
import { getProductBySKU, getProductsFromCategory } from "../api";
import ProductCard from "../components/cards/ProductCard";
import Button from "../components/Button";

function ImagePreview(props) {
    const children = Children.toArray(props.children);
    const [currentImage, setCurrentImage] = useState(children[0].props.src);
    let thumbnails = [];

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        thumbnails.push(
            <img 
            onClick={() => setCurrentImage(child.props.src) }
            key={ i } 
            className="w-12 aspect-square object-cover object-top transition-all hover:-translate-y-2" 
            src={ child.props.src }/>
        );
    }

    return (
        <div className={`w-[100%] max-w-[30rem] place-self-center ${props.className}`}>
            <div>
                <img src={ currentImage } className="aspect-square object-cover"/>
            </div>

            <div className="flex gap-2 mt-4">
                { thumbnails }
            </div>
        </div>
    );
}

export default function ProductDetails() {
    const params = useParams();
    const sku = params.sku;
    const productType = params.productType;
    const [ableToAddItem, setAbleToAddItem] = useState(false);

    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    function addToCart(e) {
        ShoppingCartManager.addItem(product);
        e.stopPropagation();
        e.preventDefault(); 
    }

    useEffect(() => {
        if (!product)
            getProductBySKU(sku)
            .then(prod => setProduct(prod));

        if (products.length === 0) {
            getProductsFromCategory(productType.toLowerCase())
            .then(category => {
                const productDisplay = [];

                category.products.forEach(product => {
                    if (!product.stock) return;
                    
                    productDisplay.push( 
                        <ProductCard key={ product.id } product={ product } />
                    );
                });
    
                setProducts(productDisplay);
            });
        }

        if (product) {
            ShoppingCartManager.ableToAddToCart(product)
            .then(result => setAbleToAddItem(result));
        }
    });

    if (!product || !product.stock) return "Product does not exist";

    return (
        <div className="mx-auto px-4 py-24">
            <main className="grid place-content-center md:grid-cols-2 max-w-[100rem] flex-grow gap-12">
                <ImagePreview>
                    { product.images.map(img => <img key={ product.img } src={ imageURL(img) } />) }
                </ImagePreview>


                <div className="flex flex-col justify-center gap-5">
                    <h1 className="text-4xl">{ product.name }</h1>
                    <p>
                        { product.name }
                    </p>

                    <div className="flex items-center gap-5 ">
                        { ableToAddItem ? <Button onClick={ addToCart } href="#add-to-cart" className="transition-colors text-lg text-white bg-green-600">Add to Cart</Button>: "" }
                        <h2 className="text-2xl text-green-900 font-bold">${ product.price }</h2>
                    </div>
                    <small>In Stock: { product.stock }</small>
                </div>
            </main>

            <div className="pt-20 mt-20 border-t border-slate-400 w-[100%]">
                <h3 className="text-4xl text-center">More items</h3>
            </div>

            <GridEvenContainer className="py-24 px-2 md:px-10">
                { products }
            </GridEvenContainer>
                
        </div>
    );
}