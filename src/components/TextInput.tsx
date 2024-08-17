import { Input, InputProps } from 'antd';
import './components.css';
interface Props extends InputProps {
  label?: string;
}

const TextInput = ({ label, ...props }: Props) => {
  return (
    <div className='inputContainer'>
      {label && <label>{label}</label>}
      <Input {...props} />
    </div>
  );
};

export default TextInput;
