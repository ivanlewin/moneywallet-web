import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from "@mui/material";
import Icon from "components/Icon";
import { useDatabase } from "contexts/database";
import React from "react";
import { IconSchema } from "schemas";
import { Wallet } from "types";
import { calculateBalance } from "utils";
import { formatCurrency } from "utils/formatting";

type WalletListItemProps = ListItemProps & {
  wallet: Wallet;
  selected: boolean;
};
export default function WalletListItem({ selected, onClick, wallet }: WalletListItemProps) {
  const { database } = useDatabase();
  const { transactions, currencies } = database || {};
  const { icon, id, } = wallet;
  const walletCurrency = currencies?.find(c => c.iso === wallet.currency);

  const walletIcon = React.useMemo(() => {
    try {
      const object = JSON.parse(icon);
      return IconSchema.parse(object) || null;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, [icon]);

  const walletBalance = React.useMemo(() => {
    if (!walletCurrency || !transactions) {
      return '';
    }
    const balance = calculateBalance(transactions, id);
    return formatCurrency(balance, walletCurrency);
  }, [transactions, id, walletCurrency]);

  return (
    <ListItem disablePadding onClick={onClick}>
      <ListItemButton selected={selected}>
        <ListItemIcon>
          <Icon {...({ type: 'color', name: 'W', color: '#1976D2' })} />
          {/* <Icon {...(walletIcon)} /> */}
        </ListItemIcon>
        <ListItemText primary={wallet.name} secondary={walletBalance} />
      </ListItemButton>
    </ListItem>
  );
}