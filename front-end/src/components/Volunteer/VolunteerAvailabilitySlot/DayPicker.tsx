import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import type { Option } from "../../../types";

const DayPicker = ({
  value,
  options,
  onChange,
}: {
  value: number | string;
  onChange: (value: number | null) => void;
  options: Option[];
}) => {
  return (
    <FloatingLabel className="day_picker" label="Available day/-s">
      <Form.Select
        value={value}
        onChange={(event) =>
          onChange(
            event.target.value === "" ? null : Number(event.target.value)
          )
        }
        aria-label="Day availability selector"
      >
        <option value="">Select day</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};

export default DayPicker;
