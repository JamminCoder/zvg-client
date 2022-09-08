import HeroSection from "../components/HeroSection";

export default function ReservationPage() {
    return (
        <div>
            <HeroSection bgSrc={`${process.env.PUBLIC_URL}/img/cabin.png`}
            className="grid place-items-center h-[90vh] w-[100%]">
                <div className="text-white text-center">
                    <h1 className="text-6xl">Campgrounds &amp; Cabins</h1>
                    <p className="mt-5">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit qui ex quisquam expedita eligendi veniam, pariatur eius Quis harum porro animi molestias.
                    </p>

                    <div className="mt-8 flex gap-3 justify-center">
                        <a href="#reserve" className="py-2 px-4 text-white text-xl bg-blue-600 rounded">Reserve</a>
                        <a href="#reserve" className="py-2 px-4 text-black text-xl bg-slate-200 rounded">Something</a>
                        <a href="#reserve" className="py-2 px-4 text-black text-xl bg-orange-400 rounded">Awesome</a>
                    </div>
                </div>
                
            </HeroSection>
            <main>
                Hello!
            </main>
        </div>
    );
}