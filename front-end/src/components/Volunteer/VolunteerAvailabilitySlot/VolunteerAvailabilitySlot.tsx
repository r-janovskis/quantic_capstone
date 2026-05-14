import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";

import type { Option } from "../../../types";

export interface VolunteerSlot {
  id: number;
  day_id: number | null;
  timePeriod_id: number | null;
}

interface VolunteerAvailabilitySlotProps {
  slot: VolunteerSlot;
  onChange: (updated: VolunteerSlot) => void;
  dayOptions: Option[];
  timePeriodOptions: Option[];
}

const DayPicker = ({
  value,
  options,
  onChange,
}: {
  value: number | string;
  onChange: (v: number) => void;
  options: Option[];
}) => {
  return (
    <FloatingLabel className="day_picker" label="Available day/-s">
      <Form.Select
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : Number(e.target.value))
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

const TimePeriodPicker = ({
  value,
  options,
  onChange,
}: {
  value: number | string;
  options: Option[];
  onChange: (v: number) => void;
}) => {
  return (
    <FloatingLabel className="time_period_picker" label="Time period">
      <Form.Select
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? null : Number(e.target.value))
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

function VolunteerAvailabilitySlot({
  slot,
  dayOptions,
  timePeriodOptions,
  onChange,
}: VolunteerAvailabilitySlotProps) {
  return (
    <>
      <DayPicker
        value={slot.day_id ?? ""}
        options={dayOptions}
        onChange={(val) => onChange({ ...slot, day_id: val })}
      />
      <TimePeriodPicker
        value={slot.timePeriod_id ?? ""}
        options={timePeriodOptions}
        onChange={(val) => onChange({ ...slot, timePeriod_id: val })}
      />
    </>
  );
}

export default VolunteerAvailabilitySlot;
