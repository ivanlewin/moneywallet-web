import { Typography, TypographyProps } from "@mui/material";
import { TransactionDirection } from 'types/database';
import { signAmount } from "utils";
import { formatCurrency } from "utils/formatting";

interface CurrencyDisplayProps extends TypographyProps {
  amount: number;
  direction?: TransactionDirection;
  currency?: Parameters<typeof formatCurrency>[1];
  color?: string;
  options?: Intl.NumberFormatOptions;
};
export default function CurrencyDisplay({ amount, direction, currency, color, options = {}, ...props }: CurrencyDisplayProps) {
  const displayAsPositive = (
    typeof direction === 'number' ? (direction === 1) : (signAmount(amount) >= 0)
  );
  const amountColor = displayAsPositive ? '#4CAF50' : '#F44336';
  return (
    <Typography {...props} sx={{ color: color || amountColor, ...props.sx }} >{formatCurrency(amount, currency, options)}</Typography>
  );
}