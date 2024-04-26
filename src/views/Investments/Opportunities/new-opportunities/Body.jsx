import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { popularCompanies, recommendedList } from "./data";

const Body = () => {
  const history = useHistory();

  return (
    <div className="integrations-body">
      <SimpleBar className="nicescroll-bar">
        <Container className="mt-md-7 mt-3">
          {/* recommended for you */}

          {/* title */}
          <div className="d-flex flex-md-nowrap flex-wrap align-items-center justify-content-between mb-5">
            <div>
              <h5>Recommended for you</h5>
              <p>
                Based on your investment risk profile, these are our
                recommendations.
              </p>
            </div>
            <Link to="#" className="fs-7 flex-shrink-0">
              <u>View All</u>
            </Link>
          </div>

          {/* body */}
          <Row>
            {recommendedList.map((item) => (
              <Col key={item?.id} xxl={3} xl={4} md={6}>
                <Card
                  style={{ minHeight: "26vh" }}
                  className="card-border card-int mb-4"
                >
                  <Card.Body>
                    <div className="avatar avatar-sm avatar-logo mb-3">
                      <span className="initial-wrap">
                        <img
                          style={{ height: "3.5vh" }}
                          src={item?.logo}
                          alt="logo"
                        />
                      </span>
                    </div>
                    <div className="app-name">{item?.appName}</div>
                    <div className="app-cat">{item?.appCategory}</div>
                    <p className="p-sm multine-ellipsis">{item?.description}</p>
                  </Card.Body>
                  <div className="card-footer justify-content-between border-0">
                    <span className="d-flex align-items-center fs-8">
                      <i className="ri-download-cloud-2-line fs-7 me-2" />
                      {item?.numberOfInvestors} Invested
                    </span>
                    <Button
                      onClick={() =>
                        history.push("/opportunities/new/read-offering")
                      }
                      variant="outline-secondary"
                      size="sm"
                    >
                      {item?.buttonLabel}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* popular companies */}

          {/* title */}
          <div className="d-flex align-items-center justify-content-between mt-6 mb-5">
            <div>
              <h5>Popular Companies</h5>
              <p>
                Used by millions of people around the globe and liked by them.
              </p>
            </div>
            <Link to="#" className="fs-7 flex-shrink-0">
              <u>View All</u>
            </Link>
          </div>

          {/* body */}
          <Row>
            {popularCompanies.map((item) => (
              <Col key={item.id} xxl={3} xl={4} md={6}>
                <Card className="card-border card-int mb-4">
                  <Card.Body>
                    {item.image}
                    <div className="app-name">{item.name}</div>
                    <div className="app-cat">{item.category}</div>
                    <p className="p-sm multine-ellipsis">{item.description}</p>
                  </Card.Body>
                  <div className="card-footer justify-content-between border-0">
                    <span className="d-flex align-items-center fs-8">
                      <i className="ri-download-cloud-2-line fs-7 me-2" />
                      {item.numberOfInvestors} Invested
                    </span>
                    <Button
                      onClick={() =>
                        history.push("/opportunities/new/read-offering")
                      }
                      variant="outline-secondary"
                      size="sm"
                    >
                      {item.buttonLabel}
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </SimpleBar>
    </div>
  );
};

export default Body;
