import ProductCard from "./cards/ProductCard";
import { Link } from "react-router-dom";

export default function CategoryDisplay({ category, className, productLimit = 4 }) {
    category.products.splice(productLimit); // only display the limited number of items

    return (
    <div className={ className }>
        <h2 className="text-3xl font-medium mb-5">{ category.name }</h2>
        <div className="flex flex-wrap gap-8 mb-4">
            { category.products.map(product => <ProductCard key={ product.sku } product={ product } />)}
        </div>
        <Link to={`/shop/${category.name}`} className="link">See more items in { category.name }</Link>
    </div>
    );
}
