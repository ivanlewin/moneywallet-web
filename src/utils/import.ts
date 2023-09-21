import { LegacyIconSchema, } from "schemas";
import { LegacyDatabase, LegacyCategory, LegacyDebt, LegacyRecurrentTransaction, LegacyTransaction } from "types/legacy-database";
import { User, Prisma, CategoryType, CategoryTag, DebtType, TransactionDirection, TransactionType } from "@prisma/client";
import prisma from "../../lib/prisma";
import { randomUUID } from "crypto";

interface IconData {
  iconResource: string;
  iconColor: string;
  iconName: string;
}

const parseIcon = (icon: string): IconData => {
  let iconResource = '';
  let iconColor = '';
  let iconName = '';
  const iconObject = JSON.parse(icon);
  const parsedIcon = LegacyIconSchema.parse(iconObject);
  if (parsedIcon.type === 'resource') {
    iconResource = parsedIcon.resource;
  } else {
    iconColor = parsedIcon.color;
    iconName = parsedIcon.name;
  }
  return { iconResource, iconColor, iconName };
};

/**
 * Maps legacy database values to MoneyWalletWeb values
 */
const categoryTypeMap: Record<LegacyCategory['type'], CategoryType> = {
  0: "EXPENSE",
  1: "INCOME",
  2: "SYSTEM",
};
/**
 * Maps legacy database values to MoneyWalletWeb values
 */
const categoryTagMap: Record<NonNullable<LegacyCategory['tag']>, CategoryTag> = {
  "system::transfer": "SYSTEM_TRANSFER",
  "system::transfer_tax": "SYSTEM_TRANSFER_TAX",
  "system::debt": "SYSTEM_DEBT",
  "system::credit": "SYSTEM_CREDIT",
  "system::paid_debt": "SYSTEM_PAID_DEBT",
  "system::paid_credit": "SYSTEM_PAID_CREDIT",
  "system::tax": "SYSTEM_TAX",
  "system::deposit": "SYSTEM_DEPOSIT",
  "system::withdraw": "SYSTEM_WITHDRAW",
  "default::sale": "DEFAULT_SALE",
  "default::car_expenses": "DEFAULT_CAR_EXPENSES",
  "default::technology": "DEFAULT_TECHNOLOGY",
  "default::hobby": "DEFAULT_HOBBY",
  "default::tip": "DEFAULT_TIP",
  "default::salary": "DEFAULT_SALARY",
  "default::travel": "DEFAULT_TRAVEL",
};
/**
 * Maps legacy database values to MoneyWalletWeb values
 */
const debtTypeMap: Record<LegacyDebt['type'], DebtType> = {
  0: "DEBT",
  1: "CREDIT",
};
/**
 * Maps legacy database values to MoneyWalletWeb values
 */
const recurrentTransactionDirectionMap: Record<LegacyRecurrentTransaction['direction'], TransactionDirection> = {
  0: "EXPENSE",
  1: "INCOME",
};
/**
 * Maps legacy database values to MoneyWalletWeb values
 */
const transactionDirectionMap: Record<LegacyTransaction['direction'], TransactionDirection> = {
  0: "EXPENSE",
  1: "INCOME",
};
/**
 * Maps legacy database values to MoneyWalletWeb values
 */
const transactionTypeMap: Record<LegacyTransaction['type'], TransactionType> = {
  0: "TRANSACTION",
  1: "TRANSFER",
  2: "DEBT",
  3: "UNKNOWN",
  4: "MODEL",
};

