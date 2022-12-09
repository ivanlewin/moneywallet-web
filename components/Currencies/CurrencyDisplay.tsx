import { Typography } from "@mui/material";
import { Currency, TransactionDirection } from "types";
import { formatCurrency } from "utils/formatting";

type CurrencyDisplayProps = {
  amount: number;
  direction: TransactionDirection;
  currency: Currency;
};
export default function CurrencyDisplay({ amount, direction, currency }: CurrencyDisplayProps) {
  const color = direction === 1 ? '#4CAF50' : '#F44336';
  return (
    <Typography sx={{ color: color }}>{formatCurrency(amount, currency)}</Typography>
  );
}