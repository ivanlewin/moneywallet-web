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

export function calculateBalance(walletID: Wallet['id'], transactions: Transaction[]) {
  return transactions
    .filter(transaction => (
      transaction.confirmed === true &&
      transaction.count_in_total === true &&
      transaction.deleted === false &&
      transaction.wallet === walletID
    ))
    .reduce((acc, { money, direction }) => (
      acc + (money * (direction === 0 ? -1 : 1))
    ), 0);
}