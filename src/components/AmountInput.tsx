import { useExchange } from "../context/exchange/exchange";
import { useConvertion } from "../hooks/useConvertion";

interface AmountInputProps {
  type: "from" | "to";
}

export const AmountInput = ({ type }: AmountInputProps) => {
  const { convert } = useConvertion(type);

  const exchange = useExchange();

  return (
    <input
      type="number"
      value={exchange[type].amount.value}
      onChange={(e) => {
        const amount = e.target.value;

        if (amount) {
          exchange[type].amount.set(amount);
          convert({ amount, currency: exchange[type].currency.value });
        } else {
          exchange.reset();
        }
      }}
    />
  );
};
