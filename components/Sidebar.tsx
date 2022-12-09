import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem, { ListItemProps } from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useDatabase } from 'contexts/database';
import type { Wallet } from 'types';
import WalletListItem from './Wallets/WalletListItem';

export default function Sidebar() {
  const { database } = useDatabase();
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet['id']>();
  const { wallets } = database;
  const walletList: Wallet[] | undefined = wallets?.filter(wallet => wallet.archived === false && wallet.deleted === false).sort((a, b) => a.index - b.index);

  return (
    <Box sx={{ width: 320 }} role="presentation" >
      <List>
        {walletList?.map(wallet => (
          <WalletListItem
            key={wallet.id}
            wallet={wallet}
            selected={wallet.id === selectedWallet}
            onClick={() => setSelectedWallet(wallet.id)}
          />
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              <ListItemText primary={text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );
}