import BackButton from 'components/common/BackButton';
import CurrencyDisplay from 'components/Currencies/CurrencyDisplay';
import { useDatabase } from 'contexts/database';
import { NextPage } from 'next';
import { useRouter } from 'next/router';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import {
  Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField, Typography
} from '@mui/material';
import { CategoryIcon, DateIcon, DescriptionIcon, EventIcon, NoteIcon, PeopleIcon, PlaceIcon, WalletIcon } from 'components/Icons';
import Link from 'next/link';

const TransactionDetail: NextPage = () => {
  const router = useRouter();
  const { database } = useDatabase();
  const { categories, wallets, currencies } = database;
  const transactionID = router.query.transactionID;
  const transaction = (
    database.transactions && typeof transactionID === 'string' ?
      database.transactions?.find(transaction => transaction.id === transactionID) :
      undefined
  );

  if (!transaction) {
    return null;
  }

  const transactionCategory = categories ? categories.find(category => category.id === transaction.category) : undefined;
  const transactionWallet = wallets ? wallets.find(wallet => wallet.id === transaction.wallet) : undefined;
  const transactionCurrency = transactionWallet && currencies ? currencies.find(currencies => currencies.iso === transactionWallet.currency) : undefined;

  if (!transactionWallet || !transactionCurrency) {
    return null;
  }

  return (
    <Paper>
      <Grid container direction='column' >
        <Grid
          container
          sx={{
            height: 120,
            background: 'lightblue'
          }}
        >
          <Grid container sx={{ alignItems: 'center', padding: 1 }}>
            <BackButton href='/' />
            <Typography variant='h6' sx={{ ml: 0.5 }}>Transaction</Typography>
            <Link
              href='/transactions/[transactionID]/edit'
              as={`/transactions/${transaction.id}/edit`}
              title='Edit'
              style={{ marginLeft: 'auto' }}
            >
              <EditIcon color='action' />
            </Link>
            <IconButton title='Delete' >
              <DeleteIcon color='action' />
            </IconButton>
          </Grid>
          <Grid sx={{ ml: 'auto' }}>
            <CurrencyDisplay
              amount={transaction.money}
              direction={transaction.direction}
              currency={transactionCurrency}
              color='black'
            />
          </Grid>
        </Grid>
        <Grid
          container
          direction='column'
          sx={{
            padding: 2,
            gap: 2
          }}>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: '100% !important',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <DescriptionIcon color='disabled' />
            <TextField
              variant='standard'
              disabled
              sx={{ minWidth: 268 }}
              label='Description'
              value={transaction.description}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: '100% !important',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <CategoryIcon color='disabled' />
            <TextField
              variant='standard'
              disabled
              sx={{ minWidth: 268 }}
              label='Description'
              value={transactionCategory?.name ?? ''}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: '100% !important',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <DateIcon color='disabled' />
            <TextField
              variant='standard'
              disabled
              sx={{ minWidth: 268 }}
              label='Date'
              type='datetime-local' value={transaction.date}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: '100% !important',
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <WalletIcon color='disabled' />
            <TextField
              variant='standard'
              disabled
              sx={{ minWidth: 268 }}
              label='Wallet'
              value={transactionWallet.name}
            />
          </Grid>
          {false ? (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: '100% !important',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <EventIcon color='disabled' />
              <TextField
                variant='standard'
                disabled
                sx={{ minWidth: 268 }}
                label='Event'
              />
            </Grid>
          ) : null}
          {false ? (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: '100% !important',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <PeopleIcon color='disabled' />
              <TextField
                variant='standard'
                disabled
                sx={{ minWidth: 268 }}
                label='People'
              />
            </Grid>
          ) : null}
          {false ? (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: '100% !important',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <PlaceIcon color='disabled' />
              <TextField
                variant='standard'
                disabled
                sx={{ minWidth: 268 }}
                label='Place'
              />
            </Grid>
          ) : null}
          {transaction.note ? (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                maxWidth: '100% !important',
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <NoteIcon color='disabled' />
              <TextField
                variant='standard'
                disabled
                sx={{ minWidth: 268 }}
                label='Note'
                value={transaction.note}
              />
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: '100% !important',
              flexWrap: 'wrap',
              alignItems: 'center',
              '& .MuiButtonBase-root': {
                marginRight: 1.5
              }
            }}>
            <FormControlLabel control={<Checkbox checked={transaction.confirmed} disabled />} label='Confirmed' />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              maxWidth: '100% !important',
              flexWrap: 'wrap',
              alignItems: 'center',
              '& .MuiButtonBase-root': {
                marginRight: 1.5
              }
            }}>
            <FormControlLabel control={<Checkbox checked={transaction.count_in_total} disabled />} label='Show in total wallet' />
          </Grid>
        </Grid>
      </Grid>
    </Paper >

  );
};

export default TransactionDetail;