import { useMutation } from "@tanstack/react-query";
import { getConvertion } from "./context/queries/getConvertion";
import { useRef, useEffect } from "react";
import { CurrencySelect } from "./components/CurrencySelect";
import { AmountInput } from "./components/AmountInput";

import "./App.css";
import { useExchange } from "./context/exchange/exchange";

export const App = () => {
  const lastModified = useRef<"from" | "to">("from");

  const {
    from: { amount: fromAmount, currency: fromCurrency },
    to: { amount: toAmount, currency: toCurrency },
    reset,
  } = useExchange();

  const { convert } = useConvertion(lastModified.current);

  return (
    <>
      <div>
        <AmountInput
          value={fromAmount.value}
          onChange={(amount) => {
            lastModified.current = "from";
            if (amount) {
              fromAmount.set(amount);
              convert("from", { amount, currency: fromCurrency.value });
            } else {
              reset();
            }
          }}
        />
        <CurrencySelect
          value={fromCurrency.value}
          onChange={(currency) => {
            lastModified.current = "from";
            fromCurrency.set(currency);
            convert("from", { currency, amount: fromAmount.value });
          }}
        />
      </div>

      <div>
        <AmountInput
          value={toAmount.value}
          onChange={(amount) => {
            lastModified.current = "to";
            if (amount) {
              toAmount.set(amount);
              convert("to", { amount, currency: toCurrency.value });
            } else {
              reset();
            }
          }}
        />
        <CurrencySelect
          value={toCurrency.value}
          onChange={(currency) => {
            lastModified.current = "to";
            toCurrency.set(currency);
            convert("to", { currency, amount: toAmount.value });
          }}
        />
      </div>
    </>
  );
};

const useConvertion = (direction: "from" | "to") => {
  const exchange = useExchange();

  const convertion = useMutation({
    mutationFn: getConvertion,
  });

  const convertionOutput = convertion.data?.value;

  useEffect(() => {
    if (convertionOutput) {
      const newAmount = String(convertionOutput);

      if (direction === "from") {
        exchange.to.amount.set(newAmount);
      }
      if (direction === "to") {
        exchange.from.amount.set(newAmount);
      }
    }
  }, [convertionOutput]);

  const convert = (
    direction: "from" | "to",
    options: { currency: string; amount: string },
  ) => {
    const amount = options.amount;
    const inputCurrency = options.currency;
    const outputCurrency =
      direction === "from"
        ? exchange.to.currency.value
        : exchange.from.currency.value;

    const convertionEnabled = !!inputCurrency && !!outputCurrency && !!amount;

    if (convertionEnabled) {
      convertion.mutate({
        fromCurrency: inputCurrency,
        toCurrency: outputCurrency,
        amount,
      });
    }
  };

  return { convert };
};
