import { Col, Form, Modal, ModalBody, ModalHeader, Row } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import FooterButtons from "../../../../components/Form/FooterButtons.component";
import FormText from "../../../../components/Form/FormText.component";
import FormDate from "../../../../components/Form/FormDate.component";
import FormSelect from "../../../../components/Form/FormSelect.component";
import FormNumber from "../../../../components/Form/FormNumber.component";
import { currentDate } from "../../../../utils/common";

export const cardTypeOptions = [
    {id: 0, label: "Please Select...", value: ""},
    {id: 1, label: "Master Card", value: "Master Card" },
    {id: 2, label: "Visa", value: "Visa" },
    {id: 3, label: "American Express", value: "American Express" },
];

const AddEditCardModal = ({ open, onSave = () => { }, editObj, editMode=false, listSize, onClose = () => {} }) => {
  const formDataInitial = {
    id: "",
    cardType: "",
    cardNumber: "",
    cardHolderName: "",
    expiryDate: "",
    cvc: "",
    lastUpdated: "",
  };

  const [formData, setFormData] = useState(formDataInitial);
  const [validated, setValidated] = useState(false);

  useEffect(() => {
    if (editMode) {
      setFormData(editObj);
    }
  }, [editObj, open, editMode])

  const handleFormChange = (name, value) => {
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    const form = e.currentTarget;
    if(form.checkValidity() === false) {
        e.preventDefault();
        e.stopPropagation();
    }
    setValidated(true);

    if(formData && formData.cardType && formData.cardNumber && formData.cardHolderName && formData.expiryDate && formData.cvc) {
      if(editMode) {
          const newObj = {...formData, lastUpdated: currentDate };
          onSave(newObj);
      } else {
          const newObj = {...formData, id: listSize+1, lastUpdated: currentDate };
          onSave(newObj);
      }
      onClose();
    }
  }

  return (
    <Modal show={open} onHide={onClose} size="lg" centered>
      <ModalHeader className="bg-light text-dark" closeButton>
        { editMode ? "Edit Your Card" : "Add New Card" }
      </ModalHeader>
      <ModalBody className="me-3 ms-3">
        <Form noValidate validated={validated} onSubmit={handleSubmit}>
          <Row className="gx-3 mb-3 gy-3">
            <Col lg={6} sm={12}>
              <FormSelect
                options={cardTypeOptions || []}
                name={"cardType"}
                value={formData.cardType}
                label={"Card Type"}
                onSelectChange={(val) => {
                  handleFormChange("cardType", val);
                }}
              />
            </Col>
            <Col lg={6} sm={12}>
              <FormText
                value={formData.cardNumber}
                name={"cardNumber"}
                label={"Card Number"}
                minLength={8}
                onChange={(val) => {
                  handleFormChange("cardNumber", val);
                }}
                placeholderValue={"Enter Card Number"}
                feedback="Please give a valid card number"
                pattern="[0-9]*"
              />
            </Col>
          </Row>
          <Row className="gx-3 gy-3 mb-3">
            <Col lg={6} sm={12}>
              <FormText
                value={formData.cardHolderName}
                name={"cardHolderName"}
                label={"Card Holder Name"}
                onChange={(val) => {
                  handleFormChange("cardHolderName", val);
                }}
                placeholderValue={"Enter Card Holder Name"}
              />
            </Col>
            <Col lg={6} sm={12}>
              <FormDate
                value={formData.expiryDate}
                name={"expiryDate"}
                label={"Expiry Date"}
                onChange={(val) => {
                  handleFormChange("expiryDate", val);
                }}
                placeholderValue={"Enter Card Expiry Date"}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={6} sm={12}>
              <FormNumber
                value={formData.cvc}
                name={"cvc"}
                label={"CVC"}
                onChange={(val) => {
                  handleFormChange("cvc", val);
                }}
                placeholderValue={"Enter Security Code"}
              />
            </Col>
          </Row>

          <FooterButtons onClose={onClose} onSave={handleSubmit} />
        </Form>
      </ModalBody>
    </Modal>
  );
};

export default AddEditCardModal;
