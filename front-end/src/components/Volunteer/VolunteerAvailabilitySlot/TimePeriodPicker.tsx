import FloatingLabel from "react-bootstrap/FloatingLabel";
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
    <FloatingLabel className="time_period_picker" label="Time period">
      <Form.Select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value === "" ? null : Number(event.target.value)
          )
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
    </FloatingLabel>
  );
};

export default TimePeriodPicker;
