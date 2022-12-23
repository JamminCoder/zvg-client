import { Link } from "react-router-dom";
import { serverURL } from "../../lib/utils";
import LinkCard from "./LinkCard";

export default function CategoryListingCard({ name, imageSrc, description }) {
    const categoryUrl = `/shop/${ name }`
    return (
        <LinkCard 
        to={ categoryUrl }
        className="hover:-translate-y-[3px] transition-all hover:shadow-xl cursor-pointer">
            <div>
                <img className="bg-gray-400 w-[100%] aspect-video object-cover object-top" src={ serverURL(imageSrc) }/>
            </div>

            <div className="px-2 py-2">
                <h2 className="font-medium text-xl">{ name }</h2>
                <p className="mb-2">
                    { description }
                </p>

                <Link className="py-1 px-2 bg-green-600 text-white rounded" to={ `${ name }` }>Explore</Link>
            </div>
        </LinkCard>
    );
}