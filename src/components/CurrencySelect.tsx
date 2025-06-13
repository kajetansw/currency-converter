import { useQuery } from "@tanstack/react-query";
import { getCurrencies } from "../context/queries/getCurrencies";
import { isEmpty } from "../utils/isEmpty";

interface CurrencySelectProps {
  value: string;
  onChange: (currency: string) => void;
}

export const CurrencySelect = ({ value, onChange }: CurrencySelectProps) => {
  const currencies = useQuery({
    queryKey: ["currencies"],
    queryFn: getCurrencies,
  });

  return (
    <select
      value={value}
      disabled={isEmpty(currencies.data?.response)}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    >
      {(currencies.data?.response ?? [])
        // TODO temp for testing
        .filter((c) => ["USD", "PLN"].includes(c.short_code))
        .map((c) => (
          <option key={c.short_code}>{c.short_code}</option>
        ))}
    </select>
  );
};
