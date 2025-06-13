import type { Conversion } from "../../models/types";
import { getApiPath } from "./getApiPath";

type GetConvertResponse = Conversion;

export const getConvertion = (options: {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
}) => {
  const { fromCurrency, toCurrency, amount } = options;

  return fetch(
    `${getApiPath("/convert")}&from=${fromCurrency}&to=${toCurrency}&amount=${amount}`,
  ).then((r) => r.json()) as Promise<GetConvertResponse>;
};
