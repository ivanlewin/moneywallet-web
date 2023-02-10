import { NextPage } from 'next';
import { useRouter } from 'next/router';

import TransactionForm from 'components/Transactions/TransactionDetail';
import { useTransactionUtils } from 'contexts/TransactionUtils';

const TransactionDetail: NextPage = () => {
  const router = useRouter();
  const transactionID = router.query.transactionID as string;

  const { getCompleteTransaction } = useTransactionUtils();
  const transaction = getCompleteTransaction(transactionID);
  if (!transaction) {
    return null;
  }

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
    />
  );
};

export default TransactionDetail;