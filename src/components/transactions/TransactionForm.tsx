import BackButton from 'components/common/BackButton';
import CurrencyDisplay from 'components/currencies/CurrencyDisplay';
import {
  CategoryIcon, DateIcon, DescriptionIcon, EventIcon, NoteIcon, PeopleIcon, PlaceIcon,
  TransferIcon, WalletIcon
} from 'components/Icons';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { DetailedTransaction } from 'pages/transactions/[transactionID]';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import {
  Checkbox, FormControlLabel, Grid, IconButton, Paper, TextField, Typography, useTheme
} from '@mui/material';

type TransactionFormProps = (
  { page: 'detail' | 'edit'; transaction: DetailedTransaction; } |
  { page: 'new'; transaction?: undefined; }
);

export default function TransactionForm({ page, transaction }: TransactionFormProps) {
  const theme = useTheme();
  const router = useRouter();

  if (!transaction) {
    return null;
  }

  return (
    <Paper sx={{ minHeight: '100vh' }}>
      <Grid container direction='column' >
        <Grid
          container
          sx={{
            height: 120,
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.common.white,
          }}
        >
          <Grid container sx={{ alignItems: 'center', padding: 1 }}>
            <BackButton title='Go back to transaction list' href='/' iconButtonProps={{ sx: { color: theme.palette.common.white } }} />
            <Typography variant='h6' sx={{ ml: 2, color: theme.palette.common.white }}>Transaction</Typography>
            {page === 'edit' ? (
              <IconButton
                title='Save'
                style={{ marginLeft: 'auto' }}
                onClick={() => router.push(`/transactions/${transaction.id}`)}
              >
                <SaveIcon htmlColor={theme.palette.common.white} />
              </IconButton>
            ) : (
              <>
                {transaction.transfer ? (
                  <Link
                    href='/transfers/[transferID]/edit'
                    as={`/transfers/${transaction.transfer.id}/edit`}
                    title='Edit'
                    style={{ marginLeft: 'auto' }}
                  >
                    <IconButton title='Open the transfer detail' >
                      <TransferIcon htmlColor={theme.palette.common.white} />
                    </IconButton>
                  </Link>
                ) : null}
                <Link
                  href='/transactions/[transactionID]/edit'
                  as={`/transactions/${transaction.id}/edit`}
                  title='Edit'
                  style={{ marginLeft: transaction.transfer ? undefined : 'auto' }}
                >
                  <IconButton title='Edit' >
                    <EditIcon htmlColor={theme.palette.common.white} />
                  </IconButton>
                </Link>
                <IconButton title='Delete'>
                  <DeleteIcon htmlColor={theme.palette.common.white} />
                </IconButton>
              </>
            )}
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
              currency={transaction.wallet.currency}
              color={theme.palette.common.white}
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
              value={transaction.category?.name ?? ''}
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
              value={transaction.wallet?.name ?? ''}
              sx={{
                minWidth: 268,
                flexGrow: 1
              }}
            />
          </Grid>
          {page === 'edit' || transaction.event ? (
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
                value={transaction.event?.name ?? ''}
                sx={{
                  minWidth: 268,
                  flexGrow: 1
                }}
              />
            </Grid>
          ) : null}
          {page === 'edit' || transaction.people && transaction.people.length > 0 ? ( // TODO: find People information for transaction
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
                value={transaction.people && transaction.people[0] ? transaction.people[0].name : ''}
                sx={{
                  minWidth: 268,
                  flexGrow: 1
                }}
              />
            </Grid>
          ) : null}
          {page === 'edit' || transaction.place ? (
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
                value={transaction.place?.name ?? ''}
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
            <FormControlLabel control={<Checkbox checked={transaction.countInTotal} disabled={page === 'detail'} />} label='Show in total wallet' />
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
};