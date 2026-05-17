import Form from "react-bootstrap/Form";

import type { Option } from "../../../types";

const TimePeriodPicker = ({
  value,
  options,
  onChange,
}: {
  value: number | string;
  options: Option[];
  onChange: (value: number | null) => void;
}) => {
  return (
    <Form.Select
      className="time_period_picker"
      value={value}
      onChange={(event) =>
        onChange(event.target.value === "" ? null : Number(event.target.value))
      }
      aria-label="Time period selector"
    >
      <option value="">Select time period</option>
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </Form.Select>
  );
};

export default TimePeriodPicker;
