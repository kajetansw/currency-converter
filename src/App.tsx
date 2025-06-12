import { useQuery } from "@tanstack/react-query";
import { getCurrenciesQueryFn } from "./context/queries/getCurrenciesQueryFn";
import { getConvertQueryFn } from "./context/queries/getConvertQueryFn";

import "./App.css";

export const App = () => {
  const currencies = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrenciesQueryFn(),
  });

  const fromCurrency = "USD";
  const toCurrency = "PLN";
  const amount = 1;
  const testConvert = useQuery({
    queryKey: ["convert", fromCurrency, toCurrency, amount],
    queryFn: getConvertQueryFn({ fromCurrency, toCurrency, amount }),
  });

  console.log(currencies.data);
  console.log(testConvert.data);

  return (
    <>
      <div>TODO</div>
    </>
  );
};
