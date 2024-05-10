import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import visaCard from "../../../../assets/dist/img/card-visa.png";
import masterCard from "../../../../assets/dist/img/mastercard.png";
import amexCard from "../../../../assets/dist/img/card-ae.png";
import HkBadge from "../../../../components/@hk-badge/@hk-badge";
import AddEditCardModal from "./AddEditCardModal";
import { currentDate } from "../../../../utils/common";
import DeleteConfirmationDialog from "../../../../components/Modals/DeleteConfirmationDialog";
import { message } from "antd";

const creditCardsData = [
  {
    id: 1,
    cardType: "Visa",
    cardNumber: "21744213",
    cardHolderName: "Sam",
    badge: "Primary",
    expiryDate: "12/03/2025",
    lastUpdated: currentDate,
    cvc: 603,
  },
  {
    id: 2,
    cardType: "Master Card",
    cardNumber: "55221214",
    cardHolderName: "Sam",
    expiryDate: "22/04/2026",
    lastUpdated: currentDate,
    cvc: 201,
  },
  {
    id: 3,
    cardType: "American Express",
    cardNumber: "21911713",
    cardHolderName: "Sam",
    expiryDate: "22/04/2026",
    lastUpdated: currentDate,
    cvc: 105,
  },
];

const BillingInfo = () => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [creditCards, setCreditCards] = useState([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editObj, setEditObj] = useState({});

  useEffect(() => {
    setCreditCards(creditCardsData);
  }, []);

  const handleDelete = () => {
    const updated = creditCards.filter((ele) => ele.id !== editObj.id);
    setCreditCards(updated);
    message.success("Card Deleted Successfully !");
  };

  const handleSave = (row) => {
    if (editMode) {
      const cardsNew = [...creditCards];
      const updated = cardsNew.map((ele) => (ele.id === row.id ? row : ele));
      setCreditCards(updated);
      message.success("Card Updated Successfully !");
    } else {
      const updated = [...creditCards, row];
      setCreditCards(updated);
      message.success("Card Added Successfully !");
    }
  };

  return (
    <>
      {creditCards?.length > 0 ? (
        <Row>
          <Col lg={8}>
            <div className="title-lg fs-5 justify-content-between mb-5">
              <span>Saved Cards</span>
              <Button
                onClick={() => setShowEditModal(true)}
                variant="outline-light"
              >
                + Add new card
              </Button>
            </div>
            <ul className="advance-list">
              {creditCards.map((item, index) => (
                <li
                  key={index}
                  className="advance-list-item transform-none shadow-none py-3"
                >
                  <div className="d-flex align-items-center justify-content-between">
                    <div className="media align-items-center">
                      <div className="media-head me-5">
                        {item.cardType === "Master Card" ? (
                          <img
                            src={masterCard}
                            alt="mastercard"
                            className="img-fluid"
                          />
                        ) : item.cardType === "Visa" ? (
                          <img
                            src={visaCard}
                            alt="visa"
                            className="img-fluid"
                          />
                        ) : (
                          <img
                            src={amexCard}
                            alt="amex"
                            className="img-fluid"
                          />
                        )}
                      </div>
                      <div className="media-body">
                        <div>
                          <span className="text-dark fw-medium">
                            {"****" + item?.cardNumber?.slice(-4)}
                          </span>
                          {item?.badge && (
                            <HkBadge
                              bg="primary"
                              soft
                              className="rounded-0 ms-3"
                            >
                              {item?.badge}
                            </HkBadge>
                          )}
                        </div>
                      </div>
                    </div>
                    {/* icons */}
                    <div className="d-flex">
                      {/* edit icon */}
                      <span className="fs-7 text-muted me-5 d-xl-inline d-none">
                        Last updated {item.lastUpdated}
                      </span>
                      <div
                        title="Edit"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEditMode(true);
                          setEditObj(item);
                          setShowEditModal(true);
                        }}
                      >
                        <i className="edit-icon bi bi-pencil-square me-3 text-black" />
                      </div>
                      {/* delete icon */}
                      <div
                        title="Delete"
                        style={{ cursor: "pointer" }}
                        onClick={() => {
                          setEditObj(item);
                          setShowDeleteModal(true);
                        }}
                      >
                        <i className="delete-icon bi bi-trash3 text-danger" />
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <Button variant="primary">Save Changes</Button>
            </div>
          </Col>
        </Row>
      ) : (
        <p className="text-center text-lg md:text-md">
          You do not have any saved cards yet.
        </p>
      )}

      {showEditModal && (
        <AddEditCardModal
          open={showEditModal}
          editObj={editObj}
          editMode={editMode}
          onSave={handleSave}
          listSize={creditCards?.length}
          onClose={() => {
            setShowEditModal(false);
            setEditMode(false);
            setEditObj({});
          }}
        />
      )}

      {setShowDeleteModal && (
        <DeleteConfirmationDialog
          open={showDeleteModal}
          message="Are you sure you want to delete this card?"
          onDelete={handleDelete}
          onClose={() => {
            setShowDeleteModal(false);
            setEditObj({});
          }}
        />
      )}
    </>
  );
};

export default BillingInfo;
