import { useDatabase } from 'contexts/DatabaseContext';
import React from 'react';
import { Wallet } from 'types/database';
import { calculateBalance } from 'utils';
import { formatCurrency } from 'utils/formatting';

import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from '@mui/material';

import IconDisplay from '../Icons/IconDisplay';

type WalletListItemProps = ListItemProps & {
  wallet: Wallet;
  selected: boolean;
};
export default function WalletListItem({ selected, wallet, ...props }: WalletListItemProps) {
  const { database } = useDatabase();
  const { transactions, currencies } = database ?? {};
  const { currency, name } = wallet;
  const walletCurrency = currencies?.find(c => c.iso === currency);

  const walletBalance = React.useMemo(() => {
    if (!walletCurrency || !transactions) {
      return '';
    }
    const balance = calculateBalance(transactions, wallet);
    return formatCurrency(balance, walletCurrency);
  }, [walletCurrency, transactions, wallet]);

  return (
    <ListItem disablePadding {...props}>
      <ListItemButton selected={selected}>
        <ListItemIcon>
          <IconDisplay icon={wallet.icon} />
        </ListItemIcon>
        <ListItemText primary={name} secondary={walletBalance} />
      </ListItemButton>
    </ListItem>
  );
}