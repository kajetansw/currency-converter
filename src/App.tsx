import { useMutation } from "@tanstack/react-query";
import { getConvertion } from "./context/queries/getConvertion";
import { useRef, useEffect, useState } from "react";
import { CurrencySelect } from "./components/CurrencySelect";
import { AmountInput } from "./components/AmountInput";

import "./App.css";

export const App = () => {
  const lastModified = useRef<"from" | "to" | null>(null);

  const [fromAmount, setFromAmount] = useState("");
  const [toAmount, setToAmount] = useState("");

  const [fromCurrency, setFromCurrency] = useState("PLN");
  const [toCurrency, setToCurrency] = useState("PLN");

  const convertion = useMutation({
    mutationFn: getConvertion,
  });

  const convertionOutput = convertion.data?.value;

  useEffect(() => {
    if (convertionOutput) {
      const newAmount = String(convertionOutput);

      if (lastModified.current === "from") {
        setToAmount(newAmount);
      }
      if (lastModified.current === "to") {
        setFromAmount(newAmount);
      }
    }
  }, [convertionOutput]);

  const convert = (
    direction: "from" | "to",
    options: { currency: string; amount: string },
  ) => {
    const amount = options.amount;
    const inputCurrency = options.currency;
    const outputCurrency = direction === "from" ? toCurrency : fromCurrency;

    const convertionEnabled = !!inputCurrency && !!outputCurrency && !!amount;

    if (convertionEnabled) {
      convertion.mutate({
        fromCurrency: inputCurrency,
        toCurrency: outputCurrency,
        amount,
      });
    }
  };

  const resetAmounts = () => {
    setFromAmount("");
    setToAmount("");
  };

  return (
    <>
      <div>
        <AmountInput
          value={fromAmount}
          onChange={(amount) => {
            lastModified.current = "from";
            if (amount) {
              setFromAmount(amount);
              convert("from", { amount, currency: fromCurrency });
            } else {
              resetAmounts();
            }
          }}
        />
        <CurrencySelect
          value={fromCurrency}
          onChange={(currency) => {
            lastModified.current = "from";
            setFromCurrency(currency);
            convert("from", { currency, amount: fromAmount });
          }}
        />
      </div>

      <div>
        <AmountInput
          value={toAmount}
          onChange={(amount) => {
            lastModified.current = "to";
            if (amount) {
              setToAmount(amount);
              convert("to", { amount, currency: toCurrency });
            } else {
              resetAmounts();
            }
          }}
        />
        <CurrencySelect
          value={toCurrency}
          onChange={(currency) => {
            lastModified.current = "to";
            setToCurrency(currency);
            convert("to", { currency, amount: toAmount });
          }}
        />
      </div>
    </>
  );
};
