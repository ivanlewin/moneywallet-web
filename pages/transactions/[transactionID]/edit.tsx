import { NextPage } from 'next';
import { useRouter } from 'next/router';

import SaveIcon from '@mui/icons-material/Save';
import { IconButton } from '@mui/material';
import TransactionForm from 'components/Transactions/TransactionForm';
import { useTransactionUtils } from 'contexts/TransactionUtils';
import Link from 'next/link';

const TransactionDetail: NextPage = () => {
  const router = useRouter();
  const transactionID = router.query.transactionID as string;

  const { getCompleteTransaction } = useTransactionUtils();
  const transaction = getCompleteTransaction(transactionID);
  if (!transaction) {
    return null;
  }

  const actions = (
    <Link
      href='/transactions/[transactionID]'
      as={`/transactions/${transaction.id}`}
      title='Save'
      style={{ marginLeft: 'auto' }}
    >
      <IconButton title='Save' >
        <SaveIcon htmlColor='white' />
      </IconButton>
    </Link>
  );

  return (
    <TransactionForm
      page='edit'
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