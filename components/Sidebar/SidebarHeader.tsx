import { useDatabase } from 'contexts/DatabaseContext';
import * as React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, List, Typography } from '@mui/material';

import WalletListItem from '../Wallets/WalletListItem';

import type { Wallet } from 'types/database';
import NewWalletListItem from 'components/Wallets/NewWalletListItem';
import ManageWalletsListItem from 'components/Wallets/ManageWalletsListItem';
import TotalWalletListItem from 'components/Wallets/TotalWalletListItem';

export type SidebarHeaderProps = Omit<AccordionProps, 'children'>;
export default function SidebarHeader(props: SidebarHeaderProps) {
  const { database } = useDatabase();
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet['id'] | 'total'>();
  const { wallets } = database;
  const walletList: Wallet[] | undefined = wallets?.filter(wallet => wallet.archived === false && wallet.deleted === false).sort((a, b) => a.index - b.index);

  return (
    <Accordion
      elevation={0}
      sx={{
        '& .MuiAccordionSummary-root': {
          minHeight: 64
        }
      }}
      {...props}
    >
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography>Total</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <List>
          {walletList?.map(wallet => (
            <WalletListItem
              key={wallet.id}
              wallet={wallet}
              selected={selectedWallet === wallet.id}
              onClick={() => setSelectedWallet(wallet.id)}
            />
          ))}
          {/* <TotalWalletListItem
            wallet={'total'}
            selected={selectedWallet === 'total'}
            onClick={() => setSelectedWallet('total')}
          /> */}
          <NewWalletListItem />
          <ManageWalletsListItem />
        </List>
      </AccordionDetails>
    </Accordion>
  );
}