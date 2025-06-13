import type { Conversion } from "../../models/types";
import { getApiPath } from "./getApiPath";

type GetConvertResponse = Conversion;

export const getConvertion = (options: {
  inputCurrency: string;
  outputCurrency: string;
  amount: string;
}) => {
  const { inputCurrency, outputCurrency, amount } = options;

  return fetch(
    `${getApiPath("/convert")}&from=${inputCurrency}&to=${outputCurrency}&amount=${amount}`,
  ).then((r) => r.json()) as Promise<GetConvertResponse>;
};
