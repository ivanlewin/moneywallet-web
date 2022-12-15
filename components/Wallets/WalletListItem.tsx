import Icon from 'components/Icons/Icon';
import { useDatabase } from 'contexts/database';
import React from 'react';
import { IconSchema } from 'schemas';
import { Wallet } from 'types';
import { calculateBalance } from 'utils';
import { formatCurrency } from 'utils/formatting';

import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from '@mui/material';

import type { Icon as IconType } from "types";

type WalletListItemProps = ListItemProps & {
  wallet: Wallet;
  selected: boolean;
};
export default function WalletListItem({ selected, onClick, wallet }: WalletListItemProps) {
  const { database } = useDatabase();
  const { transactions, currencies } = database || {};
  const { icon, id, currency, name } = wallet;
  const walletCurrency = currencies?.find(c => c.iso === currency);

  const walletIcon = React.useMemo(() => {
    const fallback = { type: 'color', name: 'Wallet', color: '#2196F3' } as IconType;
    const object = JSON.parse(icon);
    const icon_ = IconSchema.safeParse(object);
    return icon_.success === true ? icon_.data : fallback;
  }, [icon]);

  const walletBalance = React.useMemo(() => {
    if (!walletCurrency || !transactions) {
      return '';
    }
    const balance = calculateBalance(transactions, wallet);
    return formatCurrency(balance, walletCurrency);
  }, [transactions, id, walletCurrency]);

  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton selected={selected}>
        <ListItemIcon>
          <Icon {...(walletIcon)} />
        </ListItemIcon>
        <ListItemText primary={name} secondary={walletBalance} />
      </ListItemButton>
    </ListItem>
  );
}