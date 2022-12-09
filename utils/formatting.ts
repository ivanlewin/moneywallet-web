import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { Currency } from "types";

export function formatCurrency(amount: number, currency: Currency) {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency.iso,
    currencyDisplay: 'narrowSymbol',
  });
  return intl.format(amount / (10 ** currency.decimals));
}

/**
 * 
 * @param dateString ISO 8601 (YYYY-MM-DD)
 * @returns 
 */
export function formatDate(dateString: string) {
  const date = dayjs(dateString);
  return date.format('LL');
}

/**
 * 
 * @param datetime should be of format YYYY-MM-DD hh:mm:ss
 * @returns 
 */
export function formatTime(datetime: string) {
  const date = dayjs(datetime);
  return date.format('LT');
}