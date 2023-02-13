import { NextPage } from 'next';
import { useRouter } from 'next/router';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import TransactionForm from 'components/Transactions/TransactionForm';
import { useTransactionUtils } from 'contexts/TransactionUtils';
import Link from 'next/link';
import { useTransferUtils } from 'contexts/TransferUtils';
import React from 'react';
import { TransferIcon } from 'components/Icons';

const TransactionDetail: NextPage = () => {
  const router = useRouter();
  const transactionID = router.query.transactionID as string;

  const { getCompleteTransaction } = useTransactionUtils();
  const { getTransferByTransaction } = useTransferUtils();
  const transaction = getCompleteTransaction(transactionID);

  const transfer = React.useMemo(() => {
    if (!transaction) { return; }
    const isTransfer = transaction?.category?.id === 'system-uuid-system::transfer' || transaction?.category?.id === 'system-uuid-system::transfer_tax';
    if (!isTransfer) { return; }
    return getTransferByTransaction(transaction.id, transaction.direction);
  }, [getTransferByTransaction, transaction]);
  if (!transaction) {
    return null;
  }

  const actions = (
    <>
      {transfer ? (
        <Link
          href='/transfers/[transferID]/edit'
          as={`/transfers/${transfer.id}/edit`}
          title='Edit'
          style={{ marginLeft: 'auto' }}
        >
          <IconButton title='Open the transfer detail' >
            <TransferIcon htmlColor='white' />
          </IconButton>
        </Link>
      ) : null}
      <Link
        href='/transactions/[transactionID]/edit'
        as={`/transactions/${transaction.id}/edit`}
        title='Edit'
        style={{ marginLeft: transfer ? undefined : 'auto' }}
      >
        <IconButton title='Edit' >
          <EditIcon htmlColor='white' />
        </IconButton>
      </Link>
      <IconButton title='Delete' >
        <DeleteIcon htmlColor='white' />
      </IconButton>
    </>
  );

  return (
    <TransactionForm
      page='detail'
      transaction={transaction}
      transactionCategory={transaction.category}
      transactionCurrency={transaction.currency}
      transactionWallet={transaction.wallet}
      transactionEvent={transaction.event}
      transactionPeople={transaction.people}
      transactionPlace={transaction.place}
      actions={actions}
    />
  );
};

export default TransactionDetail;