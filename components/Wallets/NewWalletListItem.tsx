import AddIcon from '@mui/icons-material/Add';
import { ListItem, ListItemButton, ListItemIcon, ListItemProps, ListItemText } from '@mui/material';
import React from 'react';

export default function NewWalletListItem(props: ListItemProps) {
  return (
    <ListItem disablePadding {...props}>
      <ListItemButton >
        <ListItemIcon>
          <AddIcon />
        </ListItemIcon>
        <ListItemText primary={'New wallet'} />
      </ListItemButton>
    </ListItem>
  );
}