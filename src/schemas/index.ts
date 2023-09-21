import { z } from 'zod';
import { DateSchema, DatetimeSchema } from './datetime';

export const LegacyCurrencySchema = z.object({
  iso: z.string().length(3), // ISO 4217,
  name: z.string(),
  symbol: z.string().optional(),
  decimals: z.number().int().min(0).max(8),
  favourite: z.boolean(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const LegacyIconSchema = z.union([
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

export const LegacyWalletSchema = z.object({
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

export const LegacyCategoryTypeSchema = z.union([
  z.literal(0), // Income
  z.literal(1), // Expense
  z.literal(2) // System
]);
export const LegacyCategoryTagSchema = z.union([
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
export const LegacyCategoryIDSchema = z.union([
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
export const LegacyCategorySchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  type: LegacyCategoryTypeSchema,
  parent: z.string().uuid().optional(),
  tag: LegacyCategoryTagSchema.optional(),
  show_report: z.boolean(),
  index: z.number(),
  id: LegacyCategoryIDSchema,
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const LegacyEventSchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  note: z.string().optional(),
  start_date: z.string(),
  end_date: z.string(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const LegacyPlaceSchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  address: z.string().optional(),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const LegacyPersonSchema = z.object({
  name: z.string(),
  icon: z.string(), // Icon
  note: z.string().optional(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const LegacyEventPersonSchema = z.any();

export const LegacyDebtTypeSchema = z.union([z.literal(0), z.literal(1)]);
export const LegacyDebtSchema = z.object({
  type: LegacyDebtTypeSchema,
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

export const LegacyDebtPersonSchema = z.any();

export const LegacyBudgetSchema = z.any();

export const LegacyBudgetWalletSchema = z.any();

export const LegacySavingsSchema = z.any();

export const LegacyRecurrentTransferSchema = z.any();

export const LegacyTransactionDirectionSchema = z.union([
  z.literal(0), // expense
  z.literal(1), // income
]);
export const LegacyTransactionTypeSchema = z.union([
  z.literal(0), // 
  z.literal(1), // 
  z.literal(2), // 
  z.literal(3), // 
  z.literal(4), // 
]);
export const LegacyTransactionSchema = z.object({
  money: z.number(),
  date: DatetimeSchema,
  description: z.string(),
  category: LegacyCategoryIDSchema,
  direction: LegacyTransactionDirectionSchema,
  type: LegacyTransactionTypeSchema,
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

export const LegacyRecurrentTransactionSchema = LegacyTransactionSchema.pick({
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

export const LegacyTransactionPersonSchema = z.object({
  transaction: z.string().uuid(),
  person: z.string().uuid(),
  id: z.string().uuid(),
  last_edit: z.number(), // timestamp
  deleted: z.boolean(),
});

export const LegacyTransactionModelSchema = LegacyTransactionSchema.pick({
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

export const LegacyTransferSchema = z.object({
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

export const LegacyTransferPersonSchema = z.any();

export const TransferModelSchema = LegacyTransferSchema.pick({
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

export const LegacyAttachmentSchema = z.any();

export const LegacyTransactionAttachmentSchema = z.any();

export const LegacyTransferAttachmentSchema = z.any();

export const LegacyDatabaseSchema = z.object({
  header: z.object({
    version_code: z.number()
  }),
  currencies: z.array(LegacyCurrencySchema),
  wallets: z.array(LegacyWalletSchema),
  categories: z.array(LegacyCategorySchema),
  events: z.array(LegacyEventSchema),
  places: z.array(LegacyPlaceSchema),
  people: z.array(LegacyPersonSchema),
  event_people: z.array(LegacyEventPersonSchema),
  debts: z.array(LegacyDebtSchema),
  debt_people: z.array(LegacyDebtPersonSchema),
  budgets: z.array(LegacyBudgetSchema),
  budget_wallets: z.array(LegacyBudgetWalletSchema),
  savings: z.array(LegacySavingsSchema),
  recurrent_transactions: z.array(LegacyRecurrentTransactionSchema),
  recurrent_transfers: z.array(LegacyRecurrentTransferSchema),
  transactions: z.array(LegacyTransactionSchema),
  transaction_people: z.array(LegacyTransactionPersonSchema),
  transaction_models: z.array(LegacyTransactionModelSchema),
  transfers: z.array(LegacyTransferSchema),
  transfer_people: z.array(LegacyTransferPersonSchema),
  transfer_models: z.array(TransferModelSchema),
  attachments: z.array(LegacyAttachmentSchema),
  transaction_attachment: z.array(LegacyTransactionAttachmentSchema),
  transfer_attachment: z.array(LegacyTransferAttachmentSchema),
});