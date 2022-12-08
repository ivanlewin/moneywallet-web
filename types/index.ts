import { z } from 'zod';
import { Date, Datetime } from './datetime';

const Currency = z.object({
  iso: z.string().length(3), // ISO 4217,
  name: z.string(),
  symbol: z.string(),
  decimals: z.number().int().min(0).max(8),
  favourite: z.boolean(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type Currency = z.infer<typeof Currency>;

const Icon = z.union([
  z.object({
    type: z.literal('color'),
    color: z.string().regex(/^#(?:[0-9a-fA-F]{3}){1,2}$/),
    name: z.string(),
  }),
  z.object({
    type: z.literal('resource'),
    resource: z.string()
  })
]);
export type Icon = z.infer<typeof Icon>;

const Wallet = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  currency: z.string(), // Currency['symbol']
  start_money: z.number(),
  count_in_total: z.boolean(),
  archived: z.boolean(),
  id: z.string().uuid(),
  index: z.number(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type Wallet = z.infer<typeof Wallet>;

const CategoryType = z.union([
  z.literal(0), // Income
  z.literal(1), // Expense
  z.literal(2) // System
]);
const CategoryTag = z.union([
  z.literal("system::transfer"),
  z.literal("system::transfer_tax"),
  z.literal("system::debt"),
  z.literal("system::credit"),
  z.literal("system::paid_debt"),
  z.literal("system::paid_credit"),
  z.literal("system::tax"),
  z.literal("system::deposit"),
  z.literal("system::withdraw"),
  z.literal("default::sale"),
  z.literal("default::car_expenses"),
  z.literal("default::technology"),
  z.literal("default::hobby"),
  z.literal("default::tip"),
  z.literal("default::salary"),
  z.literal("default::travel"),
]);
const CategoryID = z.union([
  z.string().uuid(),
  z.literal("system-uuid-system::transfer"),
  z.literal("system-uuid-system::transfer_tax"),
  z.literal("system-uuid-system::debt"),
  z.literal("system-uuid-system::credit"),
  z.literal("system-uuid-system::paid_debt"),
  z.literal("system-uuid-system::paid_credit"),
  z.literal("system-uuid-system::tax"),
  z.literal("system-uuid-system::deposit"),
  z.literal("system-uuid-system::withdraw"),
]);
const Category = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  type: CategoryType,
  parent: z.string().uuid().optional(),
  tag: CategoryTag.optional(),
  show_report: z.boolean(),
  index: z.number(),
  id: CategoryID,
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type Category = z.infer<typeof Category>;

const Event = z.any();
export type Event = z.infer<typeof Event>;

const Place = z.any();
export type Place = z.infer<typeof Place>;

const Person = z.any();
export type Person = z.infer<typeof Person>;

const EventPerson = z.any();
export type EventPerson = z.infer<typeof EventPerson>;

const DebtType = z.literal(0);
const Debt = z.object({
  type: DebtType,
  icon: z.string(), // Icon
  description: z.string(),
  date: Date,
  wallet: z.string().uuid(),
  note: z.string(),
  money: z.number(),
  archived: z.boolean(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type Debt = z.infer<typeof Debt>;

const DebtPerson = z.any();
export type DebtPerson = z.infer<typeof DebtPerson>;

const Budget = z.any();
export type Budget = z.infer<typeof Budget>;

const BudgetWallet = z.any();
export type BudgetWallet = z.infer<typeof BudgetWallet>;

const Savings = z.any();
export type Savings = z.infer<typeof Savings>;

const RecurrentTransfer = z.any();
export type RecurrentTransfer = z.infer<typeof RecurrentTransfer>;

const TransactionCategory = z.union([
  z.string().uuid(),
  z.literal("system-uuid-system::debt"),
  z.literal("system-uuid-system::paid_debt"),
  z.literal("system-uuid-system::transfer"),
  z.literal("system-uuid-system::transfer_tax"),
]);
const TransactionDirection = z.union([
  z.literal(0),
  z.literal(1),
]);
const TransactionType = z.union([
  z.literal(0), // 
  z.literal(1), // 
  z.literal(2), // 
  z.literal(3), // 
  z.literal(4), // 
]);
const Transaction = z.object({
  money: z.number(),
  date: Datetime,
  description: z.string(),
  category: TransactionCategory,
  direction: TransactionDirection,
  type: TransactionType,
  wallet: z.string().uuid(),
  note: z.string(),
  confirmed: z.boolean(),
  count_in_total: z.boolean(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
  debt: z.string().uuid().optional(),
  recurrence: z.string().uuid().optional(),
});
export type Transaction = z.infer<typeof Transaction>;

const RecurrentTransaction = Transaction.pick({
  money: true,
  description: true,
  category: true,
  direction: true,
  wallet: true,
  note: true,
  confirmed: true,
  count_in_total: true,
}).extend({
  start_date: Date,
  last_occurrence: Date,
  next_occurrence: Date,
  rule: z.string(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type RecurrentTransaction = z.infer<typeof RecurrentTransaction>;

const TransactionPerson = z.any();
export type TransactionPerson = z.infer<typeof TransactionPerson>;

const TransactionModel = Transaction.pick({
  money: true,
  description: true,
  category: true,
  direction: true,
  wallet: true,
  note: true,
  confirmed: true,
  count_in_total: true,
}).extend({
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type TransactionModel = z.infer<typeof TransactionModel>;

const Transfer = z.object({
  description: z.string(),
  date: Datetime,
  from: z.string().uuid(),
  to: z.string().uuid(),
  note: z.string(),
  confirmed: z.boolean(),
  count_in_total: z.boolean(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type Transfer = z.infer<typeof Transfer>;

const TransferPerson = z.any();
export type TransferPerson = z.infer<typeof TransferPerson>;

const TransferModel = Transfer.pick({
  description: true,
  note: true,
  confirmed: true,
  count_in_total: true,
}).extend({
  from_wallet: z.string().uuid(),
  to_wallet: z.string().uuid(),
  from_money: z.number(),
  to_money: z.number(),
  tax_money: z.number(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});
export type TransferModel = z.infer<typeof TransferModel>;

const Attachment = z.any();
export type Attachment = z.infer<typeof Attachment>;

const TransactionAttachment = z.any();
export type TransactionAttachment = z.infer<typeof TransactionAttachment>;

const TransferAttachment = z.any();
export type TransferAttachment = z.infer<typeof TransferAttachment>;

const Database = z.object({
  header: z.object({
    version_code: z.number()
  }),
  currencies: z.array(Currency),
  wallets: z.array(Wallet),
  categories: z.array(Category),
  events: z.array(Event),
  places: z.array(Place),
  people: z.array(Person),
  event_people: z.array(EventPerson),
  debts: z.array(Debt),
  debt_people: z.array(DebtPerson),
  budgets: z.array(Budget),
  budget_wallets: z.array(BudgetWallet),
  savings: z.array(Savings),
  recurrent_transactions: z.array(RecurrentTransaction),
  recurrent_transfers: z.array(RecurrentTransfer),
  transactions: z.array(Transaction),
  transaction_people: z.array(TransactionPerson),
  transaction_models: z.array(TransactionModel),
  transfers: z.array(Transfer),
  transfer_people: z.array(TransferPerson),
  transfer_models: z.array(TransferModel),
  attachments: z.array(Attachment),
  transaction_attachments: z.array(TransactionAttachment),
  transfer_attachments: z.array(TransferAttachment),
});
export type Database = z.infer<typeof Database>;