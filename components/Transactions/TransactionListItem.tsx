import CurrencyDisplay from 'components/Currencies/CurrencyDisplay';
import { useRouter } from 'next/router';
import React from 'react';
import { Transaction } from 'types/database';
import { formatTime } from 'utils/formatting';

import { ListItem, ListItemAvatar, ListItemProps, ListItemText } from '@mui/material';

import { useTransactionUtils } from 'contexts/TransactionUtils';
import IconDisplay from 'components/Icons/IconDisplay';
type TransactionListItemProps = ListItemProps & {
  transaction: Transaction;
};
export default function TransactionListItem({ transaction, ...props }: TransactionListItemProps) {
  const router = useRouter();
  const { getCompleteTransaction } = useTransactionUtils();
  const completeTransaction = getCompleteTransaction(transaction.id);

  const transactionCategory = completeTransaction?.category;
  const transactionCurrency = completeTransaction?.currency;

  const goToDetail = () => {
    router.push('/transactions/[transactionID]', `/transactions/${transaction.id}`);
  };

  if (!completeTransaction || !transactionCurrency) {
    return null;
  }

  return (
    <ListItem
      {...props}
      onClick={goToDetail}
      sx={{ ...props.sx, cursor: 'pointer' }}
      title='Open the transaction detail'
    >
      <ListItemAvatar >
        <IconDisplay icon={transactionCategory?.icon} />
      </ListItemAvatar>
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > .MuiListItemText-primary, & > .MuiListItemText-secondary': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }
        }}
        primary={transactionCategory?.name}
        primaryTypographyProps={{ title: transactionCategory?.name }}
        secondary={transaction.description}
        secondaryTypographyProps={{ title: transaction.description }}
      />
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          flexShrink: 0
        }}
        primary={
          <CurrencyDisplay
            amount={transaction.money}
            direction={transaction.direction}
            currency={transactionCurrency}
          />
        }
        secondary={formatTime(transaction.date)}
        secondaryTypographyProps={{ title: transaction.date }}
      />
    </ListItem>
  );
}