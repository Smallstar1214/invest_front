import React, { useState } from "react";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useHistory } from 'react-router-dom';
import {
  Button,
  Col,
  Container,
  Form,
  InputGroup,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import logoutImg from '../../../assets/dist/img/macaroni-logged-out.png';
import { message } from 'antd';

const Body = () => {

  const [role, setRole] = useState("investor");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {firstName, lastName, userName, email, phone, password, role};
    try {
        // const res = await fetch('http://localhost:8080/auth/signup', {
        const res = await fetch('https://autoinvest.ai/auth/signup', {
            method: 'POST',
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if(res.ok) {
            message.success("Register Successfully");
            res.json().then(data => {
              localStorage.setItem("jampackToken", data.token);
              const role = data.role;
              localStorage.setItem("jampackRole", role);
              localStorage.setItem("jampackId", data.id);
              history.push("/dashboard");
            })
            
        } else {
          res.json().then(data => {
            message.error(data.message);
          })
        }
    } catch(err) {
        console.error('Error during login:', err);
    }       
  }

  return (
    <div className="hk-pg-body">
      <Container>
        <Row>
          <Col
            xl={7}
            lg={6}
            className="d-lg-block d-none v-separator separator-sm"
          >
            <div className="auth-content py-md-0 py-8">
              <Row>
                <Col xxl={9} xl={8} lg={11} className="text-center mx-auto">
                  <img
                    src={logoutImg}
                    className="img-fluid w-sm-40 w-50 mb-3"
                    alt="login"
                  />
                </Col>
              </Row>
            </div>
          </Col>
          <Col
            xl={5}
            lg={6}
            md={7}
            sm={10}
            className="position-relative mx-auto"
          >
            <div className="auth-content py-md-0 py-8">
              <Form className="w-100" onSubmit={e => handleSubmit(e)}>
                <Row>
                  <Col lg={10} className="mx-auto">
                    <Row className="gx-3">
                      <Col lg={6} as={Form.Group} className="mb-3">
                        <Button
                          variant={`${role === "investor" ? "primary" : ""}`}
                          className="btn-rounded btn-block mb-3"
                          onClick={() => setRole("investor")}
                        >
                          <span>Sign Up as Investor</span>
                        </Button>
                      </Col>
                      <Col lg={6} as={Form.Group} className="mb-3">
                        <Button
                          variant={`${role === "investor" ? "" : "primary"}`}
                          className="btn-rounded btn-block mb-3"
                          onClick={() => setRole("company")}
                        >
                          <span>Sign Up as Company</span>
                        </Button>
                      </Col>
                    </Row>
                    <h4 className="text-center mb-4">Sign Up to Jampack</h4>
                    {/* <Button
                      variant="outline-dark"
                      className="btn-rounded btn-block mb-3"
                    >
                      <span>
                        <span className="icon">
                          <FontAwesomeIcon icon={faGoogle} />
                        </span>
                        <span>Sign Up with Gmail</span>
                      </span>
                    </Button> */}
                    {/* <Button
                      variant="social-facebook"
                      className="btn-social btn-rounded btn-block"
                    >
                      <span>
                        <span className="icon">
                          <FontAwesomeIcon icon={faFacebook} />
                        </span>
                        <span>Sign Up with Facebook</span>
                      </span>
                    </Button> */}
                    {/* <div className="title-sm title-wth-divider divider-center my-4">
                      <span>Or</span>
                    </div> */}
                    {
                      role === "company" ? (
                        <Row className="gx-3">
                          
                        </Row>
                      ) : (
                        <Row className="gx-3">
                          <Col lg={6} as={Form.Group} className="mb-3">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              placeholder="Enter your first name"
                              type="text"
                              value={firstName} 
                              onChange={e => setFirstName(e.target.value)}
                            />
                          </Col>
                          <Col lg={6} as={Form.Group} className="mb-3">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              placeholder="Enter your last name"
                              type="text"
                              value={lastName} 
                              onChange={e => setLastName(e.target.value)}
                            />
                          </Col>
                          <Col lg={12} as={Form.Group} className="mb-3">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                              placeholder="Enter username"
                              type="text"
                              value={userName} 
                              onChange={e => setUserName(e.target.value)}
                            />
                          </Col>
                          <Col lg={12} as={Form.Group} className="mb-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                              placeholder="Enter your email id"
                              type="text"
                              value={email} 
                              onChange={e => setEmail(e.target.value)}
                            />
                          </Col>
                          <Col lg={12} as={Form.Group} className="mb-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                              placeholder="Enter your phone number"
                              type="text"
                              value={phone} 
                              onChange={e => setPhone(e.target.value)}
                            />
                          </Col>
    
                          <Col lg={12} as={Form.Group} className="mb-3">
                            <Form.Label>Password</Form.Label>
                            <InputGroup className="password-check">
                              <span className="input-affix-wrapper affix-wth-text">
                                <Form.Control
                                  placeholder="6+ characters"
                                  type={showPassword ? "text" : "password"}
                                  value={password} 
                                  onChange={e => setPassword(e.target.value)}
                                />
                                <Link
                                  to="#"
                                  className="input-suffix text-primary text-uppercase fs-8 fw-medium"
                                  onClick={() => setShowPassword(!showPassword)}
                                >
                                  {showPassword ? (
                                    <span>Hide</span>
                                  ) : (
                                    <span>Show</span>
                                  )}
                                </Link>
                              </span>
                            </InputGroup>
                          </Col>
                        </Row>
                      )
                    }
                    
                    <Form.Check id="logged_in" className="form-check-sm mb-3">
                      <Form.Check.Input type="checkbox" defaultChecked />
                      <Form.Check.Label className="text-muted fs-7">
                        By creating an account you specify that you have read
                        and agree with our <Link to="#">Tearms of use</Link> and{" "}
                        <Link to="#">Privacy policy</Link>. We may keep you
                        inform about latest updates through our default{" "}
                        <Link to="#">notification settings</Link>
                      </Form.Check.Label>
                    </Form.Check>
                    <Button
                      variant="primary"
                      type="submit"
                      className="btn-rounded btn-uppercase btn-block"
                      onClick={handleSubmit}
                    >
                      Create account
                    </Button>
                    <p className="p-xs mt-2 text-center">
                      Already a member ?{" "}
                      <Link to="/auth/login">
                        <u>Sign In</u>
                      </Link>
                    </p>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Body;
