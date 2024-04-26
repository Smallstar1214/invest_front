import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row, InputGroup } from "react-bootstrap";
import { Eye, EyeOff } from 'react-feather';
import { Link } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import CommanFooter1 from "../CommanFooter1";

//image
import logoutImg from '../../../assets/dist/img/macaroni-logged-out.png';
import { message } from "antd";

const Body = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {email, password, newPassword};

    try {
      // const res = await fetch('http://localhost:8080/auth/resetPassword', {
      const res = await fetch('http://159.89.241.201:8080/auth/resetPassword', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      if(res.ok) {
        message.success("Password was changed Successfully.");
        history.push('/auth/login');
      } else {
        res.json().then (data => {
          message.error(data.message);
        })
      }
    } catch (err) {
      console.error('Error during change password: ', err);
    }
  }
  
  return (
    <div className="hk-pg-wrapper pt-0 pb-xl-0 pb-5">
      <div className="hk-pg-body pt-0 pb-xl-0">
        <Container>
          <Row>
            <Col xl={7} lg={6} md={5} sm={4} xs={3} className="d-lg-block d-none v-separator separator-sm">
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
            <Col xl={5} lg={6} md={7} sm={8} xs={9} className="position-relative mx-auto">
                <div className="auth-content py-8">
                <Form className="w-100">
                    <Row>
                        <Col lg={9} md={12} sm={12} xs={12} className="mx-auto">
                            <Card className="card-flush">
                            <Card.Body className="text-center">
                                <h4>Reset your Password</h4>
                                {/* <p className="mb-4">
                                  No worries we will mail you 6 digit code to your
                                  recovery email address to reset your password
                                </p> */}
                                <Row className="gx-3">
                                <Col lg={12} as={Form.Group} className="mb-3">
                                    <div className="form-label-group">
                                    <Form.Label htmlFor="userName">
                                        Email
                                    </Form.Label>
                                    {/* <Link to="#" className="fs-7 fw-medium">
                                        Forgot Username ?
                                    </Link> */}
                                    </div>
                                    <Form.Control
                                      placeholder="Recovery email ID"
                                      type="email"
                                      value={email}
                                      onChange={e => setEmail(e.target.value)}
                                    />
                                </Col>
                                <Col lg={12} as={Form.Group} className="mb-3">
                                    <div className="form-label-group">
                                    <Form.Label htmlFor="userName">
                                        Current Password
                                    </Form.Label>
                                    {/* <Link to="#" className="fs-7 fw-medium">
                                        Forgot Username ?
                                    </Link> */}
                                    </div>
                                    <InputGroup className="password-check">
                                      <span className="input-affix-wrapper">
                                          <Form.Control placeholder="Enter your password" value={password} onChange={e => setPassword(e.target.value)} type={showPassword ? "text" : "password"} />
                                          <Link to="#" className="input-suffix text-muted" onClick={() => setShowPassword(!showPassword)} >
                                              <span className="feather-icon">
                                                  {
                                                      showPassword
                                                          ?
                                                          <EyeOff className="form-icon" />
                                                          :
                                                          <Eye className="form-icon" />
                                                  }

                                              </span>
                                          </Link>
                                      </span>
                                  </InputGroup>
                                </Col>
                                <Col lg={12} as={Form.Group} className="mb-3">
                                    <div className="form-label-group">
                                    <Form.Label htmlFor="userName">
                                        New Password
                                    </Form.Label>
                                    {/* <Link to="#" className="fs-7 fw-medium">
                                        Forgot Username ?
                                    </Link> */}
                                    </div>
                                    <InputGroup className="password-check">
                                      <span className="input-affix-wrapper">
                                          <Form.Control placeholder="Enter your password" value={newPassword} onChange={e => setNewPassword(e.target.value)} type={showNewPassword ? "text" : "password"} />
                                          <Link to="#" className="input-suffix text-muted" onClick={() => setShowNewPassword(!showNewPassword)} >
                                              <span className="feather-icon">
                                                  {
                                                      showNewPassword
                                                          ?
                                                          <EyeOff className="form-icon" />
                                                          :
                                                          <Eye className="form-icon" />
                                                  }

                                              </span>
                                          </Link>
                                      </span>
                                  </InputGroup>
                                </Col>
                                </Row>
                                <Button
                                  variant="primary"
                                  className="btn-uppercase btn-block"
                                  onClick={handleSubmit}
                                >
                                  Reset Password
                                </Button>
                            </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Form>
                </div>
            </Col>
          </Row>
        </Container>
      </div>
      {/* Page Footer */}
      <CommanFooter1 />
    </div>
  );
};

export default Body;
