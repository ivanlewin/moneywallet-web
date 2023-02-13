import BackButton from 'components/common/BackButton';
import CurrencyDisplay from 'components/Currencies/CurrencyDisplay';

import {
  Checkbox, FormControlLabel, Grid, Paper, TextField, Typography, useTheme
} from '@mui/material';
import { CategoryIcon, DateIcon, DescriptionIcon, EventIcon, NoteIcon, PeopleIcon, PlaceIcon, WalletIcon } from 'components/Icons';
import { Category, Currency, Event, Place, Transaction, Person, Wallet } from 'types/database';
import { ReactNode } from 'react';

type TransactionFormProps = {
  page: 'detail' | 'edit';
  transaction: Pick<Transaction, 'confirmed' | 'count_in_total' | 'date' | 'description' | 'direction' | 'id' | 'money' | 'note'>;
  transactionCategory?: Category;
  transactionCurrency?: Currency;
  transactionWallet?: Wallet;
  transactionEvent?: Event;
  transactionPeople?: Person[];
  transactionPlace?: Place;
  actions?: ReactNode;
};

export default function TransactionForm({
  page,
  transaction,
  transactionCurrency,
  transactionCategory,
  transactionWallet,
  transactionEvent,
  transactionPeople,
  transactionPlace,
  actions
}: TransactionFormProps) {
  const theme = useTheme();

  return (
    <Paper sx={{ minHeight: '100vh' }}>
      <Grid container direction='column' >
        <Grid
          container
          sx={{
            height: 120,
            background: '#2196F3',
            color: 'white',
          }}
        >
          <Grid container sx={{ alignItems: 'center', padding: 1 }}>
            <BackButton title='Go back to transaction list' href='/' iconButtonProps={{ sx: { color: 'white' } }} />
            <Typography variant='h6' sx={{ ml: 2, color: 'white' }}>Transaction</Typography>
            {actions}
          </Grid>
          <Grid
            container
            alignItems='center'
            justifyContent='flex-end'
            sx={{ padding: theme.spacing(1, 2, 1, 1) }}
          >
            <CurrencyDisplay
              amount={transaction.money}
              direction={transaction.direction}
              currency={transactionCurrency}
              color='white'
              fontSize={20}
              sx={{ ml: 2 }}
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
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <DescriptionIcon color={page === 'detail' ? 'disabled' : undefined} />
            <TextField
              disabled={page === 'detail'}
              label='Description'
              value={transaction.description}
              sx={{
                minWidth: 268,
                flexGrow: 1
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <CategoryIcon color={page === 'detail' ? 'disabled' : undefined} />
            <TextField
              disabled={page === 'detail'}
              label='Category'
              value={transactionCategory?.name ?? ''}
              sx={{
                minWidth: 268,
                flexGrow: 1
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <DateIcon color={page === 'detail' ? 'disabled' : undefined} />
            <TextField
              disabled={page === 'detail'}
              label='Date'
              type='datetime-local'
              value={transaction.date}
              sx={{
                minWidth: 268,
                flexGrow: 1
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center'
            }}>
            <WalletIcon color={page === 'detail' ? 'disabled' : undefined} />
            <TextField
              disabled={page === 'detail'}
              label='Wallet'
              value={transactionWallet?.name ?? ''}
              sx={{
                minWidth: 268,
                flexGrow: 1
              }}
            />
          </Grid>
          {page === 'edit' || transactionEvent ? (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <EventIcon color={page === 'detail' ? 'disabled' : undefined} />
              <TextField
                disabled={page === 'detail'}
                label='Event'
                value={transactionEvent?.name ?? ''}
                sx={{
                  minWidth: 268,
                  flexGrow: 1
                }}
              />
            </Grid>
          ) : null}
          {page === 'edit' || transactionPeople && transactionPeople.length > 0 ? ( // TODO: find People information for transaction
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <PeopleIcon color={page === 'detail' ? 'disabled' : undefined} />
              <TextField
                disabled={page === 'detail'}
                label='People'
                value={transactionPeople && transactionPeople[0] ? transactionPeople[0].name : ''}
                sx={{
                  minWidth: 268,
                  flexGrow: 1
                }}
              />
            </Grid>
          ) : null}
          {page === 'edit' || transactionPlace ? (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <PlaceIcon color={page === 'detail' ? 'disabled' : undefined} />
              <TextField
                disabled={page === 'detail'}
                label='Place'
                value={transactionPlace?.name ?? ''}
                sx={{
                  minWidth: 268,
                  flexGrow: 1
                }}
              />
            </Grid>
          ) : null}
          {page === 'edit' || transaction.note ? (
            <Grid
              item
              xs={12}
              sx={{
                display: 'flex',
                gap: 2,
                flexWrap: 'wrap',
                alignItems: 'center'
              }}>
              <NoteIcon color={page === 'detail' ? 'disabled' : undefined} />
              <TextField
                disabled={page === 'detail'}
                label='Note'
                value={transaction.note}
                sx={{
                  minWidth: 268,
                  flexGrow: 1
                }}
              />
            </Grid>
          ) : null}
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
              '& .MuiButtonBase-root': {
                marginRight: 1.5
              }
            }}>
            <FormControlLabel control={<Checkbox checked={transaction.confirmed} disabled={page === 'detail'} />} label='Confirmed' />
          </Grid>
          <Grid
            item
            xs={12}
            sx={{
              display: 'flex',
              gap: 2,
              flexWrap: 'wrap',
              alignItems: 'center',
              marginTop: -1.5,
              '& .MuiButtonBase-root': {
                marginRight: 1.5
              }
            }}>
            <FormControlLabel control={<Checkbox checked={transaction.count_in_total} disabled={page === 'detail'} />} label='Show in total wallet' />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};