import { Form } from "react-bootstrap";

export const FormDate = ({
  name,
  onChange = () => {},
  isRequired = true,
  label,
  value = "",
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
        type="date"
        value={value}
        onChange={handleChange}
      ></Form.Control>
      {isRequired && (
        <Form.Control.Feedback type="invalid">
          Field Required
        </Form.Control.Feedback>
      )}
    </>
  );
};

export default FormDate