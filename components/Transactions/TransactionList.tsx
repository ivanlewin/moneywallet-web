import { List, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemProps, ListItemText, ListSubheader, Typography } from "@mui/material";
import Icon from "components/Icon";
import { useDatabase } from "contexts/database";
import React from "react";
import { IconSchema } from "schemas";
import { Transaction, Wallet } from "types";
import { calculateBalance } from "utils";
import { formatCurrency, formatDate } from "utils/formatting";
import TransactionListItem from "./TransactionListItem";

type transactionsByDate = {
  [date: string]: Transaction[];
};

export default function TransactionList() {
  const { database } = useDatabase();
  const { transactions } = database;
  const transactions_ = transactions?.sort((a, b) => a.date.localeCompare(b.date)).slice(-300); // REMOVE

  const transactionsByDate = React.useMemo<transactionsByDate>(() => {
    if (!transactions_) {
      return {};
    }
    const dates = transactions_
      .map(transaction => transaction.date.split(' ')[0]) // only date, no time
      .sort((a, b) => b.localeCompare(a)) // sort from most recent to oldest
      .filter((v, i, a) => a.indexOf(v) === i);

    return dates.reduce((acc, date) => ({
      ...acc,
      [date]: transactions_
        .filter(transaction => transaction.date.split(' ')[0] === date)
        .sort((a, b) => b.date.localeCompare(a.date))  // sort from most recent to oldest
    }), {});
  }, [transactions_]);

  return (
    <List
      sx={{
        width: '100%',
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        height: '100vh',
        '& ul': { padding: 0 },
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
              {/* <Typography>{calculateBalance(transactionsOfTheDay)}</Typography> */}
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