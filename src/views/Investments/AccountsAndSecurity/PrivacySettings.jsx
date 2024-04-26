import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

const checkboxItems = [
  {
    label: "Let others find me by email address",
    description: "People who have your email address will be able to connect you by Jampack"
  },
  {
    label: "Keep my phone number private",
    description: "No one can find you by your phone number. Your phone number will not be shared with your contact anymore."
  },
  {
    label: "All keep my location sharing on",
    description: "Jampack webapp shares your location wherever you go"
  },
  {
    label: "Share data through select partnerships",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque condimentum mauris volutpat enim ornare iaculis. Curabitur euismod rutrum lorem id lobortis. Cras ut ex dui. Nulla sed blandit tortor. In quam diam, efficitur sit amet pulvinar eget, consequat placerat arcu."
  },
]

const PrivacySettings = () => {
  return (
    <>
      <div className="title-lg fs-5 mb-4">
        <span>Privacy Settings</span>
      </div>
      <Form>
        <Row className="gx-3">
          <Col sm={12}>
            {checkboxItems.map((item, index) => (
              <div key={index}>
                <Form.Check className="form-check-lg">
                <Form.Check.Input id={`customChecks${index+1}`} />
                <Form.Check.Label htmlFor={`customChecks${index+1}`}>
                  {item?.label}
                </Form.Check.Label>
                <Form.Text muted className="d-block">
                  {item?.description}
                </Form.Text>
                </Form.Check>
                <div className="separator" />
              </div>
            ))}
          </Col>
        </Row>
        <Button variant="primary" className="mt-5">
          Save Changes
        </Button>
      </Form>
    </>
  );
};

export default PrivacySettings;
