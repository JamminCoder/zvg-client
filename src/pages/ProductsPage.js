import { useParams, Link } from "react-router-dom";
import { capatalizeFirstLetter } from "../utils";
import HeroSection  from "../components/HeroSection";
import "../css/shop.css";


export function ProductListing({ name, price, description, imgSrc, imgAlt }) {
    const productType = useParams().productType;

    return (
        <div className="product-listing border-b border-slate-200">
            <div className="product-listing__content">
                <img src={ imgSrc } alt={ imgAlt } className="product-listing__image rounded"/>

                <div className="flex flex-col gap-2 product-listing__data">
                    <h1 className="text-3xl">{ name }</h1>
                    <p className="text-lg text-gray-800 md:max-w-[40ch]">{ description }</p>

                    <div className="flex flex-wrap justify-center items-center gap-4">
                        <Link to={`/cart/add/${ name.toLowerCase() }`} className="py-2 px-4 bg-green-600 text-white w-fit rounded">Add to cart</Link>
                        <Link to={`/shop/${ productType }/${ name }`} className="py-2 px-4 border bg-slate-50 w-fit rounded">Details</Link>
                        <h3 className="text-2xl font-bold text-green-700">${ price }</h3>
                    </div>
                </div>
            </div>
            

        </div>
    );
}



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


            <div className="py-24 px-10 gap-10 grid xl:grid-cols-2">
                <ProductListing
                    name="Product Name"
                    price={15.99}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit"
                    imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
                />

                <ProductListing
                    name="Product Name"
                    price={15.99}
                    description="Similique atque sunt, nesciunt quas voluptatum in perferendis"
                    imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
                />

                <ProductListing
                    name="Product Name"
                    price={15.99}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque sunt, nesciunt quas voluptatum in perferendis"
                    imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
                />

                <ProductListing
                    name="Product Name"
                    price={15.99}
                    description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Similique atque sunt, nesciunt quas voluptatum in perferendis"
                    imgSrc={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`}
                />
            </div>
        </div>
    );
}