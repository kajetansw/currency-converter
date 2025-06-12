import type { Currency } from "../../models/types";
import { getApiPath } from "./getApiPath";

type GetCurrenciesResponse = Currency[];

export const getCurrenciesQueryFn = () => () =>
  fetch(`${getApiPath("/currencies")}`).then((r) =>
    r.json(),
  ) as Promise<GetCurrenciesResponse>;
