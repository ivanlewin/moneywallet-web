import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { CompleteTransaction } from 'types';
import { Category, Currency, Transaction, Wallet, Event, Person, Place } from '@prisma/client';
import { useDatabase } from './DatabaseContext';

type TransactionUtilsValue = {
  getTransaction: (transactionID: Transaction['id']) => Transaction | undefined;
  getTransactionCategory: (transactionCategoryID: Transaction['category']) => Category | undefined;
  getTransactionWallet: (transactionWalletID: Transaction['walletID']) => Wallet | undefined;
  getTransactionCurrency: (walletCurrencyCode: Wallet['currencyIso']) => Currency | undefined;
  getTransactionEvent: (transactionEventID: Transaction['eventID']) => Event | undefined;
  getTransactionPeople: (transactionID: Transaction['id']) => Person[] | undefined;
  getTransactionPlace: (transactionPlaceID: Transaction['placeID']) => Place | undefined;
  getCompleteTransaction: (transactionID: Transaction['id']) => CompleteTransaction | undefined;
};

const TransactionUtils = createContext<TransactionUtilsValue>({
  getTransaction: () => { return undefined; },
  getTransactionCategory: () => { return undefined; },
  getTransactionWallet: () => { return undefined; },
  getTransactionCurrency: () => { return undefined; },
  getTransactionEvent: () => { return undefined; },
  getTransactionPeople: () => { return undefined; },
  getTransactionPlace: () => { return undefined; },
  getCompleteTransaction: () => { return undefined; },
});

export const useTransactionUtils = () => useContext(TransactionUtils);

type TransactionUtilsProviderProps = {
  children: ReactNode;
};
const TransactionUtilsProvider = ({ children }: TransactionUtilsProviderProps) => {
  const { database } = useDatabase();

  const {
    categories,
    currencies,
    events,
    places,
    transaction_people,
    transactions,
    wallets,
    people
  } = database;

  const getTransaction = useCallback<TransactionUtilsValue['getTransaction']>((transactionID) => {
    if (!transactions) {
      return;
    }
    return transactions.find(transaction => transaction.id === transactionID);
  }, [transactions]);

  const getTransactionCategory = useCallback<TransactionUtilsValue['getTransactionCategory']>((transactionCategoryID) => {
    if (!categories) {
      return;
    }
    return categories.find(category => category.id === transactionCategoryID);
  }, [categories]);

  const getTransactionWallet = useCallback<TransactionUtilsValue['getTransactionWallet']>((transactionWalletID) => {
    if (!wallets) {
      return;
    }
    return wallets.find(wallet => wallet.id === transactionWalletID);
  }, [wallets]);

  const getTransactionCurrency = useCallback<TransactionUtilsValue['getTransactionCurrency']>((walletCurrencyCode) => {
    if (!currencies) {
      return;
    }
    return currencies.find(currencies => currencies.iso === walletCurrencyCode);
  }, [currencies]);

  const getTransactionEvent = useCallback<TransactionUtilsValue['getTransactionEvent']>((transactionEventID) => {
    if (!events) {
      return;
    }
    return events.find(event => event.id === transactionEventID);
  }, [events]);

  const getTransactionPeople = useCallback<TransactionUtilsValue['getTransactionPeople']>((transactionID) => {
    if (!transaction_people || !people) {
      return;
    }
    const transactionPeople = transaction_people.filter(transactionPeople => transactionPeople.transaction === transactionID);
    const personIDs = transactionPeople.map(transactionPerson => transactionPerson.person);
    const completePeople = personIDs.map(personID => people.find(person => person.id === personID)).filter(person => person !== undefined);
    return completePeople as Person[];
  }, [transaction_people, people]);

  const getTransactionPlace = useCallback<TransactionUtilsValue['getTransactionPlace']>((transactionPlaceID) => {
    if (!places) {
      return;
    }
    return places.find(place => place.id === transactionPlaceID);
  }, [places]);

  const getCompleteTransaction = useCallback<TransactionUtilsValue['getCompleteTransaction']>((transactionID) => {
    const transaction = getTransaction(transactionID);
    if (!transaction) {
      return;
    }
    const category = getTransactionCategory(transaction.category);
    const wallet = getTransactionWallet(transaction.wallet);
    const currency = wallet?.currency ? getTransactionCurrency(wallet.currency) : undefined;
    const event = transaction.event ? getTransactionEvent(transaction.event) : undefined;
    const place = transaction.place ? getTransactionPlace(transaction.place) : undefined;
    const people = getTransactionPeople(transactionID);

    return {
      ...transaction,
      category,
      wallet,
      currency,
      event,
      place,
      people
    };
  }, [
    getTransaction,
    getTransactionCategory,
    getTransactionWallet,
    getTransactionCurrency,
    getTransactionEvent,
    getTransactionPlace,
    getTransactionPeople
  ]);

  const value = useMemo(() => ({
    getTransaction,
    getTransactionCategory,
    getTransactionWallet,
    getTransactionCurrency,
    getTransactionEvent,
    getTransactionPeople,
    getTransactionPlace,
    getCompleteTransaction
  }), [
    getTransaction,
    getTransactionCategory,
    getTransactionWallet,
    getTransactionCurrency,
    getTransactionEvent,
    getTransactionPeople,
    getTransactionPlace,
    getCompleteTransaction
  ]);

  return (
    <TransactionUtils.Provider value={value}>
      {children}
    </TransactionUtils.Provider>
  );
};

export default TransactionUtilsProvider;
