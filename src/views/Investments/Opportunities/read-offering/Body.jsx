import React from "react";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { Rating } from "react-simple-star-rating";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Nav,
  Row,
  Tab,
  Form,
} from "react-bootstrap";
import { Bookmark, Share } from "react-feather";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import HkBadge from "../../../../components/@hk-badge/@hk-badge";

//Images
import symbolAvatar15 from "../../../../assets/dist/img/symbol-avatar-15.png";
import slide1 from "../../../../assets/dist/img/slide1.jpg";
import slide2 from "../../../../assets/dist/img/slide2.jpg";
import slide3 from "../../../../assets/dist/img/slide3.jpg";
import slide4 from "../../../../assets/dist/img/slide4.jpg";

// Tabs
import Company from "./Company";
import ThePitch from "./ThePitch";
import Offering from "./Offering";
import Documents from "./Documents";
import SimilarCompanies from "./SimilarCompanies";
import { dealTermsItems, relatedCompanies } from "./data";

const imageList = [
  { id: 1, src: slide1, alt: "slide1" },
  { id: 2, src: slide2, alt: "slide2" },
  { id: 3, src: slide3, alt: "slide3" },
  { id: 4, src: slide4, alt: "slide4" },
];

const Body = () => {
  return (
    <>
      <div className="integrations-body">
        <SimpleBar className="nicescroll-bar">
          <Container className="mt-md-3 px-0 mt-3">
            {/* row-1 */}
            <Row className="m-0 p-0">
              {/* left side: company logo */}
              <Col lg={9}>
                <div className="media">
                  <div className="media-head me-3">
                    <div className="avatar avatar-logo">
                      <span className="initial-wrap bg-success-light-5">
                        <img src={symbolAvatar15} alt="logo" />
                      </span>
                    </div>
                  </div>
                  <div className="media-body">
                    <h3 className="hd-bold mb-0">Kickstarter</h3>
                    <span>by Hencework</span>
                    <div className="d-flex align-items-center mt-1">
                      <div className="d-flex align-items-center">
                        <Rating
                          initialValue={3}
                          readonly
                          size="20"
                          className="d-flex align-items-center me-2"
                        />
                        <span>3,123</span>
                      </div>
                      <div className="d-sm-flex align-items-center d-none">
                        <span className="opacity-15 mx-2">●</span>
                        <span className="d-flex align-items-center fs-8">
                          <i className="ri-download-cloud-2-line fs-7 me-1 text-primary" />
                          15M Downloads
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
              <Col lg={3}>
                <div className="d-flex mt-3">
                  <Button variant="light" size="sm" className="btn-block">
                    <span>
                      <span className="icon">
                        <span className="feather-icon">
                          <Share />
                        </span>
                      </span>
                      <span>Share</span>
                    </span>
                  </Button>
                  <Button
                    variant="light"
                    size="sm"
                    className="btn-block ms-2 mt-0"
                  >
                    <span>
                      <span className="icon">
                        <span className="feather-icon">
                          <Bookmark />
                        </span>
                      </span>
                      <span>Bookmark</span>
                    </span>
                  </Button>
                </div>
              </Col>
            </Row>

            {/* row-2 */}
            <Row>
              {/* left side: carousel and tabs */}
              <Col xl={9} lg={8}>
                {/* carousel */}
                <div className="product-detail-slider">
                  <Carousel
                    showArrows={false}
                    showIndicators={false}
                    showStatus={false}
                    emulateTouch={true}
                    className="mt-6"
                  >
                    {imageList.map((item) => (
                      <div key={item.id}>
                        <img src={item.src} alt={item.alt} />
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div className="separator" />

                {/* TABS */}
                <Tab.Container defaultActiveKey="tabit1">
                  {/* tabs header */}
                  <Nav
                    variant="pills"
                    className="nav nav-light justify-content-center"
                  >
                    <Nav.Item>
                      <Nav.Link eventKey="tabit1">
                        <span className="nav-link-text">Company</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tabit2">
                        <span className="nav-link-text">The Pitch</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tabit3">
                        <span className="nav-link-text">Offering</span>
                      </Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link eventKey="tabit4">
                        <span className="nav-link-text">Documents</span>
                      </Nav.Link>
                    </Nav.Item>
                  </Nav>

                  {/* tabs body */}
                  <Tab.Content className="py-7">
                    <Tab.Pane eventKey="tabit1">
                      <Company />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabit2">
                      <ThePitch />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabit3">
                      <Offering />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabit4">
                      <Documents />
                    </Tab.Pane>
                  </Tab.Content>
                </Tab.Container>
              </Col>
              {/* right side: invest, deal terms info and related section */}
              <Col xl={3} lg={4}>
                <div className="content-aside">
                  {/* deadline and invest section */}
                  <Card className="card-border">
                    <Card.Body>
                      {/* deadline section */}
                      <div
                        style={{ border: "1px solid #eee" }}
                        className="mb-3 p-3 bg-dark"
                      >
                        <div className="d-flex justify-content align-items-center">
                          <i className="bi-clock text-danger me-2" />
                          <p className="text-yellow">LAST CHANCE</p>
                        </div>
                        <div
                          style={{ border: "1px solid #eee" }}
                          className="mt-3 p-2"
                        >
                          <div className="text-center">
                            <p className="text-white">CLOSING ON 23 FEB</p>
                            <p className="text-white fs-7">
                              <span className="text-grey">@</span> 11:59 PM NEW
                              YORK TIME
                            </p>
                          </div>
                          <div className="d-flex justify-content-evenly mt-2">
                            <div>
                              <h5 className="m-0 text-center text-yellow">
                                11
                              </h5>
                              <p className="text-grey">Days</p>
                            </div>
                            <div>
                              <h5 className="m-0 text-center text-yellow">
                                15
                              </h5>
                              <p className="text-grey">Hours</p>
                            </div>
                            <div>
                              <h5 className="m-0 text-center text-yellow">
                                46
                              </h5>
                              <p className="text-grey">Mins</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* invest section */}
                      <div>
                        <p className="text-success mb-3">
                          FIRST GOAL HIT (You can still invest)
                        </p>
                        <h4 className="m-0">$830,141</h4>
                        <p>Raised from 917 investors</p>

                        <div className="d-flex justify-content-between align-items-center mt-4">
                          <div xl={4} lg={4} sm={4} md={4} xs={6}>
                            <h6 className="m-0">INVEST</h6>
                            <p>min $250</p>
                          </div>
                          <div xl={8} lg={8} sm={8} md={8} xs={6}>
                            <Form
                              className="mx-3 flex-grow-1 w-150p"
                              role="search"
                            >
                              <Form.Control type="text" placeholder="$0" />
                            </Form>
                          </div>
                        </div>

                        <Button
                          style={{ height: "5.5vh" }}
                          className="btn-block mt-6"
                        >
                          INVEST NOW
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                  {/* deal terms */}
                  <Card className="card-border">
                    <Card.Body>
                      {/* deal terms heading */}
                      <h6 style={{ fontSize: "17px" }} className="mb-4">
                        Deal Terms
                      </h6>

                      {/* deal terms body */}
                      <ul className="list-unstyled">
                        {dealTermsItems.map((item) => (
                          <li key={item.id} className="mb-3">
                            <div className="fs-7">{item.label}</div>
                            <div className="text-dark fw-medium">
                              {item.value}
                            </div>
                          </li>
                        ))}
                        <li>
                          <a
                            href="#some"
                            className="d-flex align-items-center link-danger"
                          >
                            <span className="d-flex">
                              <i className="ri-information-line fs-7 me-1 lh-1" />
                            </span>
                            Report abuse
                          </a>
                        </li>
                      </ul>
                    </Card.Body>
                  </Card>

                  {/* related companies */}
                  <Card className="card-border">
                    <Card.Body>
                      <h6 className="mb-4">Related</h6>
                      <ListGroup as="ul" variant="flush">
                        {relatedCompanies.map((item) => (
                          <ListGroup.Item key={item.id} as="li" className="border-0 px-0">
                            <Link to="#">
                              <div className="media align-items-center">
                                <div className="media-head me-3">
                                  {item.image}
                                </div>
                                <div className="media-body d-flex justify-content-between align-items-center">
                                  <div>
                                    <h6 className="mb-0">{item.name}</h6>
                                    <div className="fs-7 text-muted">
                                      {item.type}
                                    </div>
                                    <div className="d-flex align-items-center fs-8 text-muted">
                                      <i className="ri-download-cloud-2-line fs-7 me-1 text-primary" />
                                      {item.downloads} Downloads
                                    </div>
                                  </div>
                                  <HkBadge size="sm" bg={item.ratingBg}>
                                    <span>
                                      <span className="icon">
                                        <i className="ri-star-s-fill" />
                                      </span>
                                      {item.rating}
                                    </span>
                                  </HkBadge>
                                </div>
                              </div>
                            </Link>
                          </ListGroup.Item>
                        ))}
                      </ListGroup>
                    </Card.Body>
                  </Card>

                  {/* categories */}
                  <Card className="card-border mt-3">
                    <Card.Body>
                      <h6 className="mb-4">Categories</h6>
                      <div className="tag-cloud">
                        <HkBadge
                          as={Link}
                          to="#"
                          bg="primary"
                          soft
                          className="me-1"
                        >
                          Jampack
                        </HkBadge>
                        <HkBadge
                          as={Link}
                          to="#"
                          bg="primary"
                          soft
                          className="me-1"
                        >
                          Bootstrap 5
                        </HkBadge>
                        <HkBadge
                          as={Link}
                          to="#"
                          bg="primary"
                          soft
                          className="me-1"
                        >
                          Admin Template
                        </HkBadge>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>

            {/* similar companies */}
            <SimilarCompanies />
          </Container>
        </SimpleBar>
      </div>
    </>
  );
};

export default Body;
