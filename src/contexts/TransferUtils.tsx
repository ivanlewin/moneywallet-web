import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { CompleteTransfer } from 'types';
import { Transaction, Transfer } from '@prisma/client';
import { useDatabase } from './DatabaseContext';
import { useTransactionUtils } from './TransactionUtils';

type TransferUtilsValue = {
  getTransfer: (transferID: Transfer['id']) => Transfer | undefined;
  getTransferByTransaction: (transactionID: Transaction['id'], transactionDirection: Transaction['direction']) => Transfer | undefined;
  getCompleteTransfer: (transferID: Transfer['id']) => CompleteTransfer | undefined;
};

const TransferUtils = createContext<TransferUtilsValue>({
  getTransfer: () => { return undefined; },
  getTransferByTransaction: () => { return undefined; },
  getCompleteTransfer: () => { return undefined; },
});

export const useTransferUtils = () => useContext(TransferUtils);

type TransferUtilsProviderProps = {
  children: ReactNode;
};
const TransferUtilsProvider = ({ children }: TransferUtilsProviderProps) => {
  const { database } = useDatabase();
  const { getTransaction } = useTransactionUtils();

  const {
    transfers
  } = database;

  const getTransfer = useCallback<TransferUtilsValue['getTransfer']>((transferID) => {
    if (!transfers) {
      return;
    }
    return transfers.find(transfer => transfer.id === transferID);
  }, [transfers]);

  const getTransferByTransaction = useCallback<TransferUtilsValue['getTransferByTransaction']>((transactionID, transactionDirection) => {
    if (!transfers) {
      return;
    }
    if (transactionDirection === 'EXPENSE') {
      return transfers.find(transfer => transfer.from === transactionID);
    } else {
      return transfers.find(transfer => transfer.to === transactionID);
    }
  }, [transfers]);

  const getCompleteTransfer = useCallback<TransferUtilsValue['getCompleteTransfer']>((transferID) => {
    const transfer = getTransfer(transferID);
    if (!transfer) {
      return;
    }
    const from = getTransaction(transfer.fromID);
    const to = getTransaction(transfer.toID);
    if (!from || !to) {
      return;
    }

    const money = from.money === to.money ? from.money : undefined;

    return {
      ...transfer,
      from,
      to,
      money
    };
  }, [getTransfer, getTransaction]);

  const value = useMemo(() => ({
    getTransfer,
    getTransferByTransaction,
    getCompleteTransfer,
  }), [getTransfer, getTransferByTransaction, getCompleteTransfer]);

  return (
    <TransferUtils.Provider value={value}>
      {children}
    </TransferUtils.Provider>
  );
};

export default TransferUtilsProvider;
