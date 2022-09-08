import HeroSection from "../components/HeroSection";

export default function ReservationPage() {
    return (
        <div>
            <HeroSection bgSrc={`${process.env.PUBLIC_URL}/img/cabin.png`}
            className="grid place-items-center max-h-[65vh] w-[100%] aspect-video">
                <h1 className="text-white text-4xl">Hello</h1>
            </HeroSection>
            <main>
                Hello!
            </main>
        </div>
    );
}