import Layout from 'components/Layout';
import TransactionList from 'components/transactions/TransactionList';
import TransferList from 'components/transfers/TransferList';
import { GetServerSideProps } from 'next';
import * as React from 'react';
import { Serialized } from 'types/core';

import { Box, Tab, Tabs } from '@mui/material';
import { Transaction, Transfer } from '@prisma/client';

import prisma from '../../lib/prisma';
import dayjs from 'dayjs';
import { DATETIME_FORMAT } from 'const';

const TABS = ['transactions', 'transfers'];

type TabPanelProps = React.HTMLAttributes<HTMLDivElement> & {
  index: number;
  value: number;
};
function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} {...other} >
      {value === index ? children : null}
    </div>
  );
}

interface HomeProps {
  transactions: Serialized<Transaction>[];
  transfers: Serialized<Transfer>[];
}
export default function Home({ transactions, transfers }: HomeProps) {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: any, newValue: number) => {
    setTab(newValue);
    history.replaceState(null, '', `#${TABS[newValue]}`);
  };

  React.useEffect(() => {
    if (window.location.hash.replace('#', '') === 'transfers') {
      handleChange(undefined, 1);
    } else {
      handleChange(undefined, 0);
    }
  }, []);

  return (
    <Layout>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs
            value={tab}
            onChange={handleChange}
            sx={{
              '& .MuiTabs-flexContainer': {
                justifyContent: 'center'
              }
            }}
          >
            <Tab sx={{ width: '50%' }} label='Transactions' />
            <Tab sx={{ width: '50%' }} label='Transfers' />
          </Tabs>
        </Box>
        <TabPanel value={tab} index={0}>
          <TransactionList transactions={transactions} />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <TransferList transfers={transfers} />
        </TabPanel>
      </Box>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  const transactions = await prisma.transaction.findMany({
    take: 200,
    where: {
      date: {
        gte: dayjs().subtract(1, 'month').toDate()
      }
    },
    orderBy: {
      date: 'desc'
    }
  });
  const transfers = await prisma.transfer.findMany({
    take: 200,
    where: {
      date: {
        gte: dayjs().subtract(1, 'month').toDate()
      }
    },
    orderBy: {
      date: 'desc'
    }
  });
  return {
    props: {
      transactions: transactions.map((transaction) => ({
        ...transaction,
        date: dayjs(transaction.date).format(DATETIME_FORMAT),
        lastEdit: dayjs(transaction.lastEdit).format(DATETIME_FORMAT),
      })),
      transfers: transfers.map((transfer) => ({
        ...transfer,
        date: dayjs(transfer.date).format(DATETIME_FORMAT),
        lastEdit: dayjs(transfer.lastEdit).format(DATETIME_FORMAT),
      }))
    }
  };
};