import {CartItemDto} from "../../data/CartItemDto.ts";

type Props = {
    cartItemDto: CartItemDto
}
export default function ShoppingCartOffcanvasBody({cartItemDto}:Props) {
    return (
        <div>
            <div
                style={{
                    width:"100%",
                    height: "180px",
                    backgroundImage: `url(${cartItemDto.image_url})`,
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "contain"
            }}>
            </div>
            <h2>{cartItemDto.name}</h2>
            Price: ${cartItemDto.price}<br/>
            Quantity: {cartItemDto.cart_quantity}
            <hr/>
        </div>

    )
}