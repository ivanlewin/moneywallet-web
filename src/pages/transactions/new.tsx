import TransactionForm from 'components/transactions/TransactionForm';
import React from 'react';

export default function TransactionDetail() {
  const createTransaction = async () => {
    try {

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TransactionForm
      page='new'
      onSubmit={() => {

      }}
    />
  );
};