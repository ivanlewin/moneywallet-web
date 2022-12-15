import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
dayjs.extend(localizedFormat);
import { Currency } from "types";

const defaultCurrency = { decimals: 2, iso: 'USD' };
const defaultOptions = { style: 'currency', currencyDisplay: 'narrowSymbol', };
export function formatCurrency(
  amount: number,
  currency: Pick<Currency, 'decimals' | 'iso'> = defaultCurrency,
  options: Intl.NumberFormatOptions = {}
) {
  const locale = navigator.language;
  const intl = new Intl.NumberFormat(locale, { currency: currency.iso, ...defaultOptions, ...options, });
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