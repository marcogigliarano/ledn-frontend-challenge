import { Currency, Cumulative } from "../types";

export interface Value {
  value: number;
  currency: Currency;
}

const getCumulativeValue = (allValues: Value[]) => {
  const INITIAL_VALUE: Cumulative = {
    ICS: 0,
    GCS: 0,
  };

  if (allValues.length > 0) {
    return allValues.reduce((acc, value) => {
      if (value.currency === Currency.ICS) {
        acc.ICS += value.value;
      } else if (value.currency === Currency.GCS) {
        acc.GCS += value.value;
      }
      return acc;
    }, INITIAL_VALUE);
  }
  return INITIAL_VALUE;
};

export default getCumulativeValue;
