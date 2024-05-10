import React, { useState } from 'react';
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap';
import { Eye, EyeOff } from 'react-feather';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import logoutImg from '../../../assets/dist/img/macaroni-logged-out.png';
import { message } from 'antd';
import Recaptcha from 'react-google-recaptcha';

const Body = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [captchaVerified, setCaptchaVerified] = useState(false);
    const history = useHistory();

    const handleCaptchaVerify = (response) => {
        if(response) {
            setCaptchaVerified(true);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        // if(captchaVerified) {
            const formData = {userName, password};
            try {
                // const res = await fetch('http://localhost:8080/auth/signin', {
                const res = await fetch('https://autoinvest.ai/auth/signin', {
                    method: 'POST',
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify(formData)
                });

                if(res.ok) {
                    message.success("Login Successful");
                    res.json().then(data => {
                        localStorage.setItem("jampackToken", data.token);
                        const role = data.role;
                        localStorage.setItem("jampackRole", role);
                        localStorage.setItem("jampackId", data.id);
                        if(role === "admin") {
                            history.push("/investors");
                        } else {
                            history.push("/dashboard");
                        }
                    })
                    // history.push("/dashboard");
                } else {
                    res.json().then(data => {
                        message.error(data.message);
                    })
                }
            } catch(err) {
                console.error('Error during login:', err);
            } 
        // } else {
        //     message.error("Please complete the CAPTCHA");
        // }
    }

    return (
        <div className="hk-pg-body">
            <Container>
                <Row>
                    <Col xl={7} lg={6} className="d-lg-block d-none v-separator separator-sm">
                        <div className="auth-content py-md-0 py-8">
                            <Row>
                                <Col xxl={9} xl={8} lg={11} className="text-center mx-auto">
                                    <img src={logoutImg} className="img-fluid w-sm-40 w-50 mb-3" alt="login" />
                                </Col>
                            </Row>
                        </div>
                    </Col>
                    <Col xl={5} lg={6} md={7} sm={10} className="position-relative mx-auto">
                        <div className="auth-content py-md-0 py-8">
                            <Form className="w-100" onSubmit={e => handleSubmit(e)} >
                                <Row>
                                    <Col lg={10} className="mx-auto">
                                        <h4 className="mb-4">Sign in to your account</h4>
                                        <Row className="gx-3">
                                            <Col lg={12} as={Form.Group} className="mb-3">
                                                <div className="form-label-group">
                                                    <Form.Label>User Name</Form.Label>
                                                </div>
                                                <Form.Control placeholder="Enter username or email ID" type="text" value={userName} onChange={e => setUserName(e.target.value)} />
                                            </Col>
                                            <Col lg={12} as={Form.Group} className="mb-3">
                                                <div className="form-label-group">
                                                    <Form.Label>Password</Form.Label>
                                                    <Link to="reset-password" className="fs-7 fw-medium">Forgot Password ?</Link>
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
                                        </Row>
                                        <Form.Group>
                                            <Recaptcha
                                                sitekey="6LfYKsQpAAAAAGr0ZDR0WAzZpe9dC-RcAh1dUXMu"
                                                // sitekey={siteKey}
                                                onChange={handleCaptchaVerify}
                                            />
                                        </Form.Group>
                                        <div className="d-flex justify-content-center">
                                            <Form.Check id="logged_in" className="form-check-sm mb-3" >
                                                <Form.Check.Input type="checkbox" defaultChecked />
                                                <Form.Check.Label className="text-muted fs-7">Keep me logged in</Form.Check.Label>
                                            </Form.Check>
                                        </div>
                                        <Button onClick={handleSubmit} variant="primary" type="submit" className="btn-uppercase btn-block">Login</Button>
                                        <p className="p-xs mt-2 text-center">New User ? <Link to="signup"><u>Create new account</u></Link></p>
                                    </Col>
                                </Row>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </Container>
        </div>
    )
}

export default Body;
