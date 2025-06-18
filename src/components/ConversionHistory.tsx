import { useExchange } from "../context/exchange/exchange";

export const ConversionHistory = () => {
  const {
    history: { value: history },
  } = useExchange();

  return (
    <ul>
      {history.map((h) => (
        <li key={`${h.from.amount},${h.from.currency}`}>
          {`From: ${h.from.amount}${h.from.currency} => ${h.to.amount}${h.to.currency}`}
        </li>
      ))}
    </ul>
  );
};
