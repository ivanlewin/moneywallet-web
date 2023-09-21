import {
  LegacyAttachmentSchema, LegacyBudgetSchema, LegacyBudgetWalletSchema, LegacyCategorySchema, LegacyCurrencySchema,
  LegacyDatabaseSchema, LegacyDebtPersonSchema, LegacyDebtSchema, LegacyEventPersonSchema, LegacyEventSchema, LegacyIconSchema,
  LegacyPersonSchema, LegacyPlaceSchema, LegacyRecurrentTransactionSchema, LegacyRecurrentTransferSchema, LegacySavingsSchema,
  LegacyTransactionAttachmentSchema, LegacyTransactionDirectionSchema, LegacyTransactionModelSchema,
  LegacyTransactionPersonSchema, LegacyTransactionSchema, LegacyTransferAttachmentSchema, TransferModelSchema,
  LegacyTransferPersonSchema, LegacyTransferSchema, LegacyWalletSchema
} from 'schemas';
import { z } from 'zod';

export type LegacyCurrency = z.infer<typeof LegacyCurrencySchema>;
export type LegacyIcon = z.infer<typeof LegacyIconSchema>;
export type LegacyWallet = z.infer<typeof LegacyWalletSchema>;
export type LegacyCategory = z.infer<typeof LegacyCategorySchema>;
export type LegacyEvent = z.infer<typeof LegacyEventSchema>;
export type LegacyPlace = z.infer<typeof LegacyPlaceSchema>;
export type LegacyPerson = z.infer<typeof LegacyPersonSchema>;
export type LegacyEventPerson = z.infer<typeof LegacyEventPersonSchema>;
export type LegacyDebt = z.infer<typeof LegacyDebtSchema>;
export type LegacyDebtPerson = z.infer<typeof LegacyDebtPersonSchema>;
export type LegacyBudget = z.infer<typeof LegacyBudgetSchema>;
export type LegacyBudgetWallet = z.infer<typeof LegacyBudgetWalletSchema>;
export type LegacySavings = z.infer<typeof LegacySavingsSchema>;
export type LegacyRecurrentTransfer = z.infer<typeof LegacyRecurrentTransferSchema>;
export type LegacyTransaction = z.infer<typeof LegacyTransactionSchema>;
export type LegacyTransactionDirection = z.infer<typeof LegacyTransactionDirectionSchema>;
export type LegacyRecurrentTransaction = z.infer<typeof LegacyRecurrentTransactionSchema>;
export type LegacyTransactionPerson = z.infer<typeof LegacyTransactionPersonSchema>;
export type LegacyTransactionModel = z.infer<typeof LegacyTransactionModelSchema>;
export type LegacyTransfer = z.infer<typeof LegacyTransferSchema>;
export type LegacyTransferPerson = z.infer<typeof LegacyTransferPersonSchema>;
export type LegacyTransferModel = z.infer<typeof TransferModelSchema>;
export type LegacyAttachment = z.infer<typeof LegacyAttachmentSchema>;
export type LegacyTransactionAttachment = z.infer<typeof LegacyTransactionAttachmentSchema>;
export type LegacyTransferAttachment = z.infer<typeof LegacyTransferAttachmentSchema>;
export type LegacyDatabase = z.infer<typeof LegacyDatabaseSchema>;