import { CurrencySelect } from "./components/CurrencySelect";
import { AmountInput } from "./components/AmountInput";
import { ConversionHistory } from "./components/ConversionHistory";

import "./App.css";

export const App = () => {
  return (
    <>
      <div>
        <AmountInput type="from" />
        <CurrencySelect type="from" />
      </div>

      <div>
        <AmountInput type="to" />
        <CurrencySelect type="to" />
      </div>

      <ConversionHistory />
    </>
  );
};
