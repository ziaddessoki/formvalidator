import { Select } from "antd";

const Dropdown = ({ label, validationError, ...props }) => {
  const options = Array.from({ length: 100 }, (_, i) => ({
    label: i + 1,
    value: i + 1,
  }));

  return (
    <div>
      {label && <label>{label}</label>}
      <Select options={options} style={{ width: 120 }} {...props} />
      {validationError && (
        <span style={{ color: "red" }}>{validationError}</span>
      )}
    </div>
  );
};

export default Dropdown;
