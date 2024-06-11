import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Form, Modal, Nav, Row, Tab } from 'react-bootstrap';
import { Rating } from 'react-simple-star-rating';
import { Activity, Edit2, Edit3, Heart, Mail, Shield, Trash, Upload, Zap } from 'react-feather';
import { Link } from 'react-router-dom';
import SimpleBar from 'simplebar-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBehance, faDropbox, faGithub, faGoogleDrive } from '@fortawesome/free-brands-svg-icons';
import HkAvatarUploader from '../../../components/@hk-avatar-uploader/@hk-avatar-uploader';
import { message } from 'antd';
import { FormControl, Input, InputLabel, ListItemText, MenuItem, Select } from '@mui/material';
//Image
// import avatar2 from '../../../assets/dist/img/avatar2.jpg';

const InvestorDetails = ({ show, onHide, id, avatar, firstName, lastName, email, phone, business, language, investSize, howSoon, summary, notes }) => {

    const [showEdit, setShowEdit] = useState(false);
    const [role, setRole] = useState("");

    const [showFirstName, setShowFirstName] = useState("");
    const [showLastName, setShowLastName] = useState("");
    const [showEmail, setShowEmail] = useState("");
    const [showPhone, setShowPhone] = useState("");

    const [editFirstName, setEditFirstName] = useState("");
    const [editLastName, setEditLastName] = useState("");
    const [editEmail, setEditEmail] = useState("");
    const [editPhone, setEditPhone] = useState("");

    const [showEditPreference, setShowEditPreference] = useState(false);
    const [editBusinessType, setEditBusinessType] = useState([]);
    const [showBusinessType, setShowBusinessType] = useState([]);
    const [editInvestmentSize, setEditInvestmentSize] = useState(0);
    const [showInvestmentSize, setShowInvestmentSize] = useState(0);
    const [editLanguage, setEditLanguage] = useState([]);
    const [showLanguage, setShowLanguage] = useState([]);
    const [editInvestDay, setEditInvestDay] = useState(0);
    const [showInvestDay, setShowInvestDay] = useState(0);

    const [isEditSummary, setIsEditSummary] = useState(false);
    const [showSummary, setShowSummary] = useState("");
    const [editSummary, setEditSummary] = useState("");

    const [showNotes, setShowNotes] = useState([]);
    const [editNote, setEditNote] = useState("");
    const [isEditNote, setIsEditNote] = useState(false);


    const types = ['startups', 'pre-IPOs', 'IPOs'];
    const languages = ['English', 'Spanish', 'Dutch', 'French', 'German', 'Greek', 'Italian', 'Portuguese', 'Swedish', 'Polish', 'Russian', 'Turkish', 'Ukrainian', 'Arabic', 'Hebrew', 'Urdu', 'Hindi', 'Thai', 'Vietnamese', 'Chinese', 'Korean', 'Japanese', 'Mandarin'];

    const onhandleChange = (e) => {
        const selectedItems = e.target.value;
        setEditBusinessType(selectedItems);
    }

    const onhandleLanguageChange = (e) => {
        const selectedItems = e.target.value;
        setEditLanguage(selectedItems);
    }

    const showEditModal = () => {
        setShowEdit(true);
    }

    const onHideEditModal = () => {
        setShowEdit(false);
    }

    const onEditPreference = () => {
        setShowEditPreference(true);
    }

    const onHideEditPreference = () => {
        setShowEditPreference(false);
    }

    const updateData = async() => {
        setShowFirstName(editFirstName);
        setShowEmail(editEmail);
        setShowLastName(editLastName);
        setShowPhone(editPhone);
        

        const formData = {id, editFirstName, editLastName, editEmail, editPhone};
        try {
            // const res = await fetch('http://localhost:8080/investor/updateData', {
            const res = await fetch('https://autoinvest.ai/investor/updateData', {
            
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if(res.ok) {
                message.success("Updated Correctly");
                setShowEdit(false);
            } else {
                res.json().then(data => {
                    message.error(data.message);
                    setShowEdit(false);
                })
            }
        } catch(err) {
            console.error('Error during update: ', err);
        }
    }

    const updatePreference = async() => {

        setShowBusinessType(editBusinessType);
        setShowInvestDay(editInvestDay);
        setShowInvestmentSize(editInvestmentSize);
        setShowLanguage(editLanguage);

        const formData = {id, editBusinessType, editInvestmentSize, editLanguage, editInvestDay};

        try {
            // const res = await fetch('http://localhost:8080/investor/updatePreference', {
            const res = await fetch('https://autoinvest.ai/investor/updatePreference', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if(res.ok) {
                message.success("Updated Correctly");
                setShowEditPreference(false);
            } else {
                res.json().then(data => {
                    message.error(data.message);
                    setShowEditPreference(false);
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    const updateSummary = async() => {

        setShowSummary(editSummary);
        setIsEditSummary(false);

        const formData = {id, editSummary};

        try {
            // const res = await fetch('http://localhost:8080/investor/updateSummary', {
            const res = await fetch('https://autoinvest.ai/investor/updateSummary', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(formData)
            })

            if(res.ok) {
                message.success("Updated Correctly");
                setShowEditPreference(false);
            } else {
                res.json().then(data => {
                    message.error(data.message);
                    setShowEditPreference(false);
                })
            }
        } catch (err) {
            console.log(err);
        }
    }

    const addNote = async() => {
        const companyName = localStorage.getItem('jampackUserName');
        const note = {
            companyName : companyName, 
            note: editNote,
        };
        
        const formData = {id, note};

        try {
            // const res = await fetch('http://localhost:8080/investor/updateNotes', {
            const res = await fetch('https://autoinvest.ai/investor/updateNotes', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body:JSON.stringify(formData)
            })

            if(res.ok) {
                message.success("Update correctly");
            }
        } catch(err) {
            console.log(err);
        }

        setShowNotes(
            [...showNotes, note]
        );
        setEditNote("");
        setIsEditNote(false);
    }

    const onHideModal = () => {
        if(showSummary === "") {
            setIsEditSummary(true);
        } else {
            setIsEditSummary(false);
        }
        onHide();
    }

    useEffect(() => {
        setShowFirstName(firstName);
        setEditFirstName(firstName);
        setShowLastName(lastName);
        setEditLastName(lastName);
        setShowEmail(email);
        setEditEmail(email);
        setShowPhone(phone);
        setEditPhone(phone);
        setShowBusinessType(business);
        setEditBusinessType(business);
        setShowInvestmentSize(investSize);
        setEditInvestmentSize(investSize);
        setShowLanguage(language);
        setEditLanguage(language);
        setShowInvestDay(howSoon);
        setEditInvestDay(howSoon);

        const loginUserRole = localStorage.getItem('jampackRole');
        const companyName = localStorage.getItem('jampackUserName');
        setRole(loginUserRole);

        if(loginUserRole === "company") {
            const finalNotes = notes.filter(item => item.companyName === companyName);
            setShowNotes(finalNotes);
        } else {
            setShowNotes(notes);
        }

        if(summary === "") {
            setIsEditSummary(true); 
        } else {
            setIsEditSummary(false);
        }
        setShowSummary(summary);
        setEditSummary(summary);

        
        // if(loginUserRole === "company") {
        //     console.log("loginUserRole: ",loginUserRole);
        //     getAllNotesForCompany();
        // } else {
        //     console.log("loginUserRole: ",loginUserRole);
        //     getAllNotes();
        // }

    },[id]);

    return (
        <>
            <Modal show={show} onHide={() => onHideModal()} centered size="xl" dialogClassName="contact-detail-modal" >
                <Modal.Body className="p-0">
                    <header className="contact-header">
                        <div className="d-flex align-items-center">
                            <span className="me-3">
                                <HkAvatarUploader
                                    id={id}
                                    defaultImg={avatar}
                                    firstName={showFirstName}
                                />
                            </span>
                            <div>
                                <div className="cp-name text-truncate">{showFirstName} {showLastName}</div>
                                <p>No phone calls Always busy</p>
                                <Rating initialValue={3} readonly size="20" />
                            </div>
                        </div>
                        <div className="contact-options-wrap">
                            {/* <ul className="hk-list hk-list-sm justify-content-center d-xl-flex d-none">
                                <li>
                                    <a className="btn btn-icon btn-soft-primary btn-rounded" href="#some">
                                        <span className="btn-icon-wrap">
                                            <span className="feather-icon">
                                                <Mail />
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className="btn btn-icon btn-soft-success btn-rounded" href="#some">
                                        <span className="btn-icon-wrap">
                                            <span className="feather-icon">
                                                <Phone />
                                            </span>
                                        </span>
                                    </a>
                                </li>
                                <li>
                                    <a className="btn btn-icon btn-soft-danger btn-rounded" href="#some">
                                        <span className="btn-icon-wrap">
                                            <span className="feather-icon">
                                                <Video />
                                            </span>
                                        </span>
                                    </a>
                                </li>
                            </ul> */}
                            {/* <Dropdown className="mx-3  d-xl-block d-none">
                                <Dropdown.Toggle variant="light" type="button">Action</Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <Dropdown.Item>Action</Dropdown.Item>
                                    <Dropdown.Item>Another action</Dropdown.Item>
                                    <Dropdown.Item>Something else here</Dropdown.Item>
                                    <div className="dropdown-divider" />
                                    <Dropdown.Item>Separated link</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                            {/* <div className="align-items-center d-xl-flex d-none">1 - 10 of 30</div> */}
                            {/* <Link to="#" className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle  d-xl-inline-block d-none" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Previous">
                                <span className="btn-icon-wrap">
                                    <span className="feather-icon">
                                        <ChevronLeft />
                                    </span>
                                </span>
                            </Link>
                            <Link to="#" className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover contactapp-info-toggle  d-xl-inline-block d-none" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Next">
                                <span className="btn-icon-wrap">
                                    <span className="feather-icon">
                                        <ChevronRight />
                                    </span>
                                </span>
                            </Link> */}
                            {/* <Dropdown as="a" href="#some" >
                                <Dropdown.Toggle className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover dropdown-toggle no-caret  d-xl-inline-block d-nonet" >
                                    <span className="btn-icon-wrap">
                                        <span className="feather-icon">
                                            <MoreVertical />
                                        </span>
                                    </span>
                                </Dropdown.Toggle>
                                <Dropdown.Menu align="end" >
                                    <Dropdown.Item>
                                        <span className="feather-icon dropdown-icon">
                                            <Star />
                                        </span>
                                        <span>Stared Messages</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <span className="feather-icon dropdown-icon">
                                            <Archive />
                                        </span>
                                        <span>Archive Messages</span>
                                    </Dropdown.Item>
                                    <Dropdown.Divider as="div" />
                                    <Dropdown.Item>
                                        <span className="feather-icon dropdown-icon">
                                            <Slash />
                                        </span>
                                        <span>Block Content</span>
                                    </Dropdown.Item>
                                    <Dropdown.Item as={Link} to="/apps/email">
                                        <span className="feather-icon dropdown-icon">
                                            <XSquare /> 
                                        </span>
                                        <span>Close</span>
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown> */}
                        </div>
                    </header>
                    <div className="contact-body contact-detail-body">
                        <SimpleBar className='nicescroll-bar' >
                            <div className="d-flex flex-xl-nowrap flex-wrap">
                                <div className="contact-info w-xl-35 w-100">
                                        {/* <Dropdown className="action-btn">
                                            <Dropdown.Toggle className="btn btn-light dropdown-toggle " type="button">Action</Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                <Dropdown.Item>Action</Dropdown.Item>
                                                <Dropdown.Item>Another action</Dropdown.Item>
                                                <Dropdown.Item>Something else here</Dropdown.Item>
                                                <Dropdown.Divider as="div" />
                                                <Dropdown.Item>Separated link</Dropdown.Item>
                                            </Dropdown.Menu>
                                        </Dropdown> */}
                                    <Card>
                                        <Card.Header>
                                            <a href="#some">Profile Information</a>
                                            {
                                                role === "admin" ? (
                                                    <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={() => showEditModal()}>
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
                                            
                                        </Card.Header>
                                        <Card.Body>
                                            <ul className="cp-info">
                                                <li>
                                                    <span>First name</span>
                                                    <span>{showFirstName}</span>
                                                </li>
                                                <li>
                                                    <span>Last name</span>
                                                    <span>{showLastName}</span>
                                                </li>
                                                <li>
                                                    <span>Email</span>
                                                    <span>{showEmail}</span>
                                                </li>
                                                <li>
                                                    <span>Phone</span>
                                                    <span>{showPhone}</span>
                                                </li>
                                                <li>
                                                    <span>Location</span>
                                                    <span>New York</span>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                    <div className="separator-full" />
                                    <Card>
                                        <Card.Header>
                                            <a href="#some">Investment Preferences</a>
                                            {
                                                role === "admin" ? (
                                                    <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={onEditPreference}>
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
                                        </Card.Header>
                                        <Card.Body>
                                            <ul className="cp-info">
                                                <li>
                                                    <span>Business Type</span>
                                                    <span>{showBusinessType?.join(", ")}</span>
                                                </li>
                                                <li>
                                                    <span>Investment Size</span>
                                                    <span>${showInvestmentSize}</span>
                                                </li>
                                                <li>
                                                    <span>Language</span>
                                                    <span>{showLanguage?.join(", ")}</span>
                                                </li>
                                                <li>
                                                    <span>How soon?</span>
                                                    <span>In next {showInvestDay} days</span>
                                                </li>
                                                <li>
                                                    <span>Location</span>
                                                    <span>New York</span>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                    <div className="separator-full" />
                                    {/* <Card>
                                        <Card.Header>
                                            <a href="#some">Tags</a>
                                            <Button variant="light" size="xs" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Add Tags">
                                                <span className="icon">
                                                    <span className="feather-icon">
                                                        <Plus />
                                                    </span>
                                                </span>
                                            </Button>
                                        </Card.Header>
                                        <Card.Body>
                                            <span className="badge badge-soft-violet">Collaboration</span>
                                            <span className="badge badge-soft-danger">React Developer</span>
                                        </Card.Body>
                                    </Card>
                                    <div className="separator-full" /> */}
                                    <Card>
                                        <Card.Header>
                                            <a href="#some">Social Profile</a>
                                        </Card.Header>
                                        <Card.Body>
                                            <ul className="hk-list hk-list-sm">
                                                <li>
                                                    <Button variant="primary" className="btn-icon btn-rounded btn-primary">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faBehance} />
                                                        </span>
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button variant="warning" className="btn-icon btn-rounded">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faGoogleDrive} />
                                                        </span>
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button variant="info" className="btn-icon btn-rounded">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faDropbox} />
                                                        </span>
                                                    </Button>
                                                </li>
                                                <li>
                                                    <Button variant="dark" className="btn-icon btn-rounded">
                                                        <span className="icon">
                                                            <FontAwesomeIcon icon={faGithub} />
                                                        </span>
                                                    </Button>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                    <div className="separator-full" />
                                    <Card>
                                        <Card.Header>
                                            <a href="#some">Biography</a>
                                            {/* <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit">
                                                <span className="icon">
                                                    <span className="feather-icon">
                                                        <Edit2 />
                                                    </span>
                                                </span>
                                            </Button> */}
                                        </Card.Header>
                                        <Card.Body>
                                            <p>Hello there, {firstName} {lastName} is a full-stack frontend developer working under pressure is his quality.</p>
                                        </Card.Body>
                                    </Card>
                                    <div className="separator-full" />
                                    <Card>
                                        <Card.Header>
                                            <a href="#some">Settings</a>
                                        </Card.Header>
                                        <Card.Body>
                                            <ul className="cp-action">
                                                <li>
                                                    <Link to="#">
                                                        <span className="cp-icon-wrap">
                                                            <span className="feather-icon">
                                                                <Upload />
                                                            </span>
                                                        </span>
                                                        Share Contact
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#">
                                                        <span className="cp-icon-wrap">
                                                            <span className="feather-icon">
                                                                <Heart />
                                                            </span>
                                                        </span>
                                                        Add to Favourites
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link to="#" className="link-danger">
                                                        <span className="cp-icon-wrap">
                                                            <span className="feather-icon">
                                                                <Trash />
                                                            </span>
                                                        </span>
                                                        Delete Contact
                                                    </Link>
                                                </li>
                                            </ul>
                                        </Card.Body>
                                    </Card>
                                </div>
                                <div className="contact-more-info">
                                    <Tab.Container defaultActiveKey="tab_summary">
                                        <Nav variant="tabs" className="nav-line nav-icon nav-light">
                                            <Nav.Item>
                                                <Nav.Link eventKey="tab_summary">
                                                    <span className="nav-icon-wrap">
                                                        <span className="feather-icon">
                                                            <Zap />
                                                        </span>
                                                    </span>
                                                    <span className="nav-link-text">Summary</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            <Nav.Item>
                                                <Nav.Link eventKey="tab_invest">
                                                    <span className="nav-icon-wrap">
                                                        <span className="feather-icon">
                                                            <Activity />
                                                        </span>
                                                    </span>
                                                    <span className="nav-link-text">Invested In</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                            {
                                                role === "investor" ? (
                                                    <></>
                                                ) : (
                                                    <Nav.Item>
                                                        <Nav.Link eventKey="tab_notes">
                                                            <span className="nav-icon-wrap">
                                                                <span className="feather-icon">
                                                                    <Edit3 />
                                                                </span>
                                                            </span>
                                                            <span className="nav-link-text">Notes</span>
                                                        </Nav.Link>
                                                    </Nav.Item>
                                                )
                                            }
                                            
                                            <Nav.Item>
                                                <Nav.Link eventKey="tab_email">
                                                    <span className="nav-icon-wrap">
                                                        <span className="feather-icon">
                                                            <Mail />
                                                        </span>
                                                    </span>
                                                    <span className="nav-link-text">Email</span>
                                                </Nav.Link>
                                            </Nav.Item>
                                        </Nav >
                                        <Tab.Content className="mt-7">
                                            <Tab.Pane eventKey="tab_summary">
                                            {
                                                isEditSummary ? (
                                                        <>
                                                        {
                                                            role === "admin" ? (
                                                                <Form>
                                                                    <Row>
                                                                        <Col md={12} as={Form.Group} className="mb-1">
                                                                            
                                                                            <div className="form-label-group">
                                                                                <Form.Label>Write a Summary</Form.Label>
                                                                                <small className="text-muted">{1200 - editSummary?.length}</small>
                                                                            </div>
                                                                            <Form.Control as="textarea" rows={8} placeholder="Write an internal summary" value={editSummary} onChange={(e) => setEditSummary(e.target.value)} />
                                                                        </Col>
                                                                    </Row>
                                                                    <Button variant="outline-light" onClick={() => updateSummary()}>{showSummary?.length === 0 ? "Add Summary" : "Edit Summary"}</Button>
                                                                </Form>
                                                            ) : (
                                                                <div>
                                                                    No Summary
                                                                </div>
                                                            )
                                                        }
                                                        </>
                                                ) : (
                                                    <Row>
                                                        <Col md={9} as={Form.Group} className='mb-1'>
                                                            <div className='form-label-group'>
                                                                <Form.Label>{showSummary}</Form.Label>
                                                            </div>
                                                        </Col>
                                                        <Col md={3} as={Form.Group} className='mb-1'>
                                                        {
                                                            role === "admin" ? (
                                                                <Button size="xs" variant="light" className="btn-icon btn-rounded" data-bs-toggle="tooltip" data-bs-placement="top" title data-bs-original-title="Edit" onClick={() => setIsEditSummary(true)}>
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
                                                        </Col>
                                                    </Row>
                                                )
                                            }
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="tab_invest">
                                                <Form>
                                                    <Row>
                                                        <Col md={12} as={Form.Group} className="mb-3">
                                                            <div className="form-label-group">
                                                                <Form.Label>Write a Invest</Form.Label>
                                                                <small className="text-muted">1200</small>
                                                            </div>
                                                            <Form.Control as="textarea" rows={8} placeholder="Write an internal invest" />
                                                        </Col>
                                                    </Row>
                                                    <Button variant="outline-light">Add Invest</Button>
                                                </Form>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="tab_notes">
                                                {
                                                    role === "company" ? (
                                                        <>
                                                            {
                                                                showNotes && showNotes.map(item => (
                                                                    <Row>
                                                                        <Col md={12} className='mb-3'>
                                                                            <span>
                                                                                {item.note}
                                                                            </span>
                                                                        </Col>
                                                                    </Row>
                                                                ))
                                                            }

                                                            {
                                                                isEditNote ? (
                                                                    <Form>
                                                                        <Row>
                                                                            <Col md={12} as={Form.Group} className="mb-3">
                                                                                <div className="form-label-group">
                                                                                    <Form.Label>Write a Note</Form.Label>
                                                                                    <small className="text-muted">1200</small>
                                                                                </div>
                                                                                <Form.Control as="textarea" rows={8} placeholder="Write an internal note" value={editNote} onChange={(e) => setEditNote(e.target.value)}  />
                                                                            </Col>
                                                                        </Row>
                                                                        <Button variant="outline-light" onClick={addNote}>Add Note</Button>
                                                                    </Form>
                                                                ) : (
                                                                    <Row>
                                                                        <Col md={9} className='mb-e'></Col>
                                                                        <Col md={3} className='mb-e'>
                                                                            <Button variant='outline-light' onClick={() => setIsEditNote(true)} >Add New Note</Button>
                                                                        </Col>
                                                                    </Row>
                                                                )
                                                            }
                                                            
                                                        </>
                                                            
                                                    ) : (
                                                            role === "admin" ? (
                                                                <Row>
                                                                    {
                                                                        showNotes && showNotes.map(item => (
                                                                            <>
                                                                                <Col md={3} className='mb-3'>
                                                                                    <span>{item.companyName} : </span>
                                                                                </Col>
                                                                                <Col md={9} className='mb-3'>
                                                                                    <span>{item.note}</span>
                                                                                </Col>
                                                                            </>
                                                                        ))
                                                                    }

                                                                    {
                                                                        isEditNote ? (
                                                                            <Form>
                                                                                <Row>
                                                                                    <Col md={12} as={Form.Group} className="mb-3">
                                                                                        <div className="form-label-group">
                                                                                            <Form.Label>Write a Note</Form.Label>
                                                                                            <small className="text-muted">1200</small>
                                                                                        </div>
                                                                                        <Form.Control as="textarea" rows={8} placeholder="Write an internal note" value={editNote} onChange={(e) => setEditNote(e.target.value)}  />
                                                                                    </Col>
                                                                                </Row>
                                                                                <Button variant="outline-light" onClick={addNote}>Add Note</Button>
                                                                            </Form>
                                                                        ) : (
                                                                            <Row>
                                                                                <Col md={9} className='mb-e'></Col>
                                                                                <Col md={3} className='mb-e'>
                                                                                    <Button variant='outline-light' onClick={() => setIsEditNote(true)} >Add New Note</Button>
                                                                                </Col>
                                                                            </Row>
                                                                        )
                                                                    }
                                                                </Row>
                                                            ) : (
                                                                <></>
                                                            )
                                                    )
                                                }
                                                
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="tab_email">
                                                <Form>
                                                    <Row>
                                                        <Col md={12} as={Form.Group} className="mb-3">
                                                            <div className="form-label-group">
                                                                <Form.Label>Write a Email</Form.Label>
                                                                <small className="text-muted">1200</small>
                                                            </div>
                                                            <Form.Control as="textarea" rows={8} placeholder="Write an internal email" />
                                                        </Col>
                                                    </Row>
                                                    <Button variant="outline-light">Add Email</Button>
                                                </Form>
                                            </Tab.Pane>
                                            <Tab.Pane eventKey="tab_call">
                                                <Form>
                                                    <Row>
                                                        <Col md={12} as={Form.Group} className="mb-3">
                                                            <div className="form-label-group">
                                                                <Form.Label>Write a Call</Form.Label>
                                                                <small className="text-muted">1200</small>
                                                            </div>
                                                            <Form.Control as="textarea" rows={8} placeholder="Write an internal call" />
                                                        </Col>
                                                    </Row>
                                                    <Button variant="outline-light">Add Call</Button>
                                                </Form>
                                            </Tab.Pane>
                                        </Tab.Content>
                                    </Tab.Container>
                                    <div className="pipeline-status-wrap mt-7">
                                        <div className="title-lg mb-3">Investment Pipeline Status</div>
                                        <ul className="pipeline-stutus">
                                            <li className="completed"><span>In Pipeline</span></li>
                                            <li className="active"><span>Follow Up</span></li>
                                            <li><span>Scheduled Service</span></li>
                                            <li><span>Conversation</span></li>
                                            <li><span>Win/Lost</span></li>
                                        </ul>
                                        <div className="clearfix" />
                                    </div>
                                    <div className="activity-wrap mt-7">
                                        <div className="d-flex align-items-center justify-content-between mb-4">
                                            <div className="title-lg mb-0">Activity</div>
                                            <Form.Select className="mw-150p">
                                                <option value={0}>All Activity</option>
                                                <option value={1}>One</option>
                                                <option value={2}>Two</option>
                                                <option value={3}>Three</option>
                                            </Form.Select>
                                        </div>
                                        <div className="title-sm text-primary mb-3">June 24</div>
                                        <ul className="activity-thread">
                                            <li>
                                                <div className="media">
                                                    <div className="media-head">
                                                        <div className="avatar avatar-icon avatar-sm avatar-primary avatar-rounded">
                                                            <span className="initial-wrap"><span className="feather-icon">
                                                                <Mail />
                                                            </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div>
                                                            <div className="activity-text">You sent <span className="text-dark text-capitalize">1 message</span> to the contact.</div>
                                                            <div className="activity-time">10.00 pm</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="media-head">
                                                        <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                                            <span className="initial-wrap">M</span>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div>
                                                            <div className="activity-text"><span className="text-dark text-capitalize">{firstName} {lastName}</span> as it is sometimes known, is dummy text used in laying out print, graphic or web designs. The passage is attributed to an unknown typesetter in the 15th century who is thought to have scrambled.</div>
                                                            <div className="activity-time">10.00 pm</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                            <li>
                                                <div className="media">
                                                    <div className="media-head">
                                                        <div className="avatar  avatar-icon avatar-sm avatar-info avatar-rounded">
                                                            <span className="initial-wrap"><span className="feather-icon">
                                                                <Shield />
                                                            </span>
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div>
                                                            <div className="activity-text">Your deal value <span className="text-dark">$208.15</span> is paid through PayU Money online on <span className="text-dark">02.12.18</span> at <span className="text-dark">15:30, Monday</span></div>
                                                            <div className="activity-time">10.00 pm</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                        <div className="title-sm text-primary mt-5 mb-3">June 25</div>
                                        <ul className="activity-thread">
                                            <li>
                                                <div className="media">
                                                    <div className="media-head">
                                                        <div className="avatar avatar-sm avatar-soft-danger avatar-rounded">
                                                            <span className="initial-wrap">M</span>
                                                        </div>
                                                    </div>
                                                    <div className="media-body">
                                                        <div>
                                                            <div className="activity-text"><span className="text-dark">{firstName} {lastName}</span> responded to your appointment schedule question. </div>
                                                            <div className="activity-time">10.00 pm</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </div >
                            </div >
                        </SimpleBar >
                    </div >
                </Modal.Body >
            </Modal >

            <Modal show={showEdit} onHide={onHideEditModal} centered size='x' dialogClassName='contact-detail-modal'>
                <Modal.Body className='p-0'>
                    <header className='contact-header mb-4'>
                        <div className='d-flex align-items-center text-center'>
                            <span>Profile Information</span>
                        </div>
                    </header>

                    <div className='contact-body contact-detail-body mx-2'>
                        <Row className='gx-3'>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>First Name</Form.Label>
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                                <Form.Control
                                    type="text"
                                    value={editFirstName}
                                    onChange={e => setEditFirstName(e.target.value)}
                                />
                            </Col>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>Last Name</Form.Label>
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                                <Form.Control
                                    type="text"
                                    value={editLastName}
                                    onChange={e => setEditLastName(e.target.value)}
                                />
                            </Col>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>Email</Form.Label>
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                                <Form.Control
                                    type="text"
                                    value={editEmail}
                                    onChange={e => setEditEmail(e.target.value)}
                                />
                            </Col>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>Phone</Form.Label>
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                                <Form.Control
                                    type="text"
                                    value={editPhone}
                                    onChange={e => setEditPhone(e.target.value)}
                                />
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                            </Col>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Button 
                                    size='lg' 
                                    variant='primary' 
                                    className='btn-rounded btn-block mb-3'
                                    onClick={() => updateData()}
                                >
                                    <span>Confirm</span>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>
            </Modal>

            <Modal show={showEditPreference} onHide={onHideEditPreference} centered size='x' dialogClassName='contact-detail-modal'>
                <Modal.Body className='p-0'>
                    <header className='contact-header mb-4'>
                        <div className='d-flex align-items-center text-center'>
                            <span>Investment Prefenreces</span>
                        </div>
                    </header>
                    <div className='contact-body contact-detail-body mx-2'>
                        <Row className='gx-3 align-items-center'>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>Business Type</Form.Label>
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                                <FormControl className='w-100'>
                                    {/* <InputLabel>Select Options</InputLabel> */}
                                    <Select
                                        multiple
                                        value={editBusinessType}
                                        onChange={onhandleChange}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {types.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row className='gx-3 align-items-center'>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>Invest Size($)</Form.Label>
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3 d-flex align-items-center'>
                                <Form.Control
                                    type="number"
                                    value={editInvestmentSize}
                                    onChange={e => setEditInvestmentSize(e.target.value)}
                                />
                            </Col>
                        </Row>
                        <Row className='gx-3 align-items-center'>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>Language</Form.Label>
                            </Col>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                                <FormControl className='w-100'>
                                    {/* <InputLabel>Select Options</InputLabel> */}
                                    <Select
                                        multiple
                                        required
                                        value={editLanguage}
                                        onChange={onhandleLanguageChange}
                                        renderValue={(selected) => selected.join(', ')}
                                    >
                                        {languages.map((type) => (
                                            <MenuItem key={type} value={type}>
                                                {type}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Col>
                        </Row>
                        <Row className='gx-3 align-items-center'>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Form.Label>How Soon?</Form.Label>
                            </Col>
                            <Col lg={2} as={Form.Group} className='mb-3'>
                                <Form.Label>in Next </Form.Label>
                            </Col>
                            <Col lg={4} as={Form.Group} className='mb-3'>
                                <Form.Control
                                    type="number"
                                    value={editInvestDay}
                                    onChange={e => setEditInvestDay(e.target.value)}
                                />
                            </Col>
                            <Col lg={2} as={Form.Group} className='mb-3'>
                                <Form.Label>days</Form.Label>
                            </Col>
                        </Row>
                        <Row className='gx-3 align-items-center'>
                            <Col lg={9} as={Form.Group} className='mb-3'>
                            </Col>
                            <Col lg={3} as={Form.Group} className='mb-3'>
                                <Button 
                                    size='lg' 
                                    variant='primary' 
                                    className='btn-rounded btn-block mb-3'
                                    onClick={() => updatePreference()}
                                >
                                    <span>Confirm</span>
                                </Button>
                            </Col>
                        </Row>
                    </div>
                </Modal.Body>             
            </Modal>
        </>
    )
}

export default InvestorDetails;
