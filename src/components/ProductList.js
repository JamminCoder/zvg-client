import { Item } from "./ShoppingCart";

export default function ProductList(props) {
    if (!props.cartItems) return;

    return (
        <div className={ props.className }>
            { 
            !props.cartItems.length > 0 
            ? "Nothing in cart"
            : props.cartItems.map(item => <Item key={ item.name } item={ item } />) } 
        </div>
    );
}