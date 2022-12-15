import { Typography } from "@mui/material";
import { TransactionDirection } from "types";
import { signAmount } from "utils";
import { formatCurrency } from "utils/formatting";

type CurrencyDisplayProps = {
  amount: number;
  direction?: TransactionDirection;
  currency?: Parameters<typeof formatCurrency>[1];
  color?: string;
  options?: Intl.NumberFormatOptions;
};
export default function CurrencyDisplay({ amount, direction, currency, color, options = {} }: CurrencyDisplayProps) {
  const displayAsPositive = (
    typeof direction === 'number' ? (direction === 1) : (signAmount(amount) >= 0)
  );
  const amountColor = displayAsPositive ? '#4CAF50' : '#F44336';
  return (
    <Typography sx={{ color: color || amountColor }}>{formatCurrency(amount, currency, options)}</Typography>
  );
}