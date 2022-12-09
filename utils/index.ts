import { Transaction, Wallet } from "types";

export function isLocalStorageAvailable() {
  return (
    Boolean(
      window.localStorage &&
      typeof window.localStorage.getItem === 'function' &&
      typeof window.localStorage.setItem === 'function'
    )
  );
}

export function signAmount(amount: number, direction: number) {
  return amount * (direction === 0 ? -1 : 1);
}

export function calculateBalance(transactions: Transaction[], walletID?: Wallet['id']) {
  return transactions
    .filter(transaction => (
      transaction.confirmed === true &&
      transaction.count_in_total === true &&
      transaction.deleted === false &&
      (walletID ? transaction.wallet === walletID : true)
    ))
    .reduce((acc, { money, direction }) => (
      acc + signAmount(money, direction)
    ), 0);
}

export function calculateBalancesForTheDay(transactions: Transaction[]) {
  const currencies = transactions.map(transaction => transaction.wallet);
  return transactions
    .filter(transaction => (
      transaction.confirmed === true &&
      transaction.count_in_total === true &&
      transaction.deleted === false
    ))
    .reduce((acc, { money, direction }) => (
      acc + signAmount(money, direction)
    ), 0);
}