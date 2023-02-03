import SettingsIcon from '@mui/icons-material/Settings';
import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from '@mui/material';
import React from 'react';

export default function ManageWalletsListItem(props: ListItemProps) {
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary='Manage wallets' />
      </ListItemButton>
    </ListItem>
  );
}