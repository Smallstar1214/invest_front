import React, { useState, useRef, useEffect } from "react";
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
import { Bookmark, Edit2, Share } from "react-feather";
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
// import InvestDialog from "./InvestDialog";
import StripeDialog from "./StripeDialog";
import axios from 'axios';

// const imageList = [
//   { id: 1, src: slide1, alt: "slide1" },
//   { id: 2, src: slide2, alt: "slide2" },
//   { id: 3, src: slide3, alt: "slide3" },
//   { id: 4, src: slide4, alt: "slide4" },
// ];

const Body = (data) => {

  const fileInputRef = useRef(null);

  const [companyName, setCompanyName] = useState('');

  const [investAmount, setInvestAmount] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [role, setRole] = useState("");
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const [offerData, setOfferData] = useState(null);

  const [imageList, setImageList] = useState([]);

  const [openEditMinInvest, setOpenEditMinInvest] = useState(false);
  const [editMinInvest, setEditMinInvest] = useState(0);

  const [openEditMaxInvest, setOpenEditMaxInvest] = useState(false);
  const [editMaxInvest, setEditMaxInvest] = useState(0);

  const [openEditFundingGoal, setOpenEditFundingGoal] = useState(false);
  const [editFundingGoal, setEditFundingGoal] = useState(0);

  const [openEditDeadline, setOpenEditDeadline] = useState(false);
  const [editDeadline, setEditDeadline] = useState(new Date());

  const [openEditTokenRange, setOpenEditTokenRange] = useState(false);
  const [editMinToken, setEditMinToken] = useState(0);
  const [editMaxToken, setEditMaxToken] = useState(0);

  const [endDate, setEndDate] = useState(new Date());
  const [differenceDays, setDifferenceDays] = useState(0);
  const [differenceHours, setDifferenceHours] = useState(0);
  const [differenceMinutes, setDifferenceMinutes] = useState(0);

  const [investAlready, isInvestAlready] = useState(false);



  const getCompanyOffers = async(searchCompanyName) => {
    
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
        const loginUserName = localStorage.getItem('jampackUserName');
        setOfferData(data[0]);
        setImageList(data[0]?.projectImages);
        setEndDate(new Date(data[0]?.endDate));
        const differenceMilliseconds = new Date(data[0]?.endDate) - new Date();
        setDifferenceDays(Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24)));
        setDifferenceHours(Math.floor((differenceMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setDifferenceMinutes(Math.floor((differenceMilliseconds % (1000 * 60 * 60)) / (1000 * 60)))
        setEditMinInvest(data[0]?.minInvest);
        setEditMaxInvest(data[0]?.maxInvest);
        setEditFundingGoal(data[0]?.fundingGoal);
        setEditDeadline(new Date(data[0]?.endDate));
        setEditMinToken(data[0]?.minToken);
        setEditMaxToken(data[0]?.maxToken);

        if(data[0]?.investors.length !== 0) {
          const amount = findAmount(data[0]?.investors, loginUserName);

          if(amount !== null) {
            isInvestAlready(true);
            setInvestAmount(amount);
          } else {
            isInvestAlready(false);
          }
        } 
        
      })
    } catch (err) {
      console.log(err);
    }
  } 

  function findAmount(investorArray, investorToCheck) {
      for (const obj of investorArray) {
          if (obj.investor === investorToCheck) {
              return obj.amount;
          }
      }
      return null;
     // Return null if the investor is not found
}

  function addCommas(numberString) {
    const parts = numberString.split(".");
    let integerPart = parts[0];
    const decimalPart = parts[1] ? "." + parts[1] : "";
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return integerPart + decimalPart;
  }

  const handleInvestAmountChange = (e) => {
    const amt = e.target.value;
    setInvestAmount(amt);
    if(Number(amt) > 0) {
      setError("");
    }
    if(Number(amt) >= offerData?.minInvest && Number(amt) <= offerData?.maxInvest) {
      setError("");
    }
  }

  const handleInvest = async() => {
    if (!investAmount.trim()) {
      setError("Required");
    } else if (Number(investAmount) < offerData?.minInvest) {
      const errorMessage = `Amount must be at least $${offerData.minInvest}`;
      setError(errorMessage);
    } else if (Number(investAmount) > offerData?.maxInvest) {
      const errorMessage = `Amount cant be bigger than $${offerData?.maxInvest}`;
      setError(errorMessage);
    } else {
      const loginUserName = localStorage.getItem('jampackUserName');
      const formData = {
        investAmount: investAmount,
        companyName: companyName,
        investor: loginUserName
      };

      try{
        // const res = await fetch('http://localhost:8080/offer/updateInvest', {
        const res = await fetch('https://autoinvest.ai//offer/updateInvest', {
          method: 'POST',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(formData)
        });

        res.json().then(data => {
          setOfferData(data.data);
          isInvestAlready(true);
        })

      } catch(err) {
        console.log(err);
      }
    }
  };

  const handleImageChange = (index) => {
    setSelectedImageIndex(index);
  };

  const handleImageUpload = (e) => {
    // Do something with the file, such as uploading it to a server or displaying it preview
    e.preventDefault();
    const formdata = new FormData();
    formdata.append('file', e.target.files[0]);
    formdata.append('companyName', offerData?.companyName);
    // axios.post('http://localhost:8080/download/uploadProductImage', formdata)
    axios.post('https://autoinvest.ai/download/uploadProductImage', formdata)
      .then(res => {
          setImageList(res.data.data[0]?.projectImages);
      })
      .catch(err => {
          console.log(err);
      })
  };

  const updateDealTerms = async() => {
    const formData = {
      companyName: offerData?.companyName,
      minInvest: editMinInvest,
      maxInvest: editMaxInvest,
      fundingGoal: editFundingGoal,
      endDate: editDeadline,
      minToken: editMinToken,
      maxToken: editMaxToken
    }

    try {
      // const res = await fetch('http://localhost:8080/offer/updateDealTerms', {
      const res = await fetch('https://autoinvest.ai/offer/updateDealTerms', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      res.json().then(data => {
        setEditMinInvest(data.data.minInvest);
        setEditMaxInvest(data.data.maxInvest);
        setEditFundingGoal(data.data.fundingGoal);
        setEditDeadline(new Date(data.data.endDate));
        setEditMinToken(data.data.minToken);
        setEditMaxToken(data.data.maxToken);
        setEndDate(new Date(data.data.endDate));
        const differenceMilliseconds = new Date(data.data.endDate) - new Date();
        setDifferenceDays(Math.floor(differenceMilliseconds / (1000 * 60 * 60 * 24)));
        setDifferenceHours(Math.floor((differenceMilliseconds % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
        setDifferenceMinutes(Math.floor((differenceMilliseconds % (1000 * 60 * 60)) / (1000 * 60)))
        setOpenEditMinInvest(false);
        setOpenEditMaxInvest(false);
        setOpenEditFundingGoal(false);
        setOpenEditDeadline(false);
        setOpenEditTokenRange(false);
      })

    } catch(err) {
      console.error("Error during update Deal Terms: ", err);
    }
  }

  const deleteProjectImage = () => {
    const formdata = {
      imgURL: imageList[selectedImageIndex],
      companyName: offerData?.companyName
    }
    // axios.post('http://localhost:8080/download/deleteProductImage', formdata)
    axios.post('https://autoinvest.ai/download/uploadProductImage', formdata)
      .then(res => {
          setImageList(res.data.data[0]?.projectImages);
          if(selectedImageIndex === res.data.data[0]?.projectImages?.length && selectedImageIndex !== 0) {
            setSelectedImageIndex(res.data.data[0]?.projectImages?.length - 1);
          }
      })
      .catch(err => {
          console.log(err);
      })
  }

  useEffect(() => {
    const loginRole = localStorage.getItem('jampackRole');
    setRole(loginRole);
    setCompanyName(data.data);
    getCompanyOffers(data.data);
  },[companyName]);

  return (
    <>
      <div className="integrations-body">
        <SimpleBar className="nicescroll-bar">
          <Container className="mt-md-3 px-0 mt-3">
            {/* row-1 */}
            <Row className="m-0 p-0">
              {/* left side: company logo */}
              <Col lg={9}>
                <div className="media mb-3">
                  <div className="media-head me-3">
                    <div className="avatar avatar-logo">
                      {
                        (!offerData?.logo || offerData?.logo === "") ? (
                          <span className="initial-wrap bg-success-light-5">
                            {offerData?.companyName[0]}
                          </span>
                        ) : (
                          <span className="initial-wrap bg-success-light-5">
                            <img src={offerData?.logo} alt="logo" />
                          </span>
                        )
                      }
                    </div>
                  </div>
                  <div className="media-body mb-3">
                    <h3>{offerData?.companyName}</h3>
                    {/* <span>by Hencework</span> */}
                    {/* <div className="d-flex align-items-center mt-1">
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
                    </div> */}
                  </div>
                </div>
              </Col>
              {/* <Col lg={3}>
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
              </Col> */}
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
                    className="mt-2 mb-2"
                    onChange={handleImageChange}
                    selectedItem={selectedImageIndex}
                  >
                    {imageList?.map((item) => (
                      <div key={item}>
                        <img src={item} alt={item} />
                      </div>
                    ))}
                  </Carousel>
                </div>

                {
                  role === "company" ? (
                    <Row>
                      <Col lg={6}>
                        {
                          (imageList?.length !== 0) && (
                            <Button 
                                size='lg' 
                                variant='primary'
                                className='btn-rounded btn-block'
                                onClick={() => deleteProjectImage()}
                            >
                                <span>Delete this image</span>
                            </Button>
                          )
                        }
                      </Col>
                      <Col lg={6}>
                        <input
                            type="file"
                            accept="image/*" // Accept only image files
                            onChange={handleImageUpload}
                            style={{ display: 'none' }} // Hide the input element
                            ref={fileInputRef} // Reference to the input element
                        />
                        <Button 
                            size='lg'
                            variant='primary'
                            className='btn-rounded btn-block'
                            onClick={() => fileInputRef.current.click()}
                        >
                          <span>Upload New Image</span>
                        </Button>
                      </Col>
                    </Row>
                  ) : (
                    <></>
                  )
                }

                
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
                      {/* <Company /> */}
                      <div dangerouslySetInnerHTML={{ __html: offerData?.companyTab }} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabit2">
                      {/* <ThePitch /> */}
                      <div dangerouslySetInnerHTML={{ __html: offerData?.pitchTab }} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabit3">
                      {/* <Offering /> */}
                      <div dangerouslySetInnerHTML={{ __html: offerData?.offeringTab }} />
                    </Tab.Pane>
                    <Tab.Pane eventKey="tabit4">
                      <Documents data = {data.data} />
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
                            <p className="text-white">CLOSING ON {endDate.getFullYear()}-{endDate.getMonth() + 1}-{endDate.getDate()}</p>
                            <p className="text-white fs-7">
                              {endDate.getHours().toString().padStart(2, '0')}:{endDate.getMinutes().toString().padStart(2, '0')}
                            </p>
                          </div>
                          <div className="d-flex justify-content-evenly mt-2">
                            <div>
                              <h5 className="m-0 text-center text-yellow">
                                {differenceDays}
                              </h5>
                              <p className="text-grey">Days</p>
                            </div>
                            <div>
                              <h5 className="m-0 text-center text-yellow">
                                {differenceHours.toString().padStart(2, '0')}
                              </h5>
                              <p className="text-grey">Hours</p>
                            </div>
                            <div>
                              <h5 className="m-0 text-center text-yellow">
                                {differenceMinutes.toString().padStart(2, '0')}
                              </h5>
                              <p className="text-grey">Mins</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* invest section */}
                      <div>
                        {
                          role === "investor" ? (
                            (offerData?.totalInvestmoney >= offerData?.fundingGoal) ? (
                              <p className="text-success mb-3">
                                GOAL HIT (You can still invest)
                              </p>
                            ) : (
                              investAlready ? (
                                <p className="text-success mb-3">
                                  You invested ${investAmount} already for this offer
                                </p>
                              ) : (
                                <p className="text-success mb-3">
                                  You have to invest....
                                </p>
                              )
                                
                            )
                          ) : (
                            role === "company" ? (
                              <p className="text-success mb-3">
                                You need more investment......
                              </p>
                            ) : (
                              <></>
                            )
                          )
                        }
                        <h4 className="m-0">${offerData?.totalInvestMoney}</h4>
                        <p>Raised from {offerData?.investors?.length} investors</p>

                        {
                          role === "investor" ? (
                            investAlready ? (
                              <></>
                            ) : (
                              <div className="d-flex justify-content-between mt-4">
                                <div xl={4} lg={4} sm={4} md={4} xs={6}>
                                  <h6 className="m-0">INVEST</h6>
                                  <p>min ${offerData?.minInvest}</p>
                                </div>
                                <div xl={8} lg={8} sm={8} md={8} xs={6}>
                                  <Form
                                    className="mx-3 flex-grow-1 w-150p"
                                    role="search"
                                    onSubmit={(e) => {
                                      e.preventDefault();
                                      handleInvest();
                                    }}
                                  >
                                    <Form.Control
                                      type="text"
                                      placeholder="$0"
                                      value={investAmount}
                                      onChange={handleInvestAmountChange}
                                    />
                                    {error && <Form.Text className="text-danger">{error}</Form.Text>}
                                  </Form>
                                </div>
                              </div>
                            )
                            
                          ) : (
                            <></>
                          )
                        }

                        {
                          role === "investor" ? (
                            investAlready ? (
                              <></>
                            ) : (
                              <Button
                                style={{ height: "5.5vh" }}
                                className="btn-block mt-6"
                                onClick={handleInvest}
                              >
                                INVEST NOW
                              </Button>
                            )
                          ) : (
                            <></>
                          )
                        }
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
                        <li key={offerData?._id} className="mb-3">
                          <div className=" d-flex justify-content-between fs-7">
                            <span>minimum Investment</span>
                            {
                              role === "company" && !openEditMinInvest ? (
                                <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={() => setOpenEditMinInvest(true)}>
                                  <span className="icon">
                                      <span className="feather-icon">
                                          <Edit2 />
                                      </span>
                                  </span>
                                </Button>
                              ) : (
                                <></>
                              )
                            } 
                          </div>
                          {
                            openEditMinInvest ? (
                              <Form.Control
                                type="number"
                                value={editMinInvest}
                                onChange={e => setEditMinInvest(e.target.value)}
                              />
                            ) : (
                              <div className="text-dark fw-medium">
                                ${editMinInvest}
                              </div>
                            )
                          }
                          
                        </li>
                        <li key={offerData?._id} className="mb-3">
                          <div className=" d-flex justify-content-between fs-7">
                            <span>maximum Investment</span>
                            {
                              role === "company" && !openEditMaxInvest ? (
                                <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={() => setOpenEditMaxInvest(true)}>
                                  <span className="icon">
                                      <span className="feather-icon">
                                          <Edit2 />
                                      </span>
                                  </span>
                                </Button>
                              ) : (
                                <></>
                              )
                            } 
                          </div>
                          {
                            openEditMaxInvest ? (
                              <Form.Control
                                type="number"
                                value={editMaxInvest}
                                onChange={e => setEditMaxInvest(e.target.value)}
                              />
                            ) : (
                              <div className="text-dark fw-medium">
                                ${editMaxInvest}
                              </div>
                            )
                          }
                        </li>
                        <li key={offerData?._id} className="mb-3">
                        <div className=" d-flex justify-content-between fs-7">
                            <span>Funding Goal</span>
                            {
                              role === "company" && !openEditFundingGoal ? (
                                <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={() => setOpenEditFundingGoal(true)}>
                                  <span className="icon">
                                      <span className="feather-icon">
                                          <Edit2 />
                                      </span>
                                  </span>
                                </Button>
                              ) : (
                                <></>
                              )
                            } 
                          </div>
                          {
                            openEditFundingGoal ? (
                              <Form.Control
                                type="number"
                                value={editFundingGoal}
                                onChange={e => setEditFundingGoal(e.target.value)}
                              />
                            ) : (
                              <div className="text-dark fw-medium">
                                ${editFundingGoal}
                              </div>
                            )
                          }
                        </li>
                        <li key={offerData?._id} className="mb-3">
                          <div className=" d-flex justify-content-between fs-7">
                            <span>Deadline</span>
                            {
                              role === "company" && !openEditDeadline ? (
                                <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={() => setOpenEditDeadline(true)}>
                                  <span className="icon">
                                      <span className="feather-icon">
                                          <Edit2 />
                                      </span>
                                  </span>
                                </Button>
                              ) : (
                                <></>
                              )
                            } 
                          </div>
                          {
                            openEditDeadline ? (
                              <Form.Control
                                type="date"
                                value={editDeadline}
                                onChange={e => setEditDeadline(e.target.value)}
                              />
                            ) : (
                              <div className="text-dark fw-medium">
                                {editDeadline.getFullYear()}-{editDeadline.getMonth() + 1}-{endDate.getDate()}
                              </div>
                            )
                          }
                        </li>
                        <li key={offerData?._id} className="mb-3">
                        <div className=" d-flex justify-content-between fs-7">
                            <span>Price per token</span>
                            {
                              role === "company"  && !openEditTokenRange ? (
                                <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={() => setOpenEditTokenRange(true)}>
                                  <span className="icon">
                                      <span className="feather-icon">
                                          <Edit2 />
                                      </span>
                                  </span>
                                </Button>
                              ) : (
                                <></>
                              )
                            } 
                          </div>

                          {
                            openEditTokenRange ? (
                              <Row className='gx-3'>
                                <Col lg={3} as={Form.Group} className='mb-3'>
                                    <Form.Label>Min</Form.Label>
                                </Col>
                                <Col lg={9} as={Form.Group} className='mb-3'>
                                  <Form.Control
                                    type="number"
                                    value={editMinToken}
                                    onChange={e => setEditMinToken(e.target.value)}
                                  />
                                </Col>
                                <Col lg={3} as={Form.Group} className='mb-3'>
                                    <Form.Label>Max</Form.Label>
                                </Col>
                                <Col lg={9} as={Form.Group} className='mb-3'>
                                  <Form.Control
                                    type="number"
                                    value={editMaxToken}
                                    onChange={e => setEditMaxToken(e.target.value)}
                                  />
                                </Col>
                              </Row>
                            ) : (
                              <div className="text-dark fw-medium">
                                ${editMinToken} - ${editMaxToken}
                              </div>
                            )
                          }
                        </li>
                        {/* <li>
                          <a
                            href="#some"
                            className="d-flex align-items-center link-danger"
                          >
                            <span className="d-flex">
                              <i className="ri-information-line fs-7 me-1 lh-1" />
                            </span>
                            Report abuse
                          </a>
                        </li> */}
                      </ul>

                      {
                        (openEditDeadline || openEditFundingGoal || openEditMaxInvest || openEditMinInvest || openEditTokenRange) && (
                          <Button 
                              size='lg' 
                              variant='primary' 
                              className='btn-rounded btn-block mb-3'
                              onClick={() => updateDealTerms()}
                          >
                              <span>Confirm</span>
                          </Button>
                        )
                      }
                    </Card.Body>
                  </Card>

                  {/* related companies */}
                  {/* <Card className="card-border">
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
                  </Card> */}

                  {/* categories */}
                  {/* <Card className="card-border mt-3">
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
                  </Card> */}
                </div>
              </Col>
            </Row>

            {/* similar companies */}
            <SimilarCompanies />
          </Container>
        </SimpleBar>
      </div>

      {/* {showModal &&
        <InvestDialog
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setAmount("");
          }}
          amount={addCommas(amount)}
        />
      } */}

      {/* {showModal &&
        <StripeDialog
          open={showModal}
          onClose={() => {
            setShowModal(false);
            setInvestAmount("");
          }}
          investAmount={addCommas(investAmount)}
        />
      } */}
    </>
  );
};

export default Body;
