import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { otherInvestmentTypes } from "./TypesOfInvestments";
import HkTooltip from "../../../components/@hk-tooltip/HkTooltip";
import { Info } from "react-feather";

const OtherInvestments = ({ onChange = () => {}, toggleInfo = () => {} }) => {
  const [stockItems, setStockItems] = useState([]);

  useEffect(() => {
    setStockItems(otherInvestmentTypes);
  }, []);

  const handleChange = (item) => {
    setStockItems(stockItems.map((ele) => (ele.id === item.id ? item : ele)));
    onChange(item);
  };

  return (
    <div className="mt-5">
      <h5>Others</h5>
      <Row className="row-cols-xxl-6 row-cols-xl-4 row-cols-lg-3 row-cols-md-3 row-cols-sm-2 row-cols-xs-1 mb-3 gx-3 mt-3">
        {stockItems?.map((item) => (
          <Col key={item?.id}>
            {/* classname-card-border */}
            <Card className="contact-card mb-4 w-200p text-center">
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center">
                  <Form.Check
                    type="checkbox"
                    className="form-check-lg d-flex justify-content-start"
                  >
                    <Form.Check.Input
                      type="checkbox"
                      className="check-select"
                      checked={item.isSelected}
                      onChange={(e) =>
                        handleChange({
                          ...item,
                          isSelected: e.target.checked,
                        })
                      }
                    />
                  </Form.Check>
                  <Button
                      as="a"
                      variant="flush-dark"
                      className="btn-icon btn-rounded flush-soft-hover fmapp-info-toggle"
                      onClick={() => toggleInfo(item.name)}
                    >
                      <HkTooltip placement="top" title="Info">
                        <span className="icon text-grey">
                          <span className="feather-icon">
                            <Info />
                          </span>
                        </span>
                      </HkTooltip>
                  </Button>
                </div>
                <i className={item.icon} />
                <p className="mt-3">{item.name}</p>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default OtherInvestments;
