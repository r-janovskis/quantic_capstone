import { useState, useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

import "./SlotList.css";

const DayPicker = () => {
  return (
    <FloatingLabel className="day_picker" label="Available day/-s">
      <Form.Select aria-label="Day availability selector">
        <option>Select day</option>
        <option value="1">Monday</option>
        <option value="2">Tuesday</option>
        <option value="3">Wednesday</option>
        <option value="4">Thursday</option>
        <option value="5">Friday</option>
        <option value="6">Saturday</option>
        <option value="7">Sunday</option>
        <option value="8">Working days</option>
        <option value="9">Weekend</option>
      </Form.Select>
    </FloatingLabel>
  );
};

const TimePeriodPicker = () => {
  return (
    <FloatingLabel className="time_period_picker" label="Time period">
      <Form.Select aria-label="Time period selector">
        <option>Select time period</option>
        <option value="1">Morning (8am-12pm)</option>
        <option value="2">Afternoon (1pm-5pm)</option>
        <option value="3">Evening (6pm-10pm)</option>
        <option value="4">Whole day (8am-10pm)</option>
      </Form.Select>
    </FloatingLabel>
  );
};

function SlotList() {
  const [slotIds, setSlotIds] = useState<number[]>([1]);
  const [slotIdTracker, setSlotIdTracker] = useState(2);
  const handleDeleteRow = (id: number) => {
    setSlotIds((prev) => prev.filter((slotId) => slotId !== id));
  };

  const handleAddRowClick = () => {
    setSlotIds((prev) => [...prev, slotIdTracker]);
    setSlotIdTracker((prev) => prev + 1);
  };

  return (
    <section>
      {slotIds.map((id) => (
        <div className="slot-list-entry" key={id}>
          <DayPicker />
          <TimePeriodPicker />
          <Button variant="danger" onClick={() => handleDeleteRow(id)}>
            Delete
          </Button>
        </div>
      ))}
      <Button className="add-row" variant="primary" onClick={handleAddRowClick}>
        Add row
      </Button>
    </section>
  );
}

export default SlotList;
