import { useDatabase } from 'contexts/DatabaseContext';
import * as React from 'react';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Accordion, AccordionDetails, AccordionProps, AccordionSummary, Grid, List, Typography } from '@mui/material';

import WalletListItem from '../Wallets/WalletListItem';

import type { Wallet } from 'types/database';
import NewWalletListItem from 'components/Wallets/NewWalletListItem';
import ManageWalletsListItem from 'components/Wallets/ManageWalletsListItem';
import TotalWalletListItem from 'components/Wallets/TotalWalletListItem';
import IconDisplay from 'components/Icons/IconDisplay';
import { TOTAL_WALLET_ICON } from 'fixtures';

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
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <IconDisplay
          icon={TOTAL_WALLET_ICON}
          onClick={() => setSelectedWallet('total')}
          style={{
            height: 56,
            width: 56,
            fontSize: '2rem'
          }}
        />
        {walletList ? (
          <Grid sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: '100%',
            mr: 1,
            gap: 1,
            '& > *': {
              height: 36,
              width: 36,
              fontSize: 22,
            }
          }}>
            {walletList.slice(0, 3).map(wallet => (
              <IconDisplay
                key={wallet.id}
                icon={wallet.icon}
                onClick={() => setSelectedWallet(wallet.id)}
              />
            ))}
          </Grid>
        ) : null}
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
    </Accordion >
  );
}