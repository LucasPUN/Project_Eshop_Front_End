import { TableCell, TableRow, Typography } from "@mui/material";
import { TransactionDtoItem } from "../../../../data/TransactionDto.ts";

type Props = {
    item: TransactionDtoItem;
};

export default function CheckOutTableItem({ item }: Props) {
    return (
      <TableRow>
          <TableCell>
              <img src={item.product.image_url} alt={item.product.name} height="120px" />
          </TableCell>
          <TableCell>
              <Typography variant="body2">{item.product.name}</Typography>
          </TableCell>
          <TableCell>
              <Typography variant="body2">${item.product.price.toLocaleString()}</Typography>
          </TableCell>
          <TableCell>
              <Typography variant="body2">{item.quantity}</Typography>
          </TableCell>
          <TableCell>
              <Typography variant="body2">${item.subtotal.toLocaleString()}</Typography>
          </TableCell>
      </TableRow>
    );
}
