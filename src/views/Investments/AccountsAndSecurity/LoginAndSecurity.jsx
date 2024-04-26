import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const LoginAndSecurity = () => {
  return (
    <>
      <div className="title-lg fs-5">
        <span>Login &amp; Security</span>
      </div>
      <p className="mb-4">
        The Avatar component is used to represent a user, and displays the
        profile picture, initials or fallback icon.
      </p>
      <Form>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
          <span>Password Settings</span>
        </div>
        <Row className="gx-3">
          <Col sm={12}>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" defaultValue="Katervewe" />
              <Button variant="soft-primary" className="mt-3 border-primary">
                Change password
              </Button>
            </Form.Group>
          </Col>
        </Row>
        <div className="title title-xs title-wth-divider text-primary text-uppercase my-5">
          <span>Additional Security</span>
        </div>
        <Row className="gx-3">
          <Col sm={12}>
            <Form.Group>
              <Form.Label>2-Step Verification (2FA)</Form.Label>
              <Form.Text muted className="d-block">
                2-step verification drastically reduces the chances of having
                the personal information in your Google account stolen by
                someone else. Why? Because hackers would have to not only get
                your password and your username, they'd have to get a hold of
                your phone. A{" "}
                <a href="#some" className="text-primary">
                  6-digit
                </a>{" "}
                code may be sent to a number you’ve previously provided. Codes
                can be sent in a text message (SMS) or through a voice call,
                which depends on the setting you chose. To verify it’s you,
                enter the code on the sign-in screen.
              </Form.Text>
              <Button variant="soft-primary" className="mt-3 border-primary">
                Add Authentication
              </Button>
            </Form.Group>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default LoginAndSecurity;
