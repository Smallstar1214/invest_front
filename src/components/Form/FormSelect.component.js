import { Form } from 'react-bootstrap';

const FormSelect = ({ options, name, onSelectChange = () => { }, isRequired = true, label, value = "" }) => {
    const handleChange = (e) => {
        const { value } = e.target
        if (value) {
            onSelectChange(value)
        }
    }

    return (
        <>
            <Form.Label>{label}</Form.Label>
            <Form.Select required={isRequired} name={name} value={value} onChange={handleChange}>
                {options.map((item, index) => <option key={index} value={item.value}>{item.label}</option>)}
            </Form.Select>
            {isRequired && <Form.Control.Feedback type="invalid">
                Field Required
            </Form.Control.Feedback>}
        </>
    );
};

export default FormSelect