import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import CheckOutTableItem from "./CheckOutTableItem.tsx";
import { TransactionDtoItem } from "../../../../data/TransactionDto.ts";

type Props = {
    itemList: TransactionDtoItem[];
};

export default function CheckOutTable({ itemList }: Props) {
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
                  </TableRow>
              </TableHead>
              <TableBody>
                  {itemList.map((item) => (
                    <CheckOutTableItem item={item} key={item.tpid} />
                  ))}
              </TableBody>
          </Table>
      </TableContainer>
    );
}
