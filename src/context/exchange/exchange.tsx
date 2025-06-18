import { createContext, useContext, useState } from "react";
import type { ConversionHistory } from "../../models/types";

interface ExchangeContextType {
  history: {
    value: ConversionHistory[];
    set: (newValue: ConversionHistory) => void;
  };
  reset: () => void;
  from: {
    amount: {
      value: string;
      set: (value: string) => void;
    };
    currency: {
      value: string;
      set: (value: string) => void;
    };
  };
  to: {
    amount: {
      value: string;
      set: (value: string) => void;
    };
    currency: {
      value: string;
      set: (value: string) => void;
    };
  };
}

export const initialExchange = {
  history: {
    value: [],
    set: () => undefined,
  },
  reset: () => undefined,
  from: {
    amount: {
      value: "",
      set: () => undefined,
    },
    currency: {
      value: "PLN",
      set: () => undefined,
    },
  },
  to: {
    amount: {
      value: "",
      set: () => undefined,
    },
    currency: {
      value: "PLN",
      set: () => undefined,
    },
  },
} satisfies ExchangeContextType;

const ExchangeContext = createContext<ExchangeContextType | undefined>(
  undefined,
);

export const useExchange = () => {
  const context = useContext(ExchangeContext);
  if (!context) {
    throw new Error(
      "useExchange must be used within a ExchangeContextProvider",
    );
  }
  return context;
};

export const ExchangeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [fromAmount, setFromAmount] = useState(
    initialExchange.from.amount.value,
  );
  const [toAmount, setToAmount] = useState(initialExchange.to.amount.value);

  const [fromCurrency, setFromCurrency] = useState(
    initialExchange.from.currency.value,
  );
  const [toCurrency, setToCurrency] = useState(
    initialExchange.to.currency.value,
  );

  const [history, setHistory] = useState<ConversionHistory[]>(
    initialExchange.history.value,
  );

  const setConversionHistory = (newValue: ConversionHistory) => {
    const maxLength = 5;

    if (history.length < 5) {
      setHistory((h) => [newValue, ...h]);
    } else {
      setHistory((h) => [newValue, ...h.slice(0, maxLength - 1)]);
    }
  };

  const resetAmounts = () => {
    setFromAmount("");
    setToAmount("");
  };

  const contextValue: ExchangeContextType = {
    reset: resetAmounts,
    history: {
      value: history,
      set: setConversionHistory,
    },
    from: {
      amount: {
        value: fromAmount,
        set: setFromAmount,
      },
      currency: {
        value: fromCurrency,
        set: setFromCurrency,
      },
    },
    to: {
      amount: {
        value: toAmount,
        set: setToAmount,
      },
      currency: {
        value: toCurrency,
        set: setToCurrency,
      },
    },
  };

  return (
    <ExchangeContext.Provider value={contextValue}>
      {children}
    </ExchangeContext.Provider>
  );
};
