import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../context/queries/getCurrencies";
import { isEmpty } from "../utils/isEmpty";
import { useExchange } from "../context/exchange/exchange";
import { useConvertion } from "../hooks/useConvertion";

interface CurrencySelectProps {
  type: "from" | "to";
}

export const CurrencySelect = ({ type }: CurrencySelectProps) => {
  const currencies = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
    initialData: { response: [] },
  });

  const exchange = useExchange();
  const { convert } = useConvertion(type);

  return (
    <select
      value={exchange[type].currency.value}
      disabled={isEmpty(currencies.data.response)}
      onChange={(e) => {
        const currency = e.target.value;

        exchange[type].currency.set(currency);
        convert({ currency, amount: exchange[type].amount.value });
      }}
    >
      {currencies.data.response.map((c) => (
        <option key={c.short_code}>{c.short_code}</option>
      ))}
    </select>
  );
};
