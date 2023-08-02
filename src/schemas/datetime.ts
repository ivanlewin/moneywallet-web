import { z } from "zod";

export const DateSchema = z.string().regex(/^[0-9]{4}-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01])$/); // YYYY-MM-DD
export const DatetimeSchema = z.string().regex(/^[0-9]{4}-(?:0[1-9]|1[012])-(?:0[1-9]|[12][0-9]|3[01]) (?:[01][0-9]|2[0-3])(?::(?:[0-5][0-9])){2}$/); // YYYY-MM-DD hh:mm:ss