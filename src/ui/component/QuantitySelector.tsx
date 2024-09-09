import { Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/system';

type Props = {
  quantity: number;
  handleMinus: () => void;
  handlePlus: () => void;
};

const MinusButton = styled(Button)({
  width: '100%',
  border: '1px solid black',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'red',
    color: 'white',
  },
});

const PlusButton = styled(Button)({
  width: '100%',
  border: '1px solid black',
  transition: 'background-color 0.3s ease',
  '&:hover': {
    backgroundColor: 'green',
    color: 'white',
  },
});

const QuantityDisplay = styled(Box)({
  width: '100%',
  border: '1px solid black',
  backgroundColor: 'whitesmoke',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function QuantitySelector({ quantity, handleMinus, handlePlus }: Props) {
  return (
    <Box display="flex" width="100%">
      <MinusButton onClick={handleMinus}>-</MinusButton>
      <QuantityDisplay>
        <Typography>{quantity}</Typography>
      </QuantityDisplay>
      <PlusButton onClick={handlePlus}>+</PlusButton>
    </Box>
  );
}