export const importLegacyDatabase = async (data: LegacyDatabase) => {
  let user: User;
  const existingUser = await prisma.user.findFirst();
  if (existingUser) {
    user = existingUser;
  } else {
    user = await prisma.user.create({ data: {} });
  }
  if (!user) {
    throw new Error('Failed to create user');
  }

  if (data.header.version_code !== 2) {
    throw new Error('Only databases of version 2 are supported.');
  }

  // TODO: remove this after testing
  await prisma.transferModel.deleteMany();
  await prisma.transfer.deleteMany();
  await prisma.transactionModel.deleteMany();
  await prisma.transaction.deleteMany();
  await prisma.recurrentTransaction.deleteMany();
  await prisma.debt.deleteMany();
  await prisma.event.deleteMany();
  await prisma.category.deleteMany();
  await prisma.wallet.deleteMany();
  await prisma.currency.deleteMany();

  // import currencies
  try {
    const currenciesData: Prisma.CurrencyCreateManyInput[] = data.currencies.map((currency) => ({
      iso: currency.iso,
      name: currency.name,
      symbol: currency.symbol,
      decimals: currency.decimals,
      favourite: currency.favourite,
      lastEdit: new Date(currency.last_edit),
      deleted: currency.deleted,
    }));
    await prisma.currency.createMany({ data: currenciesData });
  } catch (error) {
    // console.error(error);
  }

  // import wallets
  try {
    const walletsData: Prisma.WalletCreateManyInput[] = data.wallets.map((wallet) => {
      const walletData: Prisma.WalletCreateManyInput = {
        userID: user.id,
        name: wallet.name,
        currencyIso: wallet.currency,
        startMoney: wallet.start_money,
        countInTotal: wallet.count_in_total,
        archived: wallet.archived,
        id: wallet.id,
        index: wallet.index,
        lastEdit: new Date(wallet.last_edit),
        deleted: wallet.deleted,
      };
      let walletIcon: IconData | undefined = undefined;
      try {
        walletIcon = parseIcon(wallet.icon);
        return { ...walletData, ...walletIcon, };
      } catch (error) {
        console.error(`Failed to parse icon for Wallet ${wallet.id}. Wallet will be imported without icon`);
        return walletData;
      }
    });
    await prisma.wallet.createMany({ data: walletsData });
  } catch (error) {
    console.error(error);
  }

  const categoryIDMap: Record<LegacyCategory['id'], string> = {
    "system-uuid-system::transfer": "",
    "system-uuid-system::transfer_tax": "",
    "system-uuid-system::debt": "",
    "system-uuid-system::credit": "",
    "system-uuid-system::paid_debt": "",
    "system-uuid-system::paid_credit": "",
    "system-uuid-system::tax": "",
    "system-uuid-system::deposit": "",
    "system-uuid-system::withdraw": "",
  };

  // import categories
  try {
    const categoriesData: Prisma.CategoryCreateManyInput[] = data.categories.map((category) => {
      const categoryData: Prisma.CategoryCreateManyInput = {
        userID: user.id,
        name: category.name,
        type: categoryTypeMap[category.type],
        tag: category.tag ? categoryTagMap[category.tag] : undefined,
        showInReports: category.show_report,
        index: category.index,
        lastEdit: new Date(category.last_edit),
        deleted: category.deleted,
      };
      if (category.id in categoryIDMap && categoryIDMap[category.id] === '') {
        categoryIDMap[category.id] = randomUUID();
        categoryData.id = categoryIDMap[category.id];
      } else {
        categoryData.id = category.id;
      }

      let categoryIcon: IconData | undefined = undefined;
      try {
        categoryIcon = parseIcon(category.icon);
        return { ...categoryData, ...categoryIcon, };
      } catch (error) {
        console.error(`Failed to parse icon for Category ${category.id}. Category will be imported without icon`);
        return categoryData;
      }
    });
    await prisma.category.createMany({ data: categoriesData });
  } catch (error) {
    console.error(error);
  }

  // import events
  try {
    const eventsData: Prisma.EventCreateManyInput[] = data.events.map((event) => {
      const eventData: Prisma.EventCreateManyInput = {
        userID: user.id,
        name: event.name,
        note: event.note,
        startDate: new Date(event.start_date), // TODO: Allow passing custom timezone information
        endDate: new Date(event.end_date), // TODO: Allow passing custom timezone information
        id: event.id,
        lastEdit: new Date(event.last_edit),
        deleted: event.deleted,
      };
      let eventIcon: IconData | undefined = undefined;
      try {
        eventIcon = parseIcon(event.icon);
        return { ...eventData, ...eventIcon, };
      } catch (error) {
        console.error(`Failed to parse icon for Event ${event.id}. Event will be imported without icon`);
        return eventData;
      }
    });
    await prisma.event.createMany({ data: eventsData });
  } catch (error) {
    console.error(error);
  }

  // import debts
  try {
    const debtsData: Prisma.DebtCreateManyInput[] = data.debts.map((debt) => {
      const debtData: Prisma.DebtCreateManyInput = {
        userID: user.id,
        type: debtTypeMap[debt.type],
        description: debt.description,
        date: new Date(debt.date), // TODO: Allow passing custom timezone information
        walletID: debt.wallet,
        note: debt.note,
        money: debt.money,
        archived: debt.archived,
        id: debt.id,
        lastEdit: new Date(debt.last_edit),
        deleted: debt.deleted,
      };
      let debtIcon: IconData | undefined = undefined;
      try {
        debtIcon = parseIcon(debt.icon);
        return { ...debtData, ...debtIcon, };
      } catch (error) {
        console.error(`Failed to parse icon for Debt ${debt.id}. Debt will be imported without icon`);
        return debtData;
      }
    });
    await prisma.debt.createMany({ data: debtsData });
  } catch (error) {
    console.error(error);
  }

  // import recurrent transactions
  try {
    const recurrentTransactionsData: Prisma.RecurrentTransactionCreateManyInput[] = data.recurrent_transactions.map((recurrentTransaction) => ({
      money: recurrentTransaction.money,
      description: recurrentTransaction.description,
      category: recurrentTransaction.category,
      direction: recurrentTransactionDirectionMap[recurrentTransaction.direction],
      walletID: recurrentTransaction.wallet,
      note: recurrentTransaction.note,
      confirmed: recurrentTransaction.confirmed,
      countInTotal: recurrentTransaction.count_in_total,
      startDate: new Date(recurrentTransaction.start_date), // TODO: Allow passing custom timezone information
      lastOccurrence: new Date(recurrentTransaction.last_occurrence), // TODO: Allow passing custom timezone information
      nextOccurrence: new Date(recurrentTransaction.next_occurrence), // TODO: Allow passing custom timezone information
      rule: recurrentTransaction.rule,
      id: recurrentTransaction.id,
      lastEdit: new Date(recurrentTransaction.last_edit),
      deleted: recurrentTransaction.deleted,
    }));
    await prisma.recurrentTransaction.createMany({ data: recurrentTransactionsData });
  } catch (error) {
    console.error(error);
  }

  // import transactions
  try {
    const transactionsData: Prisma.TransactionCreateManyInput[] = data.transactions.map((transaction) => ({
      money: transaction.money,
      date: new Date(transaction.date.replaceAll(' ', 'T')), // TODO: Allow passing custom timezone information
      description: transaction.description,
      categoryID: transaction.category in categoryIDMap ? categoryIDMap[transaction.category] : transaction.category,
      direction: transactionDirectionMap[transaction.direction],
      type: transactionTypeMap[transaction.type],
      walletID: transaction.wallet,
      note: transaction.note,
      confirmed: transaction.confirmed,
      countInTotal: transaction.count_in_total,
      id: transaction.id,
      lastEdit: new Date(transaction.last_edit),
      deleted: transaction.deleted,
    }));
    await prisma.transaction.createMany({ data: transactionsData });
  } catch (error) {
    console.error(error);
  }

  // import transaction models
  try {
    const transactionModelsData: Prisma.TransactionModelCreateManyInput[] = data.transaction_models.map((transactionModel) => ({
      money: transactionModel.money,
      description: transactionModel.description,
      category: transactionModel.category,
      direction: transactionDirectionMap[transactionModel.direction],
      walletID: transactionModel.wallet,
      note: transactionModel.note,
      confirmed: transactionModel.confirmed,
      countInTotal: transactionModel.count_in_total,
      id: transactionModel.id,
      lastEdit: new Date(transactionModel.last_edit),
      deleted: transactionModel.deleted,
    }));
    await prisma.transactionModel.createMany({ data: transactionModelsData });
  } catch (error) {
    console.error(error);
  }

  // import transfers
  try {
    const transfersData: Prisma.TransferCreateManyInput[] = data.transfers.map((transfer) => ({
      description: transfer.description,
      date: new Date(transfer.date.replaceAll(' ', 'T')), // TODO: Allow passing custom timezone information
      fromID: transfer.from,
      toID: transfer.to,
      note: transfer.note,
      confirmed: transfer.confirmed,
      countInTotal: transfer.count_in_total,
      id: transfer.id,
      lastEdit: new Date(transfer.last_edit),
      deleted: transfer.deleted,
    }));
    await prisma.transfer.createMany({ data: transfersData });
  } catch (error) {
    console.error(error);
  }

  return user;
};