import { useParams } from "react-router-dom";
import { capatalizeFirstLetter, serverURL } from "../lib/utils";
import HeroSection  from "../components/layouts/HeroSection";
import { ProductCard } from '../components/Cards';
import "../css/shop.css";
import "../css/app.css"
import { useEffect, useState } from "react";
import { getCatagoryByName, getProductsFromCatagory } from "../api";


export default function ProductsPage(props) {
    const catagoryName = useParams().productType;
    const properCatagoryName = capatalizeFirstLetter(catagoryName);
    const [products, setProducts] = useState({ data: null, error: null });
    const [catagory, setCatagory] = useState(null);

    useEffect(() => {
        if (!catagory) {
            getCatagoryByName(catagoryName).then(cat => {
                setCatagory(cat);
            }).catch(err => {
                console.log(err);
            });
        }

        if (catagory && !products.data && !products.error) {
            const productDisplay = [];
            catagory.products.forEach(
                product => productDisplay.push( <ProductCard key={ product.name } product={ product } /> )
            );
            
            if (!productDisplay.length) 
                setProducts({ data: null, error: "No products" });
            else 
                setProducts({ data: productDisplay, error: null });
        }
    })

    if (!catagory || !products.data) return;

    return (
        <div>
            <HeroSection  
                bgSrc={ `${ catagory ? serverURL( `catagory_images/${ catagory.image }` ): "" }` }
                className="grid place-items-center max-h-[65vh] w-[100%] aspect-video"
            >
                <div className="text-center">
                    <h1 className="text-5xl mb-5">{ properCatagoryName }</h1>
                    <p>
                        Ea, aut. Dolor nisi cum ut dolorem vel sapiente totam pariatur, neque, at suscipit consequatur quis iure explicabo ratione. Eligendi, accusantium. Voluptas.
                    </p>
                </div>
                
            </HeroSection>


            <main className="py-24 px-2 md:px-10 flex flex-wrap gap-5">
                { products.data ? products.data: "No products" }
            </main>
                

        </div>
    );
}