import {
  LegacyCategory, LegacyCurrency, LegacyEvent, LegacyPerson, LegacyPlace, LegacyTransaction,
  LegacyTransfer, LegacyWallet
} from './legacy-database';

export type CompleteTransaction = Omit<LegacyTransaction, 'category' | 'wallet' | 'currency' | 'event' | 'place' | 'people'> & {
  category?: LegacyCategory;
  wallet?: LegacyWallet;
  currency?: LegacyCurrency;
  event?: LegacyEvent;
  place?: LegacyPlace;
  people?: LegacyPerson[];
};

export type CompleteTransfer = Omit<LegacyTransfer, 'from' | 'to'> & {
  from?: LegacyTransaction;
  to?: LegacyTransaction;
  money?: number;
};

export type Prettify<T> = {
  [K in keyof T]: T[K];
} & {};