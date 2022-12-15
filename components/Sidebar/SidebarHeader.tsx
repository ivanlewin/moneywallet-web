import { useDatabase } from 'contexts/database';
import * as React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, List, Typography } from '@mui/material';

import WalletListItem from '../Wallets/WalletListItem';

import type { Wallet } from 'types';

export type SidebarHeaderProps = Omit<AccordionProps, 'children'>;
export default function SidebarHeader(props: SidebarHeaderProps) {
  const { database } = useDatabase();
  const [selectedWallet, setSelectedWallet] = React.useState<Wallet['id']>();
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
              selected={wallet.id === selectedWallet}
              onClick={() => setSelectedWallet(wallet.id)}
            />
          ))}
        </List>
      </AccordionDetails>
    </Accordion>
  );
}