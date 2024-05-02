import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import { Inbox, MoreVertical, Star, UserCheck } from "react-feather";
import { Card, Col, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
// import classNames from "classnames";
import InvestorDetails from "./InvestorDetails";
import { Pagination } from "@mui/material";
// import { investors } from "./InvestorList";

const dropdownItems = [
  { label: "Reply", value: "reply", className: "icon wb-reply"},
  { label: "Forward", value: "forward", className: "icon wb-share"},
  { label: "Delete", value: "delete", className: "icon wb-trash"},
];

const InvestorCardsBody = () => {
  const [showDetails, setShowDetails] = useState(false);
  const [id, setId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [investors, setInvestors] = useState(null);
  const [displayInvestors, setDisplayInvestors] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(1);

  const [role, setRole] = useState("");

  const gotoPage = (e, page) => {
    setPage(page);
    setDisplayInvestors(investors?.slice(10 * (page - 1), 10 * page));
  }

  const deleteInvestor = async(investorId, label) => {
    if(label === "Delete") {
      const formData = {investorId};
      try {
        // const res = await fetch('http://localhost:8080/investor/deleteInvestorById',{
        const res = await fetch('http://104.131.170.242:8080/investor/deleteInvestorById',{
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formData)
        })
      } catch(err) {
        console.error(err);
      }
    }

    getAllInvestors();
  }

  const getAllInvestors = async() => {
    try{
      // const res = await fetch('http://localhost:8080/investor/getAllInvestors', {
      const res = await fetch('http://104.131.170.242:8080/investor/getAllInvestors', {
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      });

      if(res.ok) {
        res.json().then(data => {
          setInvestors(data);
          setDisplayInvestors(data.slice(0, 10));
          if(data?.length % 10 === 0 ) {
            setPageCount(Math.floor(data?.length / 10));
          } else {
            setPageCount(Math.floor(data?.length / 10) + 1);
          }
          setPage(1);
        })
      }
    } catch (err) {
      console.error('Error during fetching investors');
    }
  }

  const HideDetail = () => {
    getAllInvestors();
    setShowDetails(!showDetails);
  }

  useEffect(() => {
    getAllInvestors();
    setRole(localStorage.getItem('jampackRole'));
  }, []);

  return (
    <>
      <div className="contact-body">
        <SimpleBar className="nicescroll-bar">
          <div className="contact-card-view">
            {/* <Row className="mb-3">
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
            </Row> */}
            <Row className="row-cols-xxl-5 row-cols-xl-4 row-cols-lg-3 row-cols-md-2 row-cols-1 mb-5 gx-3">
              {displayInvestors?.map((item, index) => (
                <Col key={item?._id}>
                  <Card className="card-border contact-card">
                    <Card.Body className="text-center">
                      { role === "admin" ? (
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
                              {dropdownItems.map((dropdownItem, index) => (
                                <Dropdown.Item 
                                  key={index} 
                                  onClick={() => deleteInvestor(item?._id, dropdownItem?.label)}
                                >
                                  <i
                                    className={dropdownItem?.className}
                                    aria-hidden="true"
                                  />
                                  {dropdownItem?.label}
                                </Dropdown.Item>
                              ))}
                            </Dropdown.Menu>
                          </Dropdown>
                        </div>
                      ) : (
                        <></>
                      )}
                      
                      <div className="avtuploder-circle">
                        {
                            item?.avatar === "" ? (
                                <div className='avatar avatar-xl avatar-rounded avatar-soft-primary'>
                                    <span className='initial-wrap'>
                                        {item?.firstName[0]}
                                    </span>
                                </div>
                            ) : (
                                <div className='avatar avatar-xl avatar-rounded avatar-soft-primary avtuploder-wrapper'>
                                    <img src={item?.avatar} alt='demo Img' className='avtuploder-preview' width={115} height={115} />
                                </div>
                            )
                        }
                      </div>
                      <div className="user-name">
                        <span className="contact-star">
                          <span className="feather-icon">
                            <Star />
                          </span>
                        </span>
                        {item?.firstName +" " + item?.lastName}
                      </div>
                      <div className="user-email">{item?.email}</div>
                      <div className="user-contact"> +{item?.phone}</div>
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
                          setId(item?._id);
                          setAvatar(item?.avatar);
                          setFirstName(item?.firstName);
                          setLastName(item?.lastName);
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
              </Col>
              <Col sm={12} md={7}>
                <Pagination
                  count={pageCount} 
                  page={page}
                  onChange={gotoPage}
                  color="primary"
                />
              </Col>
            </Row>
          </div>
        </SimpleBar>
      </div>

      <InvestorDetails
        id={id}
        firstName={firstName}
        lastName={lastName}
        email={email}
        phone={phone}
        avatar={avatar}
        show={showDetails}
        onHide={() => HideDetail()}
      />
    </>
  );
};

export default InvestorCardsBody;
