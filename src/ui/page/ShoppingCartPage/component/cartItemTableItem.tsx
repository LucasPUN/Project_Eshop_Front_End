import { TableCell, TableRow, IconButton, CircularProgress, Typography } from "@mui/material";
import QuantitySelector from "../../../component/QuantitySelector.tsx";
import { CartItemDto } from "../../../../data/CartItemDto.ts";
import { useContext, useState } from "react";
import * as CartItemApi from "../../../../api/CartItemApi.ts";
import QuantitySelectorLoading from "../../../component/QuantitySelectorLoading.tsx";
import { CartItemLengthContext } from "../../../../App.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

type Props = {
    item: CartItemDto;
    cartItemList: CartItemDto[];
    setCartItemList: (cartItemList: CartItemDto[]) => void;
    calTotalPrice: (cartDataList: CartItemDto[]) => void;
};

export default function CartItemTableItem({ item, cartItemList, setCartItemList, calTotalPrice }: Props) {
    const [quantity, setQuantity] = useState<number>(item.cart_quantity);
    const [isPatchingQuantity, setIsPatchingQuantity] = useState<boolean>(false);
    const [isDeleting, setDeleting] = useState<boolean>(false);
    const cartItemContextValue = useContext(CartItemLengthContext);

    const handleMinus = async () => {
        if (quantity > 1) {
            setIsPatchingQuantity(true);
            try {
                const data = await CartItemApi.patchCartItem(item.pid, quantity - 1);
                setQuantity(data.cart_quantity);
                updateCartItem(data.cart_quantity);
            } finally {
                setIsPatchingQuantity(false);
            }
        }
    };

    const handlePlus = async () => {
        if (quantity < item.stock) {
            setIsPatchingQuantity(true);
            try {
                const data = await CartItemApi.patchCartItem(item.pid, quantity + 1);
                setQuantity(data.cart_quantity);
                updateCartItem(data.cart_quantity);
            } finally {
                setIsPatchingQuantity(false);
            }
        }
    };

    const handleDelete = async () => {
        setDeleting(true);
        try {
            await CartItemApi.deleteCartItem(item.pid);
            const updatedList = cartItemList.filter((cartItem) => cartItem.pid !== item.pid);
            setCartItemList(updatedList);
            calTotalPrice(updatedList);
            const data = await CartItemApi.getCartItemList();
            cartItemContextValue?.updateMyValue(data.length);
        } finally {
            setDeleting(false);
        }
    };

    const updateCartItem = (newQuantity: number) => {
        const updatedList = cartItemList.map((cartItem) =>
          cartItem.pid === item.pid ? { ...cartItem, cart_quantity: newQuantity } : cartItem
        );
        setCartItemList(updatedList);
        calTotalPrice(updatedList);
    };

    const renderQuantitySelector = () => {
        return isPatchingQuantity ? (
          <QuantitySelectorLoading />
        ) : (
          <QuantitySelector quantity={quantity} handleMinus={handleMinus} handlePlus={handlePlus} />
        );
    };

    return (
      <TableRow>
          <TableCell>
              <img src={item.image_url} alt={item.name} height="120px" />
          </TableCell>
          <TableCell>
              <Typography variant="body2">{item.name}</Typography>
          </TableCell>
          <TableCell>
              <Typography variant="body2">${item.price.toLocaleString()}</Typography>
          </TableCell>
          <TableCell>{renderQuantitySelector()}</TableCell>
          <TableCell>
              <Typography variant="body2">${(item.price * item.cart_quantity).toLocaleString()}</Typography>
          </TableCell>
          <TableCell>
              <IconButton onClick={handleDelete} disabled={isDeleting}>
                  {isDeleting ? <CircularProgress size={24} /> : <FontAwesomeIcon icon={faTrash}/>}
              </IconButton>
          </TableCell>
      </TableRow>
    );
}
