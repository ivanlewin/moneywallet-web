import { z } from 'zod';
import { DateSchema, DatetimeSchema } from './datetime';

export const CurrencySchema = z.object({
  iso: z.string().length(3), // ISO 4217,
  name: z.string(),
  symbol: z.string().optional(),
  decimals: z.number().int().min(0).max(8),
  favourite: z.boolean(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const IconSchema = z.union([
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

export const WalletSchema = z.object({
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

export const CategoryTypeSchema = z.union([
  z.literal(0), // Income
  z.literal(1), // Expense
  z.literal(2) // System
]);
export const CategoryTagSchema = z.union([
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
export const CategoryIDSchema = z.union([
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
export const CategorySchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  type: CategoryTypeSchema,
  parent: z.string().uuid().optional(),
  tag: CategoryTagSchema.optional(),
  show_report: z.boolean(),
  index: z.number(),
  id: CategoryIDSchema,
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const EventSchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  note: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const PlaceSchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const PersonSchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  note: z.string().optional(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const EventPersonSchema = z.any();

export const DebtTypeSchema = z.literal(0);
export const DebtSchema = z.object({
  type: DebtTypeSchema,
  icon: z.string(), // Icon
  description: z.string(),
  date: DateSchema,
  wallet: z.string().uuid(),
  note: z.string(),
  money: z.number(),
  archived: z.boolean(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const DebtPersonSchema = z.any();

export const BudgetSchema = z.any();

export const BudgetWalletSchema = z.any();

export const SavingsSchema = z.any();

export const RecurrentTransferSchema = z.any();

export const TransactionCategorySchema = z.union([
  z.string().uuid(),
  z.literal("system-uuid-system::debt"),
  z.literal("system-uuid-system::paid_debt"),
  z.literal("system-uuid-system::transfer"),
  z.literal("system-uuid-system::transfer_tax"),
]);
export const TransactionDirectionSchema = z.union([
  z.literal(0), // expense
  z.literal(1), // income
]);
export const TransactionTypeSchema = z.union([
  z.literal(0), // 
  z.literal(1), // 
  z.literal(2), // 
  z.literal(3), // 
  z.literal(4), // 
]);
export const TransactionSchema = z.object({
  money: z.number(),
  date: DatetimeSchema,
  description: z.string(),
  category: TransactionCategorySchema,
  direction: TransactionDirectionSchema,
  type: TransactionTypeSchema,
  wallet: z.string().uuid(),
  place: z.string().optional(),
  note: z.string().optional(),
  event: z.string().optional(),
  confirmed: z.boolean(),
  count_in_total: z.boolean(),
  id: z.string(), // uuid but could have a date appended to the end
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
  debt: z.string().uuid().optional(),
  recurrence: z.string().uuid().optional(),
});

export const RecurrentTransactionSchema = TransactionSchema.pick({
  money: true,
  description: true,
  category: true,
  direction: true,
  wallet: true,
  note: true,
  confirmed: true,
  count_in_total: true,
}).extend({
  start_date: DateSchema,
  last_occurrence: DateSchema,
  next_occurrence: DateSchema,
  rule: z.string(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const TransactionPersonSchema = z.object({
  transaction: z.string().uuid(),
  person: z.string().uuid(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const TransactionModelSchema = TransactionSchema.pick({
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

export const TransferSchema = z.object({
  description: z.string(),
  date: DatetimeSchema,
  from: z.string().uuid(),
  to: z.string().uuid(),
  note: z.string(),
  confirmed: z.boolean(),
  count_in_total: z.boolean(),
  id: z.string(), // uuid but could have a date appended to the end
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const TransferPersonSchema = z.any();

export const TransferModelSchema = TransferSchema.pick({
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

export const AttachmentSchema = z.any();

export const TransactionAttachmentSchema = z.any();

export const TransferAttachmentSchema = z.any();

export const DatabaseSchema = z.object({
  header: z.object({
    version_code: z.number()
  }),
  currencies: z.array(CurrencySchema),
  wallets: z.array(WalletSchema),
  categories: z.array(CategorySchema),
  events: z.array(EventSchema),
  places: z.array(PlaceSchema),
  people: z.array(PersonSchema),
  event_people: z.array(EventPersonSchema),
  debts: z.array(DebtSchema),
  debt_people: z.array(DebtPersonSchema),
  budgets: z.array(BudgetSchema),
  budget_wallets: z.array(BudgetWalletSchema),
  savings: z.array(SavingsSchema),
  recurrent_transactions: z.array(RecurrentTransactionSchema),
  recurrent_transfers: z.array(RecurrentTransferSchema),
  transactions: z.array(TransactionSchema),
  transaction_people: z.array(TransactionPersonSchema),
  transaction_models: z.array(TransactionModelSchema),
  transfers: z.array(TransferSchema),
  transfer_people: z.array(TransferPersonSchema),
  transfer_models: z.array(TransferModelSchema),
  attachments: z.array(AttachmentSchema),
  transaction_attachment: z.array(TransactionAttachmentSchema),
  transfer_attachment: z.array(TransferAttachmentSchema),
});