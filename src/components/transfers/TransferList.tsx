import React from 'react';
import { Serialized } from 'types/core';
import { formatDate } from 'utils/formatting';

import { List, ListSubheader } from '@mui/material';
import { Transfer } from '@prisma/client';

import TransferListItem from './TransferListItem';

type transfersByDate = {
  [date: string]: Serialized<Transfer>[];
};

interface TransferListProps {
  transfers: Serialized<Transfer>[];
}

export default function TransferList({ transfers }: TransferListProps) {
  const transfersByDate = React.useMemo<transfersByDate>(() => {
    const dates = transfers
      .map(transfer => transfer.date.split('T')[0]) // only date, no time
      .sort((a, b) => b.localeCompare(a)) // sort from most recent to oldest
      .filter((v, i, a) => a.indexOf(v) === i);

    return dates.reduce((acc, date) => ({
      ...acc,
      [date]: transfers
        .filter(transfer => transfer.date.split('T')[0] === date)
        .sort((a, b) => b.date.localeCompare(a.date))  // sort from most recent to oldest
    }), {});
  }, [transfers]);

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        '@media (pointer:none), (pointer:coarse)': {
          height: '100vh',
        },
        '& ul': {
          padding: 0
        },
      }}
      subheader={<li />}
    >
      {Object.entries(transfersByDate).map(([date, transfersOfTheDay]) => (
        <li key={date}>
          <ul>
            <ListSubheader
              sx={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {formatDate(date)}
            </ListSubheader>
            {transfersOfTheDay.map(transfer => (
              <TransferListItem
                key={transfer.id}
                transfer={transfer}
              />
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}