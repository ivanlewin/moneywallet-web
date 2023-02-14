import Icon from 'components/Icons/Icon';
import { useDatabase } from 'contexts/DatabaseContext';
import React from 'react';
import { Wallet } from 'types/database';
import { calculateBalance } from 'utils';
import { formatCurrency } from 'utils/formatting';

import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText, useTheme } from '@mui/material';

type TotalWalletListItemProps = ListItemProps & {
  wallet: Wallet;
  selected: boolean;
};
export default function TotalWalletListItem({ selected, wallet, ...props }: TotalWalletListItemProps) {
  const theme = useTheme();
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
          <Icon color={theme.palette.common.black} name='Total' type='color' />
        </ListItemIcon>
        <ListItemText primary={name} secondary={walletBalance} />
      </ListItemButton>
    </ListItem>
  );
}