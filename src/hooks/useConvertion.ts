import { useMutation } from "@tanstack/react-query";
import { useExchange } from "../context/exchange/exchange";
import { getConvertion } from "../context/queries/getConvertion";
import { useEffect } from "react";

export const useConvertion = (direction: "from" | "to") => {
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
        exchange.history.set({
          from: {
            amount: exchange.from.amount.value,
            currency: exchange.from.currency.value,
          },
          to: {
            amount: newAmount,
            currency: exchange.to.currency.value,
          },
        });
      }
      if (direction === "to") {
        exchange.from.amount.set(newAmount);
        exchange.history.set({
          from: {
            amount: exchange.to.amount.value,
            currency: exchange.to.currency.value,
          },
          to: {
            amount: newAmount,
            currency: exchange.from.currency.value,
          },
        });
      }
    }
  }, [convertionOutput]);

  const convert = (options: { currency: string; amount: string }) => {
    const amount = options.amount;
    const inputCurrency = options.currency;
    const outputCurrency =
      direction === "from"
        ? exchange.to.currency.value
        : exchange.from.currency.value;

    const convertionEnabled = !!inputCurrency && !!outputCurrency && !!amount;

    if (convertionEnabled) {
      convertion.mutate({
        inputCurrency,
        outputCurrency,
        amount,
      });
    }
  };

  return { convert };
};
