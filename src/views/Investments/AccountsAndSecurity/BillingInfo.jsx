import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import visaCard from "../../../assets/dist/img/card-visa.png";
import masterCard from "../../../assets/dist/img/mastercard.png";
import HkBadge from "../../../components/@hk-badge/@hk-badge";

const creditCards = [
  {
    cardImage: visaCard,
    cardNumber: "****4213",
    badge: "Primary",
    date: "12/03/2023",
  },
  { cardImage: masterCard, cardNumber: "****1214", date: "22/04/2023" },
];

const BillingInfo = () => {
  return (
    <>
      <Row>
        <Col lg={8}>
          <div className="title-lg fs-5 justify-content-between mb-5">
            <span>Saved Cards</span>
            <Button variant="outline-light">+ Add new card</Button>
          </div>
          <ul className="advance-list">
            {creditCards.map((item, index) => (
              <li key={index} className="advance-list-item transform-none shadow-none py-3">
                <div className="d-flex align-items-center justify-content-between">
                  <div className="media align-items-center">
                    <div className="media-head me-5">
                      <img src={item?.cardImage} alt="user" className="img-fluid" />
                    </div>
                    <div className="media-body">
                      <div>
                        <span className="text-dark fw-medium">{item?.cardNumber}</span>
                        {item?.badge && <HkBadge bg="primary" soft className="rounded-0 ms-3">{item?.badge}</HkBadge>}
                      </div>
                    </div>
                  </div>
                  <div className="d-lg-inline d-none">
                    <span className="fs-7 text-muted me-5 d-xl-inline d-none">
                      Last updated {item?.date}
                    </span>
                    <Button variant="outline-danger" className="mnw-100p me-2">
                      Delete
                    </Button>
                    <Button variant="light" className="mnw-100p">
                      Edit
                    </Button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6">
            <Button variant="primary" className="">
              Save changes
            </Button>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default BillingInfo;
