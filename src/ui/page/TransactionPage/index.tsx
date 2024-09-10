import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { LoginUserContext } from "../../../App.tsx";
import { TransactionDto } from "../../../data/TransactionDto.ts";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from "@mui/material";
import React from "react";
import Loading from "../../component/Loading.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";

export default function TransactionPage() {
  const navigate = useNavigate();
  const loginUser = useContext(LoginUserContext);
  const [transactionData, setTransactionData] = useState<TransactionDto[] | undefined>(undefined);
  const [statusFilter, setStatusFilter] = useState<string>('ALL');

  const getTransactionData = async () => {
    try {
      const data = await TransactionApi.getTransactionByUser();
      setTransactionData(data);
    } catch (error) {
      console.log(error);
      navigate("/error");
    }
  };

  const handleStatusChange = (event: SelectChangeEvent<string>) => {
    setStatusFilter(event.target.value);
  };

  useEffect(() => {
    if (loginUser) {
      getTransactionData();
    } else if (loginUser === null) {
      navigate("/login");
    }
  }, [loginUser]);

  // Filter transactions based on selected status
  const filteredTransactions = transactionData?.filter(order =>
    statusFilter === 'ALL' || order.status === statusFilter
  );

  return (
    <>
      <TopNavBar />
      <Box padding={4}>
        <Typography variant="h4" gutterBottom>我的訂單</Typography>

        {/* Dropdown for status filter */}
        <FormControl fullWidth sx={{ mb: 2 }}>
          <InputLabel id="status-select-label">訂單狀態</InputLabel>
          <Select
            labelId="status-select-label"
            value={statusFilter}
            label="訂單狀態"
            onChange={handleStatusChange}
          >
            <MenuItem value="ALL">ALL</MenuItem>
            <MenuItem value="PREPARE">PENDING</MenuItem>
            <MenuItem value="SUCCESS">SUCCESS</MenuItem>
            {/* Add more status options if needed */}
          </Select>
        </FormControl>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>訂單編號</TableCell>
                <TableCell>日期時間</TableCell>
                <TableCell>狀態</TableCell>
                <TableCell>總金額</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTransactions ?
                filteredTransactions.map(order => (
                  <React.Fragment key={order.id}>
                    <TableRow sx={{ borderBottom: '1px solid #e0e0e0', '&:not(:last-of-type)': { mb: 3 } }}>
                      <TableCell>{order.id}</TableCell>
                      <TableCell>{order.datetime}</TableCell>
                      <TableCell>{order.status}</TableCell>
                      <TableCell>${order.total.toFixed(2)}</TableCell>
                    </TableRow>
                    {/* 顯示每個訂單的產品項目 */}
                    {order.Item.map(item => (
                      <TableRow key={item.tpid} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                        <TableCell colSpan={2}>
                          <Box display="flex" alignItems="center">
                            <img src={item.product.image_url} alt={item.product.name}
                                 style={{ width: '50px', marginRight: '10px' }} />
                            {item.product.name}
                          </Box>
                        </TableCell>
                        <TableCell>數量: {item.quantity}</TableCell>
                        <TableCell>小計: ${item.subtotal.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                    {/* Add spacing between orders */}
                    <TableRow>
                      <TableCell colSpan={4} sx={{ paddingTop: 3 }}></TableCell>
                    </TableRow>
                  </React.Fragment>
                )) :
                <Loading />
              }
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </>
  );
}
