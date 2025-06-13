import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrencies } from "./context/queries/getCurrencies";
import { getConvertion } from "./context/queries/getConvertion";
import { useState, useRef, useEffect } from "react";

import "./App.css";

export const App = () => {
  const lastModified = useRef<"from" | "to" | null>(null);

  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  const currencies = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const convertion = useMutation({
    mutationFn: getConvertion,
  });

  useEffect(() => {
    if (convertion.data) {
      const newAmount = convertion.data.value;

      if (lastModified.current === "from") {
        setToAmount(newAmount);
      }
      if (lastModified.current === "to") {
        setFromAmount(newAmount);
      }
    }
  }, [convertion.data?.value]);

  const convert = (options: Parameters<typeof getConvertion>[0]) => {
    const convertionEnabled = !!fromCurrency && !!toCurrency;

    if (convertionEnabled) {
      convertion.mutate(options);
    }
  };

  return (
    <>
      <div>
        <input
          type="number"
          value={fromAmount}
          onChange={(e) => {
            lastModified.current = "from";

            const newAmount = e.target.valueAsNumber;
            setFromAmount(newAmount);
            convert({
              fromCurrency,
              toCurrency,
              amount: newAmount,
            });
          }}
        />
        <select
          name="fromCurrency"
          onChange={(e) => {
            lastModified.current = "from";

            const newCurrency = e.target.value;
            setFromCurrency(newCurrency);
            convert({
              fromCurrency: newCurrency,
              toCurrency,
              amount: fromAmount,
            });
          }}
        >
          <option>Choose</option>
          {(currencies.data?.response ?? [])
            // TODO temp for testing
            // .filter((c) => ["USD", "PLN"].includes(c.short_code))
            .map((c) => (
              <option key={c.short_code}>{c.short_code}</option>
            ))}
        </select>
      </div>

      <div>
        <input
          type="number"
          value={toAmount}
          onChange={(e) => {
            lastModified.current = "to";

            const newAmount = e.target.valueAsNumber;
            setToAmount(newAmount);
            convert({
              fromCurrency: toCurrency,
              toCurrency: fromCurrency,
              amount: e.target.valueAsNumber,
            });
          }}
        />
        <select
          name="toCurrency"
          onChange={(e) => {
            lastModified.current = "to";

            const newCurrency = e.target.value;

            setToCurrency(newCurrency);
            convert({
              fromCurrency: newCurrency,
              toCurrency: fromCurrency,
              amount: toAmount,
            });
          }}
        >
          <option>Choose</option>
          {(currencies.data?.response ?? [])
            // TODO temp for testing
            // .filter((c) => ["USD", "PLN"].includes(c.short_code))
            .map((c) => (
              <option key={c.short_code}>{c.short_code}</option>
            ))}
        </select>
      </div>
    </>
  );
};
