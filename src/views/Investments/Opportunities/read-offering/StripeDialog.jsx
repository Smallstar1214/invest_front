import React from "react";
import {
  Button,
  Modal,
  ModalBody,
  ModalHeader,
} from "react-bootstrap";
import { message } from "antd";
import { useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const StripeDialog = ({ open, onClose = () => {}, investAmount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const history = useHistory();

  console.log("amount = ", investAmount);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);
    console.log({cardElement})

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      history.push('/opportunities/new/read-offering/success');
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
            className="title"
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
              history.push("/kyc");
              onClose();
            }}
          >
            Verify My Identity
          </Button>
        </div>

        <div className="separator mt-5" />

        {/* card details */}
        <div>
          <p
            style={{ fontSize: "18px" }}
            className="mt-5 mb-3 title text-underline divider"
          >
            <u>Payment Information</u>
          </p>
          <form onSubmit={handleSubmit}>
            <CardElement />

            <p className="mt-4 fs-5">Amount Payable : ${investAmount}</p>

            <Button className="mt-5 mb-3 btn-block" type="submit" disabled={!stripe}>
              CONFIRM
            </Button>
          </form>
        </div>
      </ModalBody>
    </Modal>
  );
};

export default StripeDialog;