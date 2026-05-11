import Select from "react-select";
import { Form } from "react-bootstrap";

type Option = {
  value: number;
  label: string;
};

interface Props {
  id: string;
  label: string;
  value: Option[];
  options: Option[];
  onChange: (selected: Option[]) => void;
  isInvalid: boolean;
}

function MultiSelectField({
  id,
  label,
  value,
  options,
  onChange,
  isInvalid,
}: Props) {
  return (
    <Form.Group className="entry-volunteer">
      <Form.Label htmlFor={id}>{label}</Form.Label>
      <Select
        inputId={id}
        isMulti
        closeMenuOnSelect={false}
        options={options}
        value={value}
        onChange={(selected) => onChange(selected as Option[])}
        styles={{
          control: (base) => ({
            ...base,
            borderColor: isInvalid
              ? "#dc3545"
              : value.length > 0
              ? "#198754"
              : base.borderColor,
          }),
        }}
      />
    </Form.Group>
  );
}

export default MultiSelectField;
