import CurrencyDisplay from 'components/currencies/CurrencyDisplay';
import IconDisplay from 'components/Icons/IconDisplay';
import { useTransactionUtils } from 'contexts/TransactionUtils';
import { useRouter } from 'next/router';
import React from 'react';
import { Serialized } from 'types/core';
import { formatTime } from 'utils/formatting';

import { ListItem, ListItemAvatar, ListItemProps, ListItemText } from '@mui/material';
import { Transaction } from '@prisma/client';

type TransactionListItemProps = ListItemProps & {
  transaction: Serialized<Transaction>;
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

  return (
    <ListItem
      {...props}
      title='Open the transaction detail'
      onClick={goToDetail}
      sx={{
        ...props.sx,
        cursor: 'pointer',
        '&:hover': {
          bgcolor: 'action.hover'
        },
        '&:active': {
          bgcolor: 'action.selected'
        },
        '&:focus': {
          bgcolor: 'action.selected'
        }
      }}
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