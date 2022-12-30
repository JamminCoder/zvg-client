import { Link } from "react-router-dom";

export default function CabinSection() {
    return (
        <div>
        <section className="py-24 bg-gray-900 text-white px-10">
            <section className="gap-10 flex flex-col-reverse md:grid place-items-center grid-cols-2">
            <div>
                <img src={`${process.env.PUBLIC_URL}/img/cabin.png`} alt="cabin" />
            </div>

            <div>
                <h1 className="text-3xl sm:text-5xl mb-5">Lorum ipsum dolar sit amit</h1>
                <p className="mb-5">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                </p>

                <Link to="/campground" className="px-7 py-3 rounded bg-blue-700 text-xl sm:text-2xl">Create a Reservation</Link>

            </div>
            </section>
        </section>

        </div>
    );
}