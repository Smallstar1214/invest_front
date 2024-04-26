import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { Inbox, MoreVertical, Star, UserCheck } from "react-feather";
import { Button, Card, Col, Dropdown, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";
import InvestorDetails from "./InvestorDetails";
import { investors } from "./InvestorList";

const dropdownItems = [
  { label: "Reply", value: "reply", className: "icon wb-reply" },
  { label: "Forward", value: "forward", className: "icon wb-share" },
  { label: "Delete", value: "delete", className: "icon wb-trash" },
];

const InvestorCardsBody = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <>
      <div className="contact-body">
        <SimpleBar className="nicescroll-bar">
          <div className="contact-card-view">
            <Row className="mb-3">
              <Col xs={7} mb={3}>
                <div className="contact-toolbar-left">
                  <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                    <Form.Select size="sm" className="w-120p">
                      <option value={1}>Bulk actions</option>
                      <option value={2}>Edit</option>
                      <option value={3}>Move to trash</option>
                    </Form.Select>
                    <Button size="sm" variant="light" className="ms-2">
                      Apply
                    </Button>
                  </Form.Group>
                  <Form.Group className="d-xxl-flex d-none align-items-center mb-0">
                    <label className="flex-shrink-0 mb-0 me-2">Sort by:</label>
                    <Form.Select size="sm" className="w-130p">
                      <option value={1}>Date Created</option>
                      <option value={2}>Date Edited</option>
                      <option value={3}>Frequent Contacts</option>
                      <option value={4}>Recently Added</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Select
                    size="sm"
                    className="d-flex align-items-center w-130p"
                  >
                    <option value={1}>Export to CSV</option>
                    <option value={2}>Export to PDF</option>
                    <option value={3}>Send Message</option>
                    <option value={4}>Delegate Access</option>
                  </Form.Select>
                </div>
              </Col>
              <Col xs={5} mb={3}>
                <div className="contact-toolbar-right">
                  <div id="datable_1_filter" className="dataTables_filter">
                    <label>
                      <Form.Control
                        size="sm"
                        type="search"
                        placeholder="Search"
                      />
                    </label>
                  </div>
                  {/* <div className="dataTables_length" id="datable_1_length">
                    <label>
                      View
                      <Form.Select size="sm" name="datable_1_length">
                        <option value={10}>10</option>
                        <option value={25}>25</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                      </Form.Select>
                    </label>
                  </div>
                  <div
                    className="dataTables_info"
                    id="datable_1_info"
                    role="status"
                    aria-live="polite"
                  >
                    1 - 10 of 11
                  </div> */}
                  <div
                    className="dataTables_paginate paging_simple_numbers"
                    id="datable_1_paginate"
                  >
                    <ul className="pagination custom-pagination pagination-simple m-0">
                      <li
                        className="paginate_button page-item previous disabled"
                        id="datable_1_previous"
                      >
                        <a
                          href="#some"
                          data-dt-idx={0}
                          tabIndex={0}
                          className="page-link"
                        >
                          <i className="ri-arrow-left-s-line" />
                        </a>
                      </li>
                      <li className="paginate_button page-item active">
                        <a
                          href="#some"
                          data-dt-idx={1}
                          tabIndex={0}
                          className="page-link"
                        >
                          1
                        </a>
                      </li>
                      <li className="paginate_button page-item ">
                        <a
                          href="#some"
                          data-dt-idx={2}
                          tabIndex={0}
                          className="page-link"
                        >
                          2
                        </a>
                      </li>
                      <li
                        className="paginate_button page-item next"
                        id="datable_1_next"
                      >
                        <a
                          href="#some"
                          data-dt-idx={3}
                          tabIndex={0}
                          className="page-link"
                        >
                          <i className="ri-arrow-right-s-line" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </Col>
            </Row>
            <Row className="row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 mb-5 gx-3">
              {investors.map((item, index) => (
                <Col key={item?.id}>
                  <Card className="card-border contact-card">
                    <Card.Body className="text-center">
                      <div className="card-action-wrap">
                        <Dropdown>
                          <Dropdown.Toggle
                            variant="flush-dark"
                            className="btn-icon btn-rounded flush-soft-hover no-caret "
                          >
                            <span className="btn-icon-wrap">
                              <span className="feather-icon">
                                <MoreVertical />
                              </span>
                            </span>
                          </Dropdown.Toggle>
                          <Dropdown.Menu align="end">
                            {dropdownItems.map((item, index) => (
                              <Dropdown.Item key={index}>
                                <i
                                  className={item?.className}
                                  aria-hidden="true"
                                />
                                {item?.label}
                              </Dropdown.Item>
                            ))}
                          </Dropdown.Menu>
                        </Dropdown>
                      </div>
                      <div
                        className={classNames(
                          "avatar avatar-xl avatar-rounded",
                          `avatar-${item?.initAvatar?.variant}`
                        )}
                      >
                        <span className="initial-wrap">
                          {item?.initAvatar?.title}
                        </span>
                      </div>
                      <div className="user-name">
                        <span className="contact-star">
                          <span className="feather-icon">
                            <Star />
                          </span>
                        </span>
                        {item?.name}
                      </div>
                      <div className="user-email">{item?.email}</div>
                      <div className="user-contact">{item?.phone}</div>
                      <div className="user-desg">
                        <span className="badge badge-primary badge-indicator badge-indicator-lg me-2" />
                        {item?.category}
                      </div>
                    </Card.Body>
                    <Card.Footer className="text-muted position-relative">
                      <Link to="#" className="d-flex align-items-center">
                        <span className="feather-icon me-2">
                          <Inbox />
                        </span>
                        <span className="fs-7 lh-1">Message</span>
                      </Link>
                      <div className="v-separator-full m-0" />
                      <Link
                        to="#"
                        className="d-flex align-items-center"
                        onClick={() => {
                          setShowDetails(!showDetails);
                          setName(item?.name);
                          setEmail(item?.email);
                          setPhone(item?.phone);
                        }}
                      >
                        <span className="feather-icon me-2">
                          <UserCheck />
                        </span>
                        <span className="fs-7 lh-1">Profile</span>
                      </Link>
                    </Card.Footer>
                  </Card>
                </Col>
              ))}
            </Row>
            {/* pagination */}
            <Row>
              <Col
                sm={12}
                md={5}
                className="d-flex align-items-center justify-content-center justify-content-md-start"
              >
                <div className="dataTables_info">1 - 10 of 30</div>
              </Col>
              <Col sm={12} md={7}>
                <ul className="pagination custom-pagination pagination-simple mb-0 justify-content-center justify-content-md-end">
                  <li className="paginate_button page-item previous disabled">
                    <a
                      href="#some"
                      data-dt-idx={0}
                      tabIndex={0}
                      className="page-link"
                    >
                      <i className="ri-arrow-left-s-line" />
                    </a>
                  </li>
                  <li className="paginate_button page-item active">
                    <a
                      href="#some"
                      data-dt-idx={1}
                      tabIndex={0}
                      className="page-link"
                    >
                      1
                    </a>
                  </li>
                  <li className="paginate_button page-item ">
                    <a
                      href="#some"
                      data-dt-idx={2}
                      tabIndex={0}
                      className="page-link"
                    >
                      2
                    </a>
                  </li>
                  <li className="paginate_button page-item next">
                    <a
                      href="#some"
                      data-dt-idx={4}
                      tabIndex={0}
                      className="page-link"
                    >
                      <i className="ri-arrow-right-s-line" />
                    </a>
                  </li>
                </ul>
              </Col>
            </Row>
          </div>
        </SimpleBar>
      </div>

      <InvestorDetails
        name={name}
        email={email}
        phone={phone}
        show={showDetails}
        onHide={() => setShowDetails(!showDetails)}
      />
    </>
  );
};

export default InvestorCardsBody;
