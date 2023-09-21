import TransactionForm from 'components/transactions/TransactionForm';
import { DATETIME_FORMAT } from 'const';
import dayjs from 'dayjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { DetailedTransaction } from './';

export const getServerSideProps: GetServerSideProps<{ transaction: DetailedTransaction | null; }> = async ({ params }) => {
  if (!params || typeof params.transactionID !== 'string') {
    return { props: { transaction: null } };
  }
  const transactionID = params.transactionID;
  const transaction = await prisma.transaction.findFirstOrThrow({
    where: { id: transactionID },
    include: {
      wallet: {
        select: {
          id: true,
          name: true,
          currency: { select: { decimals: true, iso: true, symbol: true, } }
        }
      },
      event: { select: { id: true, name: true, } },
      people: { select: { id: true, name: true, } },
      place: { select: { id: true, name: true, } }
    }
  });
  const category = await prisma.category.findFirstOrThrow({
    where: { id: transaction.categoryID },
    select: { id: true, name: true, }
  });
  const transfer = await prisma.transfer.findFirst({
    where: {
      OR: [
        { fromID: transaction.id },
        { toID: transaction.id },
      ]
    },
    select: {
      id: true,
      fromID: true,
      toID: true,
    }
  });
  return {
    props: {
      transaction: {
        ...transaction,
        date: dayjs(transaction.date).format(DATETIME_FORMAT),
        lastEdit: dayjs(transaction.lastEdit).format(DATETIME_FORMAT),
        category,
        transfer
      }
    }
  };
};

export default function EditTransaction({ transaction }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!transaction) {
    return null;
  }

  return (
    <TransactionForm page='edit' transaction={transaction} />
  );
};
