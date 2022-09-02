import HeroSection from "../components/HeroSection";

export default function Shop(props) {
    return (
        <div className="flex flex-col items-center">
            <div className="w-[100%] max-w-[110rem]">
                <HeroSection 
                    className="grid place-items-center max-h-[65vh] w-[100%] aspect-video"
                    bgAlt="filler pic"
                    bgSrc=""
                >
                    <div className="text-center">
                        <h1 className="text-6xl mb-5">The Shop</h1>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam obcaecati eius explicabo repudiandae repellendus quisquam tempore.</p>
                    </div>
                </HeroSection>
            </div>
        </div>
    );
}