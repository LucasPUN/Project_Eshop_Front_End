import CheckOutTable from "./component/CheckOutTable.tsx";
import { Button, Container, Typography, Box, CircularProgress } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { TransactionDto } from "../../../data/TransactionDto.ts";
import { useNavigate, useParams } from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import { LoginUserContext } from "../../../App.tsx";

type Params = {
    transactionId: string;
};

export default function CheckOutPage() {
    const params = useParams<Params>();
    const navigate = useNavigate();
    const loginUser = useContext(LoginUserContext);

    const [transactionData, setTransactionData] = useState<TransactionDto | undefined>(undefined);
    const [isCheckout, setIsCheckout] = useState<boolean>(false);

    const getTransactionData = async () => {
        try {
            if (params.transactionId) {
                const data = await TransactionApi.getTransactionById(params.transactionId);
                setTransactionData(data);
            } else {
                navigate("/error");
            }
        } catch (error) {
            console.log(error);
            navigate("/error");
        }
    };

    useEffect(() => {
        if (loginUser) {
            getTransactionData();
        } else if (loginUser === null) {
            navigate("/login");
        }
    }, [loginUser]);

    const handleCheckout = async () => {
        try {
            // if (params.transactionId) {
            //     setIsCheckout(true);
            //     await TransactionApi.payTransactionById(params.transactionId);
            //     await TransactionApi.finishTransactionById(params.transactionId);
            //     navigate("/thankyou");
            // }
            if (params.transactionId) {
                setIsCheckout(true);
                // 調用 API 並獲取 Stripe Checkout URL
                const stripeUrl = await TransactionApi.payTransactionById(params.transactionId);
                // 重定向到 Stripe Checkout 頁面
                window.location.href = stripeUrl;

            }
        } catch (error) {
            navigate("/error");
        }
    };

    return (
      <Container>
          <Typography variant="h4" gutterBottom>Checkout Page</Typography>
          {transactionData ? (
            <>
                <CheckOutTable itemList={transactionData.Item} />
                <Box display="flex" mt={2}
                     sx={{
                         justifyContent: 'center',
                         width: '100%',
                     }}>
                    <Typography variant="h6">Total: ${transactionData.total.toLocaleString()}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant="outlined"
                      size="large"
                      onClick={handleCheckout}
                      disabled={isCheckout}
                      sx={{
                          width: '100%',
                          borderColor: 'black',
                          color: 'black',
                          '&:hover': {
                              color: 'white',
                              backgroundColor: '#000000'
                          },
                      }}
                    >
                        PAY
                    </Button>
                </Box>
            </>
          ) : (
            <Box display="flex" justifyContent="center" mt={4}>
                <CircularProgress />
            </Box>
          )}
      </Container>
    );
}
