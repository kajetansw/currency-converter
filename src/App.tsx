import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrencies } from "./context/queries/getCurrencies";
import { getConvertion } from "./context/queries/getConvertion";
import { useRef, useEffect } from "react";

import "./App.css";

export const App = () => {
  const lastModified = useRef<"from" | "to" | null>(null);

  const fromAmountRef = useRef<HTMLInputElement>(null);
  const toAmountRef = useRef<HTMLInputElement>(null);

  const fromCurrencyRef = useRef<HTMLSelectElement>(null);
  const toCurrencyRef = useRef<HTMLSelectElement>(null);

  const currencies = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  const convertion = useMutation({
    mutationFn: getConvertion,
  });

  useEffect(() => {
    if (convertion.data) {
      const newAmount = String(convertion.data.value);

      if (lastModified.current === "from" && toAmountRef.current) {
        toAmountRef.current.value = newAmount;
      }
      if (lastModified.current === "to" && fromAmountRef.current) {
        fromAmountRef.current.value = newAmount;
      }
    }
  }, [convertion.data?.value]);

  const convert = (direction: "from" | "to") => {
    const fromCurrency = fromCurrencyRef.current?.value;
    const toCurrency = toCurrencyRef.current?.value;
    const amount =
      direction === "from"
        ? fromAmountRef.current?.value
        : toAmountRef.current?.value;

    const convertionEnabled = !!fromCurrency && !!toCurrency && !!amount;

    if (convertionEnabled) {
      const options =
        direction === "from"
          ? { fromCurrency, toCurrency, amount }
          : { fromCurrency: toCurrency, toCurrency: fromCurrency, amount };

      convertion.mutate(options);
    }
  };

  const resetAmounts = () => {
    if (fromAmountRef.current) {
      fromAmountRef.current.value = "";
    }
    if (toAmountRef.current) {
      toAmountRef.current.value = "";
    }
  };

  return (
    <>
      <div>
        <input
          type="number"
          ref={fromAmountRef}
          onChange={(e) => {
            lastModified.current = "from";
            if (e.target.value) {
              convert("from");
            } else {
              resetAmounts();
            }
          }}
        />
        <select
          name="fromCurrency"
          ref={fromCurrencyRef}
          disabled={isEmpty(currencies.data?.response)}
          onChange={() => {
            lastModified.current = "from";
            convert("from");
          }}
        >
          {(currencies.data?.response ?? [])
            // TODO temp for testing
            .filter((c) => ["USD", "PLN"].includes(c.short_code))
            .map((c) => (
              <option key={c.short_code}>{c.short_code}</option>
            ))}
        </select>
      </div>

      <div>
        <input
          type="number"
          ref={toAmountRef}
          onChange={(e) => {
            lastModified.current = "to";
            if (e.target.value) {
              convert("to");
            } else {
              resetAmounts();
            }
          }}
        />
        <select
          name="toCurrency"
          ref={toCurrencyRef}
          disabled={isEmpty(currencies.data?.response)}
          onChange={() => {
            lastModified.current = "to";
            convert("to");
          }}
        >
          {(currencies.data?.response ?? [])
            // TODO temp for testing
            .filter((c) => ["USD", "PLN"].includes(c.short_code))
            .map((c) => (
              <option key={c.short_code}>{c.short_code}</option>
            ))}
        </select>
      </div>
    </>
  );
};

/*
 * utils
 */

const isEmpty = (value: unknown) =>
  !value || (Array.isArray(value) && value.length === 0);
