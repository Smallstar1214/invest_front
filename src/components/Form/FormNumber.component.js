import { Form } from "react-bootstrap";

const FormNumber = ({
  name,
  onChange = () => {},
  isRequired = true,
  label,
  value = "",
  placeholderValue,
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
        required={isRequired}
        name={name}
        type="number"
        value={value}
        onChange={handleChange}
        placeholder={placeholderValue || ""}
      ></Form.Control>
      {isRequired && (
        <Form.Control.Feedback type="invalid">
          Field Required
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default FormNumber