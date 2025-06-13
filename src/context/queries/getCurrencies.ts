import type { Currency } from "../../models/types";
import { getApiPath } from "./getApiPath";

type GetCurrenciesResponse = {
  response: Currency[];
};

export const getCurrencies = () =>
  fetch(`${getApiPath("/currencies")}`).then((r) =>
    r.json(),
  ) as Promise<GetCurrenciesResponse>;
