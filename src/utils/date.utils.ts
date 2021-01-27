import { enUS } from 'date-fns/locale';
import { format as fnsFormat, parse as fnsParse } from 'date-fns';

/**
 * Options interface for `date-fns` configuration
 */
interface Options {
  locale: Locale;
  weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  firstWeekContainsDate: 1 | 2 | 3 | 4 | 5 | 6 | 7;
  useAdditionalWeekYearTokens: boolean;
  useAdditionalDayOfYearTokens: boolean;
}

/**
 * Global options initialization
 */
const globalOptions: Partial<Options> = {
  locale: enUS,
};

/**
 * Configure default options to be used in `format` and `parse` utility functions.
 */
export function configDateUtils(options: Partial<Options>): void {
  Object.assign(globalOptions, options);
}

/**
 * Formats `Date` using provided `formatString`
 *
 * Wrapper for date-fns library in order to customize default options
 */
export function formatDate(
  date: Date,
  formatString: string,
  options?: Partial<Options>
): string | undefined {
  if (date !== null && date !== undefined) {
    return fnsFormat(date, formatString, { ...globalOptions, ...options });
  }
  return undefined;
}

/**
 * Parse `Date` using provided `formatString`
 *
 * Wrapper for date-fns library in order to customize default options
 */
export function parseDate(
  dateString: string,
  formatString: string,
  referenceDate: Date | number = new Date(),
  options?: Partial<Options>
): Date | undefined {
  if (dateString !== null && dateString !== undefined) {
    return fnsParse(dateString, formatString, referenceDate, {
      ...globalOptions,
      ...options,
    });
  }
  return undefined;
}
