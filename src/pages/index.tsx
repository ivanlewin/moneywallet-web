import { Box, Tab, Tabs } from '@mui/material';
import Layout from 'components/Layout';
import TransactionList from 'components/Transactions/TransactionList';
import TransferList from 'components/Transfers/TransferList';
import * as React from 'react';
import prisma from '../../lib/prisma';
import { GetServerSideProps } from 'next';

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

export default function Home() {
  const [tab, setTab] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

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
          <TransactionList />
        </TabPanel>
        <TabPanel value={tab} index={1}>
          <TransferList />
        </TabPanel>
      </Box>
    </Layout>
  );
}

export const getStaticProps: GetServerSideProps = async () => {
  const feed = await prisma.user.findMany({
  });
  return {
    props: { feed },
    revalidate: 10,
  };
};