import { useDatabase } from 'contexts/DatabaseContext';
import React from 'react';
import { Transfer } from 'types/database';
import { formatDate } from 'utils/formatting';

import { List, ListSubheader } from '@mui/material';

import TransferListItem from './TransferListItem';

type transfersByDate = {
  [date: string]: Transfer[];
};

export default function TransferList() {
  const { database } = useDatabase();
  const { transfers } = database;
  const transfers_ = transfers?.sort((a, b) => a.date.localeCompare(b.date)).filter(({ date }) => (date <= new Date().toISOString())).slice(-100); // TODO: replace Array.slice() with more robust solution

  const transfersByDate = React.useMemo<transfersByDate>(() => {
    if (!transfers_) {
      return {};
    }
    const dates = transfers_
      .map(transfer => transfer.date.split(' ')[0]) // only date, no time
      .sort((a, b) => b.localeCompare(a)) // sort from most recent to oldest
      .filter((v, i, a) => a.indexOf(v) === i);

    return dates.reduce((acc, date) => ({
      ...acc,
      [date]: transfers_
        .filter(transfer => transfer.date.split(' ')[0] === date)
        .sort((a, b) => b.date.localeCompare(a.date))  // sort from most recent to oldest
    }), {});
  }, [transfers_]);

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