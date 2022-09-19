export default function ShoppingCart(props) {
    return <img src={ `${ process.env.PUBLIC_URL }/icons/cart.svg` } className={`w-7 interactive-hover cursor-pointer ${props.className}`}/>
}