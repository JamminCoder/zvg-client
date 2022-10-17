import { useParams } from "react-router-dom";
import { capatalizeFirstLetter } from "../lib/utils";
import HeroSection  from "../components/layouts/HeroSection";
import { ProductCard } from '../components/Cards';
import GridEvenContainer from '../components/layouts/GridEvenContainer';
import "../css/shop.css";
import "../css/app.css"


export default function ProductsPage(props) {
    const productType = useParams().productType;
    const properType = capatalizeFirstLetter(productType);
    

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


            <GridEvenContainer className="py-24 px-2 md:px-10">
                <ProductCard
                    name="Product"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                    price="19.99"
                />

                <ProductCard
                    name="Awesome"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                    price="19.99"
                />

                <ProductCard
                    name="Chickens"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                    price="19.99"
                />

                <ProductCard
                    name="Flowers"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                    price="19.99"
                />

            </GridEvenContainer>
                

        </div>
    );
}