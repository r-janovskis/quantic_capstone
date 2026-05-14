import DayPicker from "./DayPicker";
import TimePeriodPicker from "./TimePeriodPicker";

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
