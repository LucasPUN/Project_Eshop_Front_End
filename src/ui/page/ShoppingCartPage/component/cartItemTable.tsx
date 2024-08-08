import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CartItemTableItem from "./cartItemTableItem.tsx";
import { CartItemDto } from "../../../../data/CartItemDto.ts";

type Props = {
    cartItemList: CartItemDto[];
    setCartItemList: (cartItemList: CartItemDto[]) => void;
    calTotalPrice: (cartDataList: CartItemDto[]) => void;
};

export default function CartItemTable({ cartItemList, setCartItemList, calTotalPrice }: Props) {
    return (
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell></TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Unit Price</TableCell>
                      <TableCell>Quantity</TableCell>
                      <TableCell>Subtotal</TableCell>
                      <TableCell></TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {cartItemList.map((item) => (
                    <CartItemTableItem
                      item={item}
                      cartItemList={cartItemList}
                      setCartItemList={setCartItemList}
                      calTotalPrice={calTotalPrice}
                      key={item.pid}
                    />
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
    );
}
