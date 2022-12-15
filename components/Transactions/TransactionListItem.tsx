import CurrencyDisplay from 'components/Currencies/CurrencyDisplay';
import Icon from 'components/Icons/Icon';
import { useDatabase } from 'contexts/database';
import { useRouter } from 'next/router';
import React from 'react';
import { IconSchema } from 'schemas';
import { Transaction } from 'types';
import { formatTime } from 'utils/formatting';

import { ListItem, ListItemAvatar, ListItemProps, ListItemText, Typography } from '@mui/material';

import type { Icon as IconType } from "types";
type TransactionListItemProps = ListItemProps & {
  transaction: Transaction;
};
export default function TransactionListItem({ transaction, ...props }: TransactionListItemProps) {
  const { database } = useDatabase();
  const router = useRouter();
  const { categories, currencies, wallets } = database || {};

  const transactionCategory = categories?.find(category => category.id === transaction.category);
  const transactionWallet = wallets?.find(wallet => wallet.id === transaction.wallet);
  const transactionCurrency = currencies?.find(currencies => currencies.iso === transactionWallet?.currency);

  const goToDetail = () => {
    router.push('/transactions/[transactionID]', `/transactions/${transaction.id}`);
  };

  const transactionIcon = React.useMemo(() => {
    const fallback = { type: 'color', name: 'Transaction', color: '#2196F3' } as IconType;
    if (!transactionCategory) {
      return fallback;
    }
    const object = JSON.parse(transactionCategory.icon);
    const icon = IconSchema.safeParse(object);
    return icon.success === true ? icon.data : fallback;
  }, [transactionCategory]);

  if (!transactionCurrency) {
    return null;
  }

  return (
    <ListItem key={transaction.id} onClick={goToDetail} {...props}>
      <ListItemAvatar >
        <Icon {...transactionIcon} />
      </ListItemAvatar>
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > .MuiListItemText-secondary': {
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