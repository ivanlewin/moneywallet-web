import { Category, Currency, Event, Person, Place, Transaction, Wallet } from './database';

export type CompleteTransaction = Omit<Transaction, 'category' | 'wallet' | 'currency' | 'event' | 'place' | 'people'> & {
  category: Category;
  wallet: Wallet;
  currency: Currency;
  event: Event;
  place: Place;
  people: Person[];
};

export { };