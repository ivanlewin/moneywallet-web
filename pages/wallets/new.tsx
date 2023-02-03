import BackButton from 'components/common/BackButton';
import CurrencyDisplay from 'components/Currencies/CurrencyDisplay';
import { useDatabase } from 'contexts/database';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Card, CardContent, Checkbox, FormControlLabel, Grid, IconButton, Paper, Typography
} from '@mui/material';

const NewWallet: NextPage = () => {
  const router = useRouter();
  const { database } = useDatabase();
  const { categories, wallets, currencies } = database;
  const transactionID = router.query.transactionID;
  const transaction = (
    database.transactions && typeof transactionID === 'string' ?
      database.transactions?.find(transaction => transaction.id === transactionID) :
      undefined
  );

  const transactionCategory = transaction && categories ? categories.find(category => category.id === transaction.category) : undefined;
  const transactionWallet = transaction && wallets ? wallets.find(wallet => wallet.id === transaction.wallet) : undefined;
  const transactionCurrency = transactionWallet && currencies ? currencies.find(currencies => currencies.iso === transactionWallet.currency) : undefined;

  if (!transaction || !transactionCurrency) {
    return null;
  }
  return (
    <Card>
      <CardContent sx={{ p: 0 }}>
        <Grid container sx={{ background: 'lightblue' }}>
          <Grid container sx={{
            alignItems: 'center',
          }}>
            <BackButton href='/' />
            <Typography >Transaction</Typography>
            <IconButton title='Edit' sx={{ ml: 'auto' }}>
              <EditIcon />
            </IconButton>
            <IconButton title='Delete' >
              <DeleteIcon />
            </IconButton>
          </Grid>
          <Grid sx={{
            ml: 'auto'
          }}>
            <CurrencyDisplay
              amount={transaction.money}
              direction={transaction.direction}
              currency={transactionCurrency}
              color='black'
            />
          </Grid>
        </Grid>
        <Grid container direction='column'>
          <Typography>Description: <span>{transaction.description}</span></Typography>
          {transactionCategory ? <Typography>Category: <span>{transactionCategory.name}</span></Typography> : null}
          <Typography>Date: <span>{transaction.date}</span></Typography>
          {transactionWallet ? <Typography>Wallet: <span>{transactionWallet.name}</span></Typography> : null}
          <FormControlLabel control={<Checkbox checked={transaction.confirmed} />} label='Confirmed' />
          <FormControlLabel control={<Checkbox checked={transaction.count_in_total} />} label='Show in total wallet' />
        </Grid>
      </CardContent>
    </Card >
  );
};

export default NewWallet;