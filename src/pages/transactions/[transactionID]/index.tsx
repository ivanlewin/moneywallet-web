import TransactionForm from 'components/transactions/TransactionForm';
import { DATETIME_FORMAT } from 'const';
import dayjs from 'dayjs';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import React from 'react';
import { Serialized } from 'types/core';

import {
  Category, Currency, Event, Person, Place, Transaction, Transfer, Wallet
} from '@prisma/client';

export interface DetailedTransaction extends Omit<Serialized<Transaction>, 'wallet' | 'event' | 'people' | 'place' | 'category'> {
  wallet: Pick<Wallet, 'id' | 'name'> & { currency: Pick<Currency, 'decimals' | 'iso' | 'symbol'>; };
  event: Pick<Event, 'id' | 'name'> | null;
  people: Pick<Person, 'id' | 'name'>[];
  place: Pick<Place, 'id' | 'name'> | null;
  category: Pick<Category, 'id' | 'name'>;
  transfer: Pick<Transfer, 'id' | 'fromID' | 'toID'> | null;
}

export const getServerSideProps: GetServerSideProps<{ transaction: DetailedTransaction | null; }> = async ({ params }) => {
  if (!params || !params.transactionID || typeof params.transactionID !== 'string') {
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

export default function TransactionDetail({ transaction }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  if (!transaction) {
    return null;
  }
  return (
    <TransactionForm page='detail' transaction={transaction} />
  );
};