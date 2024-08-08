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
            if (params.transactionId) {
                setIsCheckout(true);
                await TransactionApi.payTransactionById(params.transactionId);
                await TransactionApi.finishTransactionById(params.transactionId);
                navigate("/thankyou");
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
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Typography variant="h6">Total: ${transactionData.total.toLocaleString()}</Typography>
                </Box>
                <Box display="flex" justifyContent="flex-end" mt={2}>
                    <Button
                      variant="contained"
                      color="success"
                      size="large"
                      onClick={handleCheckout}
                      disabled={isCheckout}
                    >
                        {isCheckout ? "PAY" : "Pay"}
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
