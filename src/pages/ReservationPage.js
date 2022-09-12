import HeroSection from "../components/HeroSection";


function FormGroup(props) {
    return (
        <div>
            <div className="flex gap-2 mb-5">
                { props.children }
            </div>
        </div>
    );
}

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
            <main className="p-10">
                <h1 className="text-3xl">Create Reservation Here:</h1>
                <form className="p-4 shadow-lg w-[100%] max-w-[50rem]">
                    <FormGroup>
                        <label>Name:</label>
                        <input type="text" className="border-b border-gray-400"/>
                    </FormGroup>

                    <FormGroup>
                        <label>Email:</label>
                        <input type="email" className="border-b border-gray-400"/>
                    </FormGroup>

                    <FormGroup>
                        <label>Phone:</label>
                        <input type="phone" className="border-b border-gray-400"/>
                    </FormGroup>
                    
                    <FormGroup>
                        <label>Month:</label>
                        <input type="month" className="border-b border-gray-400"/>
                    </FormGroup>

                    <FormGroup>
                        <label>Number of nights:</label>
                        <input type="number" className="border-b border-gray-400 w-12"/>
                    </FormGroup>

                    <div className="mb-5">
                        <p>Openings for X consecutive nights in month:</p>
                        <div className="flex gap-4">
                            <a className="px-2 py-1 shadow-md bg-blue-300">8th - 10th</a>
                            <a className="px-2 py-1 shadow-md bg-slate-200">11th - 13th</a>
                            <a className="px-2 py-1 shadow-md bg-slate-200">14th - 16th</a>
                            <a className="px-2 py-1 shadow-md bg-slate-200">17th - 19th</a>
                        </div>
                    </div>

                    <FormGroup>
                        <label>Number of people:</label>
                        <input type="number" className="border-b border-gray-400 w-12"/>
                    </FormGroup>

                    <section className="border-t pt-10 text-xl">
                        <h2 className="text-2xl font-medium mb-4">Reservation Info</h2>
                        
                        <div className="grid gap-2 mb-2">
                            <p><span className="font-bold mr-2">Lodging Time:</span>X nights</p>
                            <p><span className="font-bold mr-2">Number of People:</span>X</p>
                            <p><span className="font-bold mr-2">Total Cost:</span>$XYZ at $XYZ/night for X people</p>
                        </div>
                        
                        <button className="hover:shadow transition-all rounded border py-2 px-4 bg-slate-200">Submit</button>
                    </section>
                </form>
            </main>
        </div>
    );
}