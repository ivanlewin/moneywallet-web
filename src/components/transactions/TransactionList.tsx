import React from 'react';
import { calculateBalance } from 'utils';
import { formatDate } from 'utils/formatting';

import { List, ListSubheader } from '@mui/material';

import TransactionListItem from './TransactionListItem';
import CurrencyDisplay from 'components/currencies/CurrencyDisplay';
import { Transaction } from '@prisma/client';
import { Serialized } from 'types/core';

type transactionsByDate = {
  [date: string]: Serialized<Transaction>[];
};

interface TransactionListProps {
  transactions: Serialized<Transaction>[];
}

export default function TransactionList({ transactions }: TransactionListProps) {
  const transactionsByDate = React.useMemo<transactionsByDate>(() => (
    transactions
      .map(transaction => transaction.date.split('T')[0]) // get the date of the transaction
      .sort((a, b) => b.localeCompare(a)) // sort dates from most recent to oldest
      .filter((v, i, a) => a.indexOf(v) === i) // remove duplicates
      .reduce((acc, date) => ({
        ...acc,
        [date]: transactions // group transactions by date
          .filter(transaction => transaction.date.split('T')[0] === date)
          .sort((a, b) => b.date.localeCompare(a.date))  // sort transactions for each day from most recent to oldest
      }), {})
  ), [transactions]);

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
      {Object.entries(transactionsByDate).map(([date, transactionsOfTheDay]) => (
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
              <CurrencyDisplay amount={calculateBalance(transactionsOfTheDay)} />
            </ListSubheader>
            {transactionsOfTheDay.map(transaction => (
              <TransactionListItem
                key={transaction.id}
                transaction={transaction}
              />
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}