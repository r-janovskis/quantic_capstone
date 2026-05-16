import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

import "./SlotList.css";

interface SlotListProps<T extends { id: number }> {
  SlotComponent: React.ComponentType<{
    slot: T;
    onChange: (update: T) => void;
  }>;
  createEmptySlot: (id: number) => T;
  onChange?: (slots: T[]) => void;
  initialSlots?: T[];
}

function SlotList<T extends { id: number }>({
  SlotComponent,
  createEmptySlot,
  onChange,
  initialSlots,
}: SlotListProps<T>) {
  const [slots, setSlots] = useState<T[]>(initialSlots ?? []);
  const [nextId, setNextId] = useState(() =>
    initialSlots && initialSlots.length > 0
      ? Math.max(...initialSlots.map((s) => s.id)) + 1
      : 1
  );

  const handleSlotChange = (updated: T) => {
    const newSlots = slots.map((slot) =>
      slot.id === updated.id ? updated : slot
    );
    setSlots(newSlots);
    onChange?.(newSlots);
  };

  const handleDeleteRow = (id: number) => {
    const newSlots = slots.filter((slot) => slot.id !== id);
    setSlots(newSlots);
    onChange?.(newSlots);
  };

  const handleAddRowClick = () => {
    const newSlot = createEmptySlot(nextId);
    const newSlots = [...slots, newSlot];
    setSlots(newSlots);
    setNextId((prev) => prev + 1);
    onChange?.(newSlots);
  };

  useEffect(() => {
    // We want one row to be rendered when we load the page
    // So we add handleAddRowClick on loadup
    if (!initialSlots || initialSlots.length === 0) {
      handleAddRowClick();
    }
  }, []);

  return (
    <section>
      {slots.map((slot) => (
        <div className="slot-list-entry" key={slot.id}>
          <SlotComponent slot={slot} onChange={handleSlotChange} />
          <Button variant="danger" onClick={() => handleDeleteRow(slot.id)}>
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
