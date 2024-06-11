import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Dropdown, Form, Modal, Row } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import SimpleBar from "simplebar-react";
import { popularCompanies, recommendedList } from "./data";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { MoreHorizontal, Plus, Trash2 } from "react-feather";

const Body = () => {

  const [showCreatOfferModal, setShowCreatOfferModal] = useState(false);
  const [showCreateButton, setShowCreateButton] = useState(false);

  const [editProjectName, setEditProjectName] = useState('');
  const [editProjectDescription, setEditProjectDescription] = useState('');
  const [editMinInvest, setEditMinInvest] = useState(0);
  const [editMaxInvest, setEditMaxInvest] = useState(0);
  const [editFundingGoal, setEditFundingGoal] = useState(0);
  const [editDeadline, setEditDeadline] = useState(new Date());
  const [editMinToken, setEditMinToken] = useState(0);
  const [editMaxToken, setEditMaxToken] = useState(0);

  const [companyName, setCompanyName] = useState('');
  const [role, setRole] = useState('');

  const [addCompanyTab, setAddCompanyTab] = useState(false);
  const [companyTabValue, setCompanyTabValue] = useState('');
  const [addPitchTab, setAddPitchTab] = useState(false);
  const [pitchTabValue, setPitchTabValue] = useState('');
  const [addOfferingTab, setAddOfferingTab] = useState(false);
  const [offeringTabValue, setOfferingTabValue] = useState('');

  const [offers, setOffers] = useState([]);

  const createNewOffer = async() => {

    const formData = {
      companyName: companyName,
      minInvest: editMinInvest,
      maxInvest: editMaxInvest,
      fundingGoal: editFundingGoal,
      endDate: editDeadline,
      minToken: editMinToken,
      maxToken: editMaxToken,
      companyTab: companyTabValue,
      pitchTab: pitchTabValue,
      offeringTab: offeringTabValue
    }

    try {
      // const res = await fetch('http://localhost:8080/offer/createNewOffer', {
      const res = await fetch('https://autoinvest.ai//offer/createNewOffer', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      res.json().then(data => {
        setOffers(data);
      })

    } catch(err) {
      console.log(err);
    }

    setEditMinInvest(0);
    setEditMaxInvest(0);
    setEditFundingGoal(0);
    setEditDeadline(new Date());
    setEditMinToken(0);
    setEditMaxToken(0);
    setShowCreateButton(false);
    setShowCreatOfferModal(false);

  }

  const getCompanyOffers = async (searchCompanyName) => {
    const formData = {searchCompanyName};

    try {
      // const res = await fetch('http://localhost:8080/offer/getCompanyOffers', {
      const res = await fetch('https://autoinvest.ai//offer/getCompanyOffers', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      res.json().then(data => {
        if(data.length === 0) {
          setShowCreateButton(true);
        }
        setOffers(data);
      })

    } catch (err) {
      console.log(err);
    }
  }

  const getAllOffers = async () => {
    try{
      // const res = await fetch('http://localhost:8080/offer/getAllOffers',{
      const res = await fetch('https://autoinvest.ai//offer/getAllOffers',{
        method: 'GET',
        headers: {
          'Content-type': 'application/json'
        }
      })

      res.json().then(data => {
        setOffers(data);
      })

    } catch(err) {
      console.log(err);
    }
  }

  const handleDeleteOffer = async(offerId) => {

    const formData = {offerId};
    try{
      // const res = await fetch('http://localhost:8080/offer/deleteOfferById', {
      const res = await fetch('https://autoinvest.ai//offer/deleteOfferById', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })
    } catch(err) {
      console.error(err);
    }

    if(role === "company") {
      getCompanyOffers(companyName);
    } else {
      getAllOffers();
    }
  }

  const history = useHistory();

  useEffect(() => {
    const loginCompanyName = localStorage.getItem('jampackUserName');
    const loginRole = localStorage.getItem('jampackRole');
    setCompanyName(loginCompanyName);
    setRole(loginRole);

    if(loginRole === "company") {
      getCompanyOffers(loginCompanyName);
    } else {
      getAllOffers();
    }

  },[])

  return (
    <>
      <div className="integrations-body">
        <SimpleBar className="nicescroll-bar">
          <Container className="mt-md-7 mt-3">
            {
              showCreateButton && (
                <div className="d-flex flex-md-nowrap flex-wrap align-items-center justify-content-end mb-2">
                  <Button
                    onClick={() => setShowCreatOfferModal(true)}
                    variant="outline-secondary"
                    size="sm"
                  >
                    Create Offering
                  </Button>
                </div>
              )
            }
          
            <Row>
              {
                offers && offers.map((offer) => (
                  <Col key={offer?.id} xxl={3} xl={4} md={6}>
                    <Card
                      style={{ minHeight: "26vh" }}
                      className="card-border card-int mb-4"
                    >
                      <Card.Body className="d-flex justify-content-between text-black">
                        <div>
                          <div className="avatar avatar-sm avatar-logo avatar-soft-primary mb-3">
                            {
                              (!offer?.logo || offer?.logo === "") ? (
                                <span className="initial-wrap">
                                  {offer?.companyName[0]}
                                </span>
                              ) : (
                                <span className="initial-wrap">
                                  <img
                                    style={{ height: "3.5vh" }}
                                    src={offer?.logo}
                                    alt="logo"
                                  />
                                </span>
                              )
                            }
                          </div>
                          <div className="app-name">{offer?.companyName}</div>
                          <div className="app-cat">{offer?.companyCategory}</div>
                          <p className="p-sm multine-ellipsis">{offer?.companyDescription}</p>
                        </div>
                        {
                          role === "investor" ? (
                            <></>
                          ) : (
                            <Dropdown>
                              <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret">
                                <span className="icon">
                                    <span className="feather-icon">
                                        <MoreHorizontal />
                                    </span>
                                </span>
                              </Dropdown.Toggle>
                              <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleDeleteOffer(offer?._id)}>
                                    <span className="feather-icon dropdown-icon">
                                        <Trash2 />
                                    </span>
                                    <span>Delete</span>
                                </Dropdown.Item>
                              </Dropdown.Menu>
                            </Dropdown>
                          )
                        }
                      </Card.Body>
                      <div className="card-footer justify-content-between border-0">
                        <span className="d-flex align-items-center fs-8">
                          <i className="ri-download-cloud-2-line fs-7 me-2" />
                          {offer?.investors.length} Invested
                        </span>
                        <Button
                          onClick={() =>
                            history.push("/opportunities/new/read-offering",{
                              dataKey: offer.companyName
                            })
                          }
                          variant="outline-secondary"
                          size="sm"
                        >
                          Read Offering
                        </Button>
                      </div>
                    </Card>
                  </Col>
                ))
              }
            </Row>

            {/* <div className="d-flex flex-md-nowrap flex-wrap align-items-center justify-content-between mb-5">
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

            <Row>
              {recommendedList.map((item) => (
                <Col key={item?.id} xxl={3} xl={4} md={6}>
                  <Card
                    style={{ minHeight: "26vh" }}
                    className="card-border card-int mb-4"
                  >
                    <Card.Body className="text-black">
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
            </Row> */}

            {/* popular companies */}

            {/* title */}
            {/* <div className="d-flex align-items-center justify-content-between mt-6 mb-5">
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

            <Row>
              {popularCompanies.map((item) => (
                <Col key={item.id} xxl={3} xl={4} md={6}>
                  <Card className="card-border card-int mb-4">
                    <Card.Body className="text-black">
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
            </Row> */}
          </Container>
        </SimpleBar>
      </div>

      <Modal show={showCreatOfferModal} onHide={() => setShowCreatOfferModal(false)} centered size="x1" dialogClassName="contact-detail-modal">
        <Modal.Body className="p-0">
          <header className="contact-header mb-4">
            <div className="d-flex align-items-center text-center">
              <span>Creat New Offer</span>
            </div>
          </header>
          <div className="contact-body contact-detail-body mx-2">
            <Row className="gx-3">
              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Label>Investment range</Form.Label>
              </Col>
              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Control
                  type="number"
                  value={editMinInvest}
                  onChange={e => setEditMinInvest(e.target.value)}
                />
              </Col>
              <Col lg={2} as={Form.Group} className="text-center mb-3">
                <Form.Label> ~ </Form.Label>
              </Col>
              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Control
                  type="number"
                  value={editMaxInvest}
                  onChange={e => setEditMaxInvest(e.target.value)}
                />
              </Col>

              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Label>Funding Goal</Form.Label>
              </Col>
              <Col lg={9} as={Form.Group} className="mb-3">
                <Form.Control
                  type="number"
                  value={editFundingGoal}
                  onChange={e => setEditFundingGoal(e.target.value)}
                />
              </Col>

              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Label>Deadline</Form.Label>
              </Col>
              <Col lg={9} as={Form.Group} className="mb-3">
                <Form.Control
                  type="date"
                  value={editDeadline}
                  onChange={e => setEditDeadline(e.target.value)}
                />
              </Col>

              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Label>Token range</Form.Label>
              </Col>
              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Control
                  type="number"
                  value={editMinToken}
                  onChange={e => setEditMinToken(e.target.value)}
                />
              </Col>
              <Col lg={2} as={Form.Group} className="mb-3">
                <Form.Label> ~ </Form.Label>
              </Col>
              <Col lg={3} as={Form.Group} className="mb-3">
                <Form.Control
                  type="number"
                  value={editMaxToken}
                  onChange={e => setEditMaxToken(e.target.value)}
                />
              </Col>
              <Col lg={4} as={Form.Group} className="mb-3">
                Company Tab
              </Col>
              <Col lg={6} as={Form.Group} className="mb-3"></Col>
              {
                !addCompanyTab && (
                  <Col lg={2} as={Form.Group} className="mb-3">
                    <Button
                      size="lg"
                      variant="primary"
                      className='btn btn-block mb-3'
                      onClick={() => setAddCompanyTab(true)}
                    >
                      <span className="icon">
                        <span className="feather-icon"><Plus /></span>
                      </span>
                    </Button>
                  </Col>
                )
              }
              {
                addCompanyTab && (
                  <Col lg={12} as={Form.Group} className="mb-3">
                    <ReactQuill
                      theme="snow"
                      value={companyTabValue}
                      onChange={(content) => setCompanyTabValue(content)}
                      modules={{
                        toolbar: [
                          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                          [{size: []}],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}, 
                            {'indent': '-1'}, {'indent': '+1'}],
                          ['link', 'image', 'video'],
                          ['clean']
                        ],
                      }}
                    />
                  </Col>
                )
              }

              <Col lg={4} as={Form.Group} className="mb-3">
                Pitch Tab
              </Col>
              <Col lg={6} as={Form.Group} className="mb-3"></Col>
              {
                !addPitchTab && (
                  <Col lg={2} as={Form.Group} className="mb-3">
                    <Button
                      size="lg"
                      variant="primary"
                      className='btn btn-block mb-3'
                      onClick={() => setAddPitchTab(true)}
                    >
                      <span className="icon">
                        <span className="feather-icon"><Plus /></span>
                      </span>
                    </Button>
                  </Col>
                )
              }
              {
                addPitchTab && (
                  <Col lg={12} as={Form.Group} className="mb-3">
                    <ReactQuill
                      theme="snow"
                      value={pitchTabValue}
                      onChange={(content) => setPitchTabValue(content)}
                      modules={{
                        toolbar: [
                          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                          [{size: []}],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}, 
                            {'indent': '-1'}, {'indent': '+1'}],
                          ['link', 'image', 'video'],
                          ['clean']
                        ],
                      }}
                    />
                  </Col>
                )
              }
              <Col lg={4} as={Form.Group} className="mb-3">
                Offering Tab
              </Col>
              <Col lg={6} as={Form.Group} className="mb-3"></Col>
              {
                !addOfferingTab && (
                  <Col lg={2} as={Form.Group} className="mb-3">
                    <Button
                      size="lg"
                      variant="primary"
                      className='btn btn-block mb-3'
                      onClick={() => setAddOfferingTab(true)}
                    >
                      <span className="icon">
                        <span className="feather-icon"><Plus /></span>
                      </span>
                    </Button>
                  </Col>
                )
              }
              
              {
                addOfferingTab && (
                  <Col lg={12} as={Form.Group} className="mb-3">
                    <ReactQuill
                      theme="snow"
                      value={offeringTabValue}
                      onChange={(content) => setOfferingTabValue(content)}
                      modules={{
                        toolbar: [
                          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                          [{size: []}],
                          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                          [{'list': 'ordered'}, {'list': 'bullet'}, 
                            {'indent': '-1'}, {'indent': '+1'}],
                          ['link', 'image', 'video'],
                          ['clean']
                        ],
                      }}
                    />
                  </Col>
                )
              }

              <Col lg={9} as={Form.Group} className="mb-3">
              </Col>
              <Col lg={3} as={Form.Group} className="mb-3">
                <Button 
                  size='lg' 
                  variant='primary' 
                  className='btn-rounded btn-block mb-3'
                  onClick={() => createNewOffer()}
                >
                  <span>Confirm</span>
                </Button>
              </Col>
            </Row>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Body;
