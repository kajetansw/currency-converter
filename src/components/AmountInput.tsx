interface AmountInputProps {
  value: string;
  onChange: (amount: string) => void;
}

export const AmountInput = ({ onChange, value }: AmountInputProps) => {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => {
        onChange(e.target.value);
      }}
    />
  );
};
