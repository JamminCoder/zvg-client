export default function ManageCabinSection() {
    return(
    <form className="py-24 bg-gray-900 text-white px-10">
        <section className="gap-10 flex flex-col-reverse md:grid place-items-center grid-cols-2">
        <div>
            <img src={`${process.env.PUBLIC_URL}/img/cabin.png`} alt="cabin" />
            <input type="file" name="image" id="image"/>
        </div>

        <div>
            <input 
            name="header"
            className="clean-input border-b-white text-3xl sm:text-5xl mb-5" 
            defaultValue="Lorum ipsum dolar sit amit"/>

            <textarea
            name="lead"
            className="mb-5 clean-input block w-[100%] h-32 text-left"
            defaultValue="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit."/>

            <input className="text-center block w-fit mb-8 px-7 py-3 rounded bg-blue-700 text-xl sm:text-2xl" defaultValue="Create a Reservation"/>
            
            <div className="flex gap-4 text-xl">
                <label htmlFor="link">Link:</label>
                <input className="text-sm text-black w-[100%]" type="text" name="link" defaultValue="https://www.hipcamp.com/en-US/land/new-york-zoar-valley-ridge-j29h5pnj"/>    
            </div>

        </div>
        </section>
    </form>
    );
}