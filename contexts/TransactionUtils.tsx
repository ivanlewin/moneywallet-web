import { createContext, ReactNode, useCallback, useContext, useMemo } from 'react';
import { CompleteTransaction } from 'types';
import { Category, Currency, Transaction, Wallet, Event, Person, Place } from 'types/database';
import { useDatabase } from './DatabaseContext';

type TransactionUtilsValue = {
  getTransaction: (transactionID: string) => Transaction | undefined;
  getTransactionCategory: (transactionCategoryID: string) => Category | undefined;
  getTransactionWallet: (transactionWalletID: string) => Wallet | undefined;
  getTransactionCurrency: (walletCurrencyCode: string) => Currency | undefined;
  getTransactionEvent: (transactionEventID: string) => Event | undefined;
  getTransactionPeople: (transactionID: string) => Person[] | undefined;
  getTransactionPlace: (transactionPlaceID: string) => Place | undefined;
  getCompleteTransaction: (transactionID: string) => CompleteTransaction | undefined;
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

  const getTransaction = useCallback((transactionID: string) => {
    if (!transactions) {
      return;
    }
    return transactions.find(transaction => transaction.id === transactionID);
  }, [transactions]);

  const getTransactionCategory = useCallback((transactionCategoryID: string) => {
    if (!categories) {
      return;
    }
    return categories.find(category => category.id === transactionCategoryID);
  }, [categories]);

  const getTransactionWallet = useCallback((transactionWalletID: string) => {
    if (!wallets) {
      return;
    }
    return wallets.find(wallet => wallet.id === transactionWalletID);
  }, [wallets]);

  const getTransactionCurrency = useCallback((walletCurrencyCode: string) => {
    if (!currencies) {
      return;
    }
    return currencies.find(currencies => currencies.iso === walletCurrencyCode);
  }, [currencies]);

  const getTransactionEvent = useCallback((transactionEventID: string) => {
    if (!events) {
      return;
    }
    return events.find(event => event.id === transactionEventID);
  }, [events]);

  const getTransactionPeople = useCallback((transactionID: string) => {
    if (!transaction_people || !people) {
      return;
    }
    const transactionPeople = transaction_people.filter(transactionPeople => transactionPeople.transaction === transactionID);
    const personIDs = transactionPeople.map(transactionPerson => transactionPerson.person);
    const completePeople = personIDs.map(personID => people.find(person => person.id === personID)).filter(person => person !== undefined);
    return completePeople as Person[];
  }, [transaction_people]);

  const getTransactionPlace = useCallback((transactionPlaceID: string) => {
    if (!places) {
      return;
    }
    return places.find(place => place.id === transactionPlaceID);
  }, [places]);

  const getCompleteTransaction = useCallback((transactionID: string) => {
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
  }, [getTransaction, getTransactionCategory, getTransactionWallet, getTransactionCurrency, getTransactionEvent, getTransactionPlace, getTransactionPeople]);

  const value = useMemo(() => ({
    getTransaction,
    getTransactionCategory,
    getTransactionWallet,
    getTransactionCurrency,
    getTransactionEvent,
    getTransactionPeople,
    getTransactionPlace,
    getCompleteTransaction
  } as TransactionUtilsValue), [getTransaction, getTransactionCategory, getTransactionWallet, getTransactionCurrency, getTransactionEvent, getTransactionPeople, getTransactionPlace, getCompleteTransaction]);

  return (
    <TransactionUtils.Provider value={value}>
      {children}
    </TransactionUtils.Provider>
  );
};

export default TransactionUtilsProvider;
