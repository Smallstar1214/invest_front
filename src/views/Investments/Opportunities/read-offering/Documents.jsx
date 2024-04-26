import React from "react";
import { MoreHorizontal } from "react-feather";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import classNames from "classnames";
import { documents, documentActionItems } from "./data";
import dummy from "../../../../assets/dummy.pdf";

const Documents = () => {
  const displayDocument = () => {
    window.open(dummy, "_blank");
  };

  return (
    <>
      <div className="title title-lg">
        <span>Company Documents</span>
      </div>
      <div>
        <Row className="gx-3 row-cols-xxl-3 row-cols-xl-3 row-cols-lg-3 row-cols-md-2 row-cols-1 mt-4">
          {documents.map((item) => (
            <Col key={item.id}>
              <Card
                className="file-compact-card card-border"
                style={{ cursor: "pointer" }}
              >
                <Card.Body className=" d-flex justify-content-between">
                  <div
                    className="media fmapp-info-trigger"
                    onClick={displayDocument}
                  >
                    <div className="media-head me-3">
                      <div
                        className={classNames(
                          "avatar avatar-icon avatar-sm",
                          item.bgColor
                        )}
                      >
                        <span className="initial-wrap">
                          <i className={item.icon} />
                        </span>
                      </div>
                    </div>
                    <div className="media-body">
                      <div className="file-name">{item.fileName}</div>
                      <div className="text-truncate fs-8 mb-2">
                        {item.fileSize}
                      </div>
                    </div>
                  </div>

                  {/* action items dropdown */}
                  <Dropdown>
                    <Dropdown.Toggle
                      variant="flush-dark"
                      size="xs"
                      className="btn-icon btn-rounded flush-soft-hover flex-shrink-0 no-caret"
                    >
                      <span className="icon">
                        <span className="feather-icon">
                          <MoreHorizontal />
                        </span>
                      </span>
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      {documentActionItems.map((item) => (
                        <Dropdown.Item onClick={item.name === "Preview" ? displayDocument : null} key={item.id}>
                          <span className="feather-icon dropdown-icon">
                            {item.icon}
                          </span>
                          <span>{item.name}</span>
                        </Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </>
  );
};

export default Documents;
