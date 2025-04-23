import { Form, Select } from 'antd';

const SelectField = ({ 
  name, 
  label, 
  options = [], 
  rules, 
  placeholder,
  ...rest 
}) => (
  <Form.Item name={name} label={label} rules={rules}>
    <Select 
      placeholder={placeholder || `Sélectionner ${label.toLowerCase()}`} 
      {...rest}
    >
      {options.map((opt) => (
        <Select.Option key={opt.value || opt} value={opt.value || opt}>
          {opt.label || opt}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

export default SelectField;