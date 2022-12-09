import { ListItem, ListItemAvatar, ListItemProps, ListItemText, Typography } from "@mui/material";
import CurrencyDisplay from "components/Currencies/CurrencyDisplay";
import Icon from "components/Icon";
import { useDatabase } from "contexts/database";
import React from "react";
import { IconSchema } from "schemas";
import { Transaction } from "types";
import { formatTime } from "utils/formatting";

type TransactionListItemProps = ListItemProps & {
  transaction: Transaction;
};
export default function TransactionListItem({ transaction, ...props }: TransactionListItemProps) {
  const { database } = useDatabase();
  const { categories, currencies, wallets } = database || {};

  const transactionCategory = categories?.find(category => category.id === transaction.category);
  const transactionWallet = wallets?.find(wallet => wallet.id === transaction.wallet);
  const transactionCurrency = currencies?.find(currencies => currencies.iso === transactionWallet?.currency);

  const transactionIcon = React.useMemo(() => {
    if (!transactionCategory) {
      return null;
    }
    try {
      const object = JSON.parse(transactionCategory.icon);
      return IconSchema.parse(object) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [transactionCategory]);

  if (!transactionCurrency) {
    return null;
  }

  return (
    <ListItem key={transaction.id} {...props}>
      <ListItemAvatar>
        <Icon {...(transactionIcon || { type: 'color', name: 'Transaction', color: '#1976D2' })} />
      </ListItemAvatar>
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > *:nth-child(2)': {
            textOverflow: 'ellipsis',
            maxWidth: 200,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }
        }}
        primary={transactionCategory?.name}
        secondary={transaction.description}
      />
      {/* <Typography>{transactionCategory?.name}</Typography>
      <Typography variant='body2'>{transaction.description}</Typography> */}
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        }}
        primary={
          <CurrencyDisplay
            amount={transaction.money}
            direction={transaction.direction}
            currency={transactionCurrency}
          />
        }
        secondary={formatTime(transaction.date)}
      />
    </ListItem>
  );
}