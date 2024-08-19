import { Input, InputProps } from "antd";
import "./components.css";
interface Props extends InputProps {
  label?: string;
  validationError?: string;
}

const TextInput = ({ label, validationError, ...props }: Props) => {
  return (
    <div className="inputContainer">
      {label && <label>{label}</label>}
      <Input {...props} />
      {validationError && (
        <span style={{ color: "red" }}>{validationError}</span>
      )}
    </div>
  );
};

export default TextInput;
