import HeroSection from "../components/layouts/HeroSection";
import "../css/shop.css";
import GridEvenContainer from '../components/layouts/GridEvenContainer';
import { CatagoryListingCard } from '../components/Cards';


function Catagories(props) {
    return (
        <GridEvenContainer>
                <CatagoryListingCard
                    name="Gifts"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                />

                <CatagoryListingCard
                    name="Jewelry"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                />

                <CatagoryListingCard
                    name="Apparel"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                />

                <CatagoryListingCard
                    name="Candles"
                    description="Possimus, eius ipsa. Ipsam architecto quod, harum repudiandae dicta soluta eaque at ullam id mollitia"
                />

            </GridEvenContainer>
    );
}


export default function Shop(props) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-[100%] max-w-[110rem]">
                <HeroSection 
                    className="grid place-items-center max-h-[65vh] w-[100%] aspect-video"
                    bgAlt="filler pic"
                    bgSrc=""
                >
                    <div className="text-center grid place-items-center">
                        <h1 className="text-4xl sm:text-6xl mb-5">The Shop</h1>
                        <p className="max-w-[80%]">Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati eius explicabo repudiandae repellendus quisquam tempore.</p>
                    </div>
                </HeroSection>
                
                <Catagories/>
            </div>
        </div>
    );
}