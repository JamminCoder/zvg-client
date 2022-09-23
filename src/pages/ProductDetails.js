import { useParams } from "react-router-dom";
import { Children, useState } from "react";
import { ProductCard } from '../components/Cards';
import GridEvenContainer from '../components/GridEvenContainer';
import ShoppingCartManager from "../shoppingCartManager";

function ImagePreview(props) {
    const children = Children.toArray(props.children);
    const [currentImage, setCurrentImage] = useState(children[0].props.src);
    let thumbnails = [];

    for (let i = 0; i < children.length; i++) {
        let child = children[i];
        thumbnails.push(
            <img 
            onClick={() => {
                setCurrentImage(child.props.src)
            }}
            key={ i } className="w-12 transition-all hover:-translate-y-2" src={ child.props.src }/>
        );
    }

    return (
        <div className={`w-[100%] max-w-[30rem] place-self-center ${props.className}`}>
            <div>
                <img src={ currentImage } />
            </div>

            <div className="flex gap-2 mt-4">
                { thumbnails }
            </div>
        </div>
    );
}

export default function ProductDetails(props) {
    const productName = useParams().productName;

    // These values will be extracted from the product API
    const price = 15.99;
    const description = "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa repellendus velit voluptate assumenda beatae debitis dignissimos consectetur, tenetur, ea atque magni sit delectus cum dolorem? Mollitia voluptates dolores vel cue.";
    
    function addToCart(e) {
        ShoppingCartManager.addItem(productName, price, 1);
        e.stopPropagation();
        e.preventDefault(); 
    }

    return (
        <div className="mx-auto px-4 py-24">
            <main className="grid place-content-center md:grid-cols-2 max-w-[100rem] flex-grow gap-12">
                
                
                <ImagePreview>
                    <img src={`${process.env.PUBLIC_URL}/img/candles1.jpg`} />
                    <img src={`${process.env.PUBLIC_URL}/img/placeholder-square-1024.png`} />
                </ImagePreview>


                <div className="flex flex-col justify-center gap-5">
                    <h1 className="text-4xl">{ productName }</h1>
                    <p>
                        { description }
                    </p>

                    <div className="flex items-center gap-5 ">
                        <button onClick={ addToCart } href="#add-to-cart" className="px-3 py-2 bg-green-600 text-lg text-white rounded">Add to Cart</button>
                        <h2 className="text-2xl text-green-900 font-bold">${ price }</h2>
                    </div>
                </div>
            </main>

            <div className="pt-20 mt-20 border-t border-slate-400 w-[100%]">
                <h3 className="text-4xl text-center">More items</h3>
            </div>

            <GridEvenContainer>
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