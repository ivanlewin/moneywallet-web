import { Transaction, TransactionDirection, Wallet } from '@prisma/client';

export function isLocalStorageAvailable() {
  return (
    Boolean(
      window.localStorage &&
      typeof window.localStorage.getItem === 'function' &&
      typeof window.localStorage.setItem === 'function'
    )
  );
}

export function signAmount(amount: number, direction?: TransactionDirection) {
  return amount * (direction === 'EXPENSE' ? -1 : 1);
}

type calculateBalanceTransaction = Pick<Transaction, 'confirmed' | 'countInTotal' | 'deleted' | 'walletID' | 'money' | 'direction'>;
type calculateBalanceWallet = Pick<Wallet, 'id' | 'startMoney'>;
export function calculateBalance(transactions: calculateBalanceTransaction[], wallet?: calculateBalanceWallet) {
  return transactions
    .filter(transaction => (
      transaction.confirmed === true &&
      transaction.countInTotal === true &&
      transaction.deleted === false &&
      (wallet ? transaction.walletID === wallet.id : true)
    ))
    .reduce((acc, { money, direction }) => (
      acc + signAmount(money, direction)
    ), 0)
    + (wallet?.startMoney ?? 0);
}

export function calculateBalancesForTheDay(transactions: calculateBalanceTransaction[]) {
  return transactions
    .filter(transaction => (
      transaction.confirmed === true &&
      transaction.countInTotal === true &&
      transaction.deleted === false
    ))
    .reduce((acc, { money, direction }) => (
      acc + signAmount(money, direction)
    ), 0);
}