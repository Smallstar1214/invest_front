import { Form } from "react-bootstrap";

const FormText = ({
  className,
  style,
  name,
  onChange = () => { },
  isRequired = true,
  label,
  value = "",
  disabled,
  placeholderValue,
  type,
  minLength,
  feedback="Field Required",
  pattern,
}) => {
  const handleChange = (e) => {
    const { value } = e.target;
    if (value) {
      onChange(value);
    }
  };

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className={className || "w-full"}
        style={style || {}}
        required={isRequired}
        name={name}
        type={type || "text"}
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder={placeholderValue || ""}
        feedback={feedback}
        minLength={minLength}
        pattern={pattern}
      ></Form.Control>
      {isRequired && (
        <Form.Control.Feedback type="invalid">
          {feedback}
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default FormText