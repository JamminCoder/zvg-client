import { useParams } from "react-router-dom";
import { ProductListing } from "./ProductsPage";

export default function ProductDetails(props) {
    const productName = useParams().productName;

    // These values will be extracted from the product API
    const price = 15.99;
    const description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa repellendus velit voluptate assumenda beatae debitis dignissimos consectetur, tenetur, ea atque magni sit delectus cum dolorem? Mollitia voluptates dolores vel cue.";

    return (
        <div className="flex flex-col items-center px-4 py-24">
            <main className="grid place-content-center md:grid-cols-2 max-w-[100rem] flex-grow gap-12">
                
                <div className=" w-[100%] max-w-[30rem] place-self-center">
                    <div className="welcome-slider">
                        <img className="w-[100%] slide" id="slide-1" src={`${process.env.PUBLIC_URL}/img/candles1.jpg`} />
                        <img className="w-[100%] slide" id="slide-2" src={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`} />
                        <img className="w-[100%] slide" id="slide-3" src={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`} />
                    </div>

                    <div className="flex gap-2 mt-4">
                        <div className="w-12 aspect-square bg-slate-100 hover:-translate-y-1 transition-transform">
                            <img className="w-[100%]" src={`${process.env.PUBLIC_URL}/img/candles1.jpg`} />
                        </div>

                        <div className="w-12 aspect-square bg-slate-100 hover:-translate-y-1 transition-transform">
                            <img className="w-[100%]" src={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`} />
                        </div>

                        <div className="w-12 aspect-square bg-slate-100 hover:-translate-y-1 transition-transform">
                            <img className="w-[100%]" src={`${process.env.PUBLIC_URL}/img/cabin.png`} />
                        </div>
                    </div>
                </div>


                <div className="flex flex-col justify-center gap-5">
                    <h1 className="text-4xl">{ productName }</h1>
                    <p>
                        { description }
                    </p>

                    <div className="flex items-center gap-5 ">
                        <a href="#add-to-cart" className="px-3 py-2 bg-green-600 text-lg text-white rounded">Add to Cart</a>
                        <h2 className="text-2xl text-green-900 font-bold">${ price }</h2>
                    </div>
                </div>
            </main>

            <div className="py-20 mt-20 border-t border-slate-400 w-[100%]">
                <h3 className="text-4xl text-center">More items</h3>
            </div>
            
            <section className="mb-24 px-10 gap-10 grid xl:grid-cols-2">
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
            </section>
        </div>
    );
}