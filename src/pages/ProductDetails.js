import { useParams } from "react-router-dom";
import { Children, useState } from "react";
import GridEvenContainer from '../layouts/GridEvenContainer';
import ShoppingCartManager from "../lib/shoppingCartManager";
import { imageURL } from "../lib/utils";
import { useEffect } from "react";
import * as productEndpoints from "../endpoints/products";
import * as categoryEndpoints from "../endpoints/categories";
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
    const [isItemInCart, setIsItemInCart] = useState(false);
    const [qtyInCart, setQtyInCart] = useState(0);
    
    const [product, setProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const [selectorValue, setSelectorValue] = useState(null);

    function addToCart(e) {
        const qty = document.querySelector("#qty").value;

        ShoppingCartManager.addItem(product, qty)
        .then(success => setIsItemInCart(success));


        e.stopPropagation();
        e.preventDefault(); 
    }

    function updateItemQty(e) {
        const qty = e.target.value;
        ShoppingCartManager.updateItemQty(product.sku, qty);
        document.querySelector("#qty").value = qty;
    }

    function removeItemFromCart() {
        ShoppingCartManager.deleteItem(product.sku);
        setIsItemInCart(false);
    }

    useEffect(() => {
        if (!product)
            productEndpoints.getProductBySKU(sku)
            .then(prod => setProduct(prod));

        if (product) {
            ShoppingCartManager.isItemInCart(product.sku)
            .then(isInCart => setIsItemInCart(isInCart));

            ShoppingCartManager.ableToAddToCart(product)
            .then(result => setAbleToAddItem(result));
            setSelectorValue(product.count);
        }

        if (products.length === 0) {
            categoryEndpoints.getCategoryByName(productType.toLowerCase())
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

        if (isItemInCart) {
            ShoppingCartManager.getBySku(product.sku)
            .then(item => setQtyInCart(item.count));

            document.querySelector("#qty").value = qtyInCart;
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
                    <p>{ product.name }</p>
                    <h2 className="text-2xl text-green-900 font-bold">${ product.price }</h2>

                    <div className="flex items-center gap-5 ">
                        { 
                            ableToAddItem && !isItemInCart
                            ? <Button onClick={ addToCart } href="#add-to-cart" className="transition-colors text-lg text-white bg-green-600">Add to Cart</Button>
                            : <Button onClick={ removeItemFromCart }  className="bg-slate-700 text-white" >Remove Item</Button>
                        }

                        <div>
                            <label htmlFor="qty">Select quantity { isItemInCart ? "in cart": "" }: </label>
                            <select id="qty"  onChange={ updateItemQty }>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                                <option value="4">4</option>
                                <option value="5">5</option>
                            </select>
                        </div>
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