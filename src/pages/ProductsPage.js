import { useParams } from "react-router-dom";
import { capatalizeFirstLetter, serverURL } from "../lib/utils";
import HeroSection  from "../layouts/HeroSection";
import ProductCard from '../components/cards/ProductCard';
import "../css/shop.css";
import "../css/app.css"
import { useEffect, useState } from "react";
import { getCategoryByName, getProductsFromCategory } from "../api";


export default function ProductsPage(props) {
    const categoryName = useParams().productType;
    const properCategoryName = capatalizeFirstLetter(categoryName);
    const [products, setProducts] = useState({ data: null, error: null });
    const [category, setCategory] = useState(null);

    useEffect(() => {
        if (!category) {
            getCategoryByName(categoryName).then(cat => {
                setCategory(cat);
            }).catch(err => {
                console.log(err);
            });
        }

        if (category && !products.data && !products.error) {
            const productDisplay = [];
            category.products.forEach(
                product => {
                    console.log(product)
                    if (!product.stock >= 1) return;

                    productDisplay.push( <ProductCard key={ product.name } product={ product } /> )
                }
            );
            
            if (!productDisplay.length) 
                setProducts({ data: null, error: "No products" });
            else 
                setProducts({ data: productDisplay, error: null });
        }
    })

    if (!category) return;

    return (
        <div>
            <HeroSection  
                bgSrc={ `${ category ? serverURL( `category_images/${ category.image }` ): "" }` }
                className="grid place-items-center max-h-[65vh] w-[100%] aspect-video "
            >
                <div className="text-center bg-slate-200 rounded opacity-90 p-12">
                    <h1 className="text-5xl font-medium mb-5">{ properCategoryName }</h1>
                    <p>
                        { category.description }
                    </p>
                </div>
                
            </HeroSection>


            <main className="py-24 px-2 md:px-10 flex flex-wrap gap-5">
                { products.data ? products.data: "No products" }
            </main>
                

        </div>
    );
}