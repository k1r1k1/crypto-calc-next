import { Crypto, Currency } from "@/app/types";

interface Props {
  handleChange: (e: any) => void
  value: string;
  items: [Crypto] | [Currency];
}

const Select = ({ handleChange, value, items }: Props) => {
  return (
  <div className="mb-3 w-25">
    <label htmlFor="disabledSelect" className="form-label">Pick crypto</label>
    <select
      id="select"
      className="form-select"
      aria-label="Default select example"
      onChange={handleChange}
      defaultValue={value}
    >
      {items?.map(({ id, name, symbol }: Crypto | Currency) => (
        <option key={`select-1-${id}`} value={symbol}>{`[${symbol}]: ${name}`}</option>
      ))}
    </select>
  </div>
  )
}

export default Select
