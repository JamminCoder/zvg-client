import ProductCard from "./cards/ProductCard";
export default function CategoryDisplay({ category, className }) {
    return (
    <div className={ className }>
        <h2 className="text-4xl font-medium mb-5">{ category.name }</h2>
        <div className="flex flex-wrap gap-8 mb-4">
            { category.products.map(product => <ProductCard key={ product.sku } product={ product } />)}
        </div>
    </div>
    );
}
