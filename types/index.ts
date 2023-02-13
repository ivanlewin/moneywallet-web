import { Category, Currency, Event, Person, Place, Transaction, Transfer, Wallet } from './database';

export type CompleteTransaction = Omit<Transaction, 'category' | 'wallet' | 'currency' | 'event' | 'place' | 'people'> & {
  category?: Category;
  wallet?: Wallet;
  currency?: Currency;
  event?: Event;
  place?: Place;
  people?: Person[];
};

export type CompleteTransfer = Omit<Transfer, 'from' | 'to'> & {
  from?: Transaction;
  to?: Transaction;
  money?: number;
};

export { };