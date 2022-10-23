import { useParams } from "react-router-dom";
import { capatalizeFirstLetter } from "../lib/utils";
import HeroSection  from "../components/layouts/HeroSection";
import { ProductCard } from '../components/Cards';
import GridEvenContainer from '../components/layouts/GridEvenContainer';
import "../css/shop.css";
import "../css/app.css"
import { useEffect, useState } from "react";
import { getAllProducts, getProductsFromCatagory } from "../api";


export default function ProductsPage(props) {
    const productType = useParams().productType;
    const properType = capatalizeFirstLetter(productType);
    const [products, setProducts] = useState([]);

    useEffect(() => {
        if (products.length === 0) {
            getProductsFromCatagory(productType).then(productsArray => {
                const productDisplay = [];
                productsArray.forEach(product => {
                    productDisplay.push( <ProductCard product={ product } /> );
                });
    
                setProducts(productDisplay);
            });
        }
    })

    return (
        <div>
            <HeroSection  
                bgSrc=""
                className="grid place-items-center max-h-[65vh] w-[100%] aspect-video"
            >
                <div className="text-center">
                    <h1 className="text-5xl mb-5">{ properType }</h1>
                    <p>
                        Ea, aut. Dolor nisi cum ut dolorem vel sapiente totam pariatur, neque, at suscipit consequatur quis iure explicabo ratione. Eligendi, accusantium. Voluptas.
                    </p>
                </div>
                
            </HeroSection>


            <main className="py-24 px-2 md:px-10 flex flex-wrap gap-5">
                { products.length ? products: "No products" }
            </main>
                

        </div>
    );
}