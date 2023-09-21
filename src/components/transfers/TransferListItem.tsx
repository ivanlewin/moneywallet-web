import CurrencyDisplay from 'components/currencies/CurrencyDisplay';
import IconDisplay from 'components/Icons/IconDisplay';
import { useTransactionUtils } from 'contexts/TransactionUtils';
import { useTransferUtils } from 'contexts/TransferUtils';
import { useRouter } from 'next/router';
import React from 'react';
import { formatTime } from 'utils/formatting';

import { ListItem, ListItemAvatar, ListItemProps, ListItemText, useTheme } from '@mui/material';
import { Transfer } from '@prisma/client';
import { Serialized } from 'types/core';

type TransferListItemProps = ListItemProps & {
  transfer: Serialized<Transfer>;
};
export default function TransferListItem({ transfer, ...props }: TransferListItemProps) {
  const router = useRouter();
  const theme = useTheme();
  const { getCompleteTransfer } = useTransferUtils();
  const { getCompleteTransaction } = useTransactionUtils();

  const completeTransfer = getCompleteTransfer(transfer.id);
  if (!completeTransfer) {
    return null;
  }
  const completeFromTransaction = transfer.fromID ? getCompleteTransaction(transfer.fromID) : undefined;
  const completeToTransaction = transfer.toID ? getCompleteTransaction(transfer.toID) : undefined;

  const goToDetail = () => {
    router.push('/transfers/[transferID]', `/transfers/${transfer.id}`);
  };

  if (!completeFromTransaction || !completeToTransaction) {
    return null;
  }
  return (
    <ListItem
      {...props}
      onClick={goToDetail}
      sx={{ ...props.sx, cursor: 'pointer' }}
      title='Open the transfer detail'
    >
      <ListItemAvatar >
        <IconDisplay icon={completeFromTransaction.wallet?.icon}
          style={{
            position: 'relative',
            top: 0,
            left: -4,
            backgroundColor: theme.palette.primary.dark
          }}
        />
        <IconDisplay icon={completeToTransaction.wallet?.icon}
          style={{
            position: 'relative',
            top: 12,
            left: -20,
          }}
        />
      </ListItemAvatar >
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          '& > .MuiListItemText-primary, & > .MuiListItemText-secondary': {
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }
        }}
        primary={`${completeFromTransaction.wallet?.name} → ${completeToTransaction.wallet?.name}`}
        primaryTypographyProps={{ title: `${completeFromTransaction.wallet?.name} → ${completeToTransaction.wallet?.name}` }}
        secondary={transfer.description}
        secondaryTypographyProps={{ title: transfer.description }}
      />
      <ListItemText
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          flexShrink: 0
        }}
        primary={
          <CurrencyDisplay
            amount={completeFromTransaction.money}
            color={theme.palette.text.primary}
            currency={completeFromTransaction?.currency}
          />
        }
        secondary={formatTime(transfer.date)}
        secondaryTypographyProps={{ title: transfer.date }}
      />
    </ListItem>
  );
}