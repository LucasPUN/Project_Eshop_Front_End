import { useContext, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import * as TransactionApi from "../../../api/TransactionApi.ts";
import { LoginUserContext } from "../../../App.tsx";

const ThankYouPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const loginUser = useContext(LoginUserContext);
  const [isProcessing, setIsProcessing] = useState(true);

  useEffect(() => {
    const completeTransaction = async () => {
      if (loginUser && sessionId) {
        try {
          await TransactionApi.finishTransactionById(sessionId);
          setTimeout(() => {
            navigate("/");
          }, 3000);
        } catch (error) {
          navigate("/error");
        } finally {
          setIsProcessing(false);
        }
      }
    };

    completeTransaction();
  }, [sessionId, navigate, loginUser]);

  return (
    <div>
      <h1>
        {isProcessing
          ? "Processing your payment..."
          : "Payment successful, thank you for your purchase!"}
      </h1>
      {!isProcessing && <h2>Redirecting to home in 5 seconds...</h2>}
    </div>
  );
};

export default ThankYouPage;
