import React, { useState } from "react";
import { Button, Col, Form, Modal, ModalBody, ModalHeader, Row } from "react-bootstrap";
import FormText from "../../../../components/Form/FormText.component";
import FormDate from "../../../../components/Form/FormDate.component";
import FormNumber from "../../../../components/Form/FormNumber.component";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { dateAfterOneYear } from "../../../../utils/common";

const InvestDialog = ({ open, onClose = () => {}, amount }) => {
  const formDataInitial = {
    cardNumber: "2501 4038 2121",
    cardHolderName: "Sam Smith",
    expiryDate: dateAfterOneYear,
    cvc: "204",
  };
  
  const history = useHistory();
  const [validated, setValidated] = useState(false);
  const [formData, setFormData] = useState(formDataInitial);

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

    if(formData && formData.cardNumber && formData.cardHolderName && formData.expiryDate && formData.cvc) {
      console.log({formData});
      onClose();
      message.success("Invested Successfully !");
    }
  };

  return (
    <Modal show={open} onHide={onClose} size="md">
      <ModalHeader closeButton>
        <span className="text-black title my-0">INVEST</span>
      </ModalHeader>
      <ModalBody
        style={{ color: "#3b3a39" }}
        className="p-3 ms-2 me-2"
        closeButton
      >
        {/* personal info section */}
        <div>
          <p
            style={{ fontSize: "18px", display: "flex", alignItems: "center" }}
          >
            Personal Information <i className="text-grey ms-2 ri-lock-line" />
          </p>
          <p className="text-muted">
            Required by United States banking laws. This information is kept
            secure. It will never be used for any purpose beyond executing your
            investment.
          </p>
          <Button
            className="mt-3 btn-soft-primary border-primary"
            onClick={() => {
                history.push('/kyc');
                onClose();
            }}
          >
            Verify My Identity
          </Button>
        </div>

        <div className="separator" />

        {/* card details */}
        <div>
          <p style={{ fontSize: "18px" }} className="mt-3 mb-3 title text-underline divider">
            <u>Payment Information</u>
          </p>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="gx-3 mb-3 gy-3">
              <Col lg={12} sm={12}>
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
              <Col lg={12} sm={12}>
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
            </Row>
            <Row className="gx-3 gy-3 mb-3">
              <Col lg={6} sm={12}>
                <FormDate
                  value={formData.expiryDate || formDataInitial.expiryDate}
                  name={"expiryDate"}
                  label={"Expiry Date"}
                  onChange={(val) => {
                    handleFormChange("expiryDate", val);
                  }}
                  placeholderValue={"Enter Card Expiry Date"}
                />
              </Col>
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
            
            <div className="d-flex justify-content-center mt-6 mb-2">
                <Button className="btn-block" onClick={handleSubmit}>
                    INVEST ${amount}
                </Button>
            </div>
          </Form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default InvestDialog;
