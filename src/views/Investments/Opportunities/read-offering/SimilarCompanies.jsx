import React from "react";
import { Rating } from "react-simple-star-rating";
import { Card, Col, Row } from "react-bootstrap";
import { similarCompanies } from "./data";

const SimilarCompanies = () => {
  return (
    <>
      <h6 className="text-center mt-10 mb-4">Similar Companies Like This</h6>
      <Row>
        {similarCompanies.map((item) => (
          <Col xl={3} md={6}>
            <Card className="card-border text-center">
              <Card.Body>
                {item.image}
                <div className="app-name">{item.name}</div>
                <div className="app-cat">{item.type}</div>
                <div className="d-flex align-items-center justify-content-center">
                  <Rating
                    initialValue={item.ratingValue}
                    readonly
                    size="20"
                    className="d-flex align-items-center me-2"
                  />
                  <span className="fs-8">{item.numberOfRatings}</span>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default SimilarCompanies;
