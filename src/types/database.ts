import {
  AttachmentSchema, BudgetSchema, BudgetWalletSchema, CategorySchema, CurrencySchema,
  DatabaseSchema, DebtPersonSchema, DebtSchema, EventPersonSchema, EventSchema, IconSchema,
  PersonSchema, PlaceSchema, RecurrentTransactionSchema, RecurrentTransferSchema, SavingsSchema,
  TransactionAttachmentSchema, TransactionDirectionSchema, TransactionModelSchema,
  TransactionPersonSchema, TransactionSchema, TransferAttachmentSchema, TransferModelSchema,
  TransferPersonSchema, TransferSchema, WalletSchema
} from 'schemas';
import { z } from 'zod';

export type Currency = z.infer<typeof CurrencySchema>;
export type Icon = z.infer<typeof IconSchema>;
export type Wallet = z.infer<typeof WalletSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Event = z.infer<typeof EventSchema>;
export type Place = z.infer<typeof PlaceSchema>;
export type Person = z.infer<typeof PersonSchema>;
export type EventPerson = z.infer<typeof EventPersonSchema>;
export type Debt = z.infer<typeof DebtSchema>;
export type DebtPerson = z.infer<typeof DebtPersonSchema>;
export type Budget = z.infer<typeof BudgetSchema>;
export type BudgetWallet = z.infer<typeof BudgetWalletSchema>;
export type Savings = z.infer<typeof SavingsSchema>;
export type RecurrentTransfer = z.infer<typeof RecurrentTransferSchema>;
export type Transaction = z.infer<typeof TransactionSchema>;
export type TransactionDirection = z.infer<typeof TransactionDirectionSchema>;
export type RecurrentTransaction = z.infer<typeof RecurrentTransactionSchema>;
export type TransactionPerson = z.infer<typeof TransactionPersonSchema>;
export type TransactionModel = z.infer<typeof TransactionModelSchema>;
export type Transfer = z.infer<typeof TransferSchema>;
export type TransferPerson = z.infer<typeof TransferPersonSchema>;
export type TransferModel = z.infer<typeof TransferModelSchema>;
export type Attachment = z.infer<typeof AttachmentSchema>;
export type TransactionAttachment = z.infer<typeof TransactionAttachmentSchema>;
export type TransferAttachment = z.infer<typeof TransferAttachmentSchema>;
export type Database = z.infer<typeof DatabaseSchema>;