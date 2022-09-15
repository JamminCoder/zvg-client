import { Link } from 'react-router-dom';
import Card from "./Card";


export function ProductCard({ name, description, price }) {
    return (
        <Card>
            <div>
                <img className="bg-gray-400 w-[100%] aspect-video"/>
            </div>

            <div className="px-2 py-2">
                <h2 className="font-medium text-xl">{ name }</h2>
                <h3 className="mb-2">{ price }</h3>
                <p className="mb-2">
                    { description }
                </p>

                <button className="py-1 px-2 bg-green-600 text-white rounded">Add to Cart</button>
            </div>
        </Card>
    );
}

export function CatagoryListingCard({ name, description }) {
    return (
        <Card>
            <div>
                <img className="bg-gray-400 w-[100%] aspect-video"/>
            </div>

            <div className="px-2 py-2">
                <h2 className="font-medium text-xl">{ name }</h2>
                <p className="mb-2">
                    { description }
                </p>

                <Link className="py-1 px-2 bg-green-600 text-white rounded" to={ `${ name }` }>Explore</Link>
            </div>
        </Card>
    );
}