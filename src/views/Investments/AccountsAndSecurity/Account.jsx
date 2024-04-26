import React from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Link } from 'react-router-dom';

const Account = () => {
  return (
    <div>
      <Form>
        <Row className="gx-3">
          <Col sm={12}>
            <Form.Group>
              <div className="media align-items-center">
                <div className="media-head me-5">
                  <div className="avatar avatar-rounded avatar-xxl avatar-soft-secondary">
                  <span className="initial-wrap">KJ</span>
                  </div>
                </div>
                <div className="media-body">
                  <Button variant="soft-primary" className="btn-file mb-1">
                    Upload Photo
                    <Form.Control type="file" className="upload" />
                  </Button>
                  <Form.Text as="div" className="form-text text-muted">
                    For better preview recommended size is 450px x 450px. Max
                    size 5mb.
                  </Form.Text>
                </div>
              </div>
            </Form.Group>
          </Col>
        </Row>

        {/* Personal Info */}
        <>
          <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
            <span>Personal Info</span>
          </div>
          <Row className="gx-3">
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="text" defaultValue="Kate" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="text" defaultValue="Jones" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="gx-3">
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control type="text" defaultValue="kate" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" defaultValue="kate@hencework.com" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="gx-3">
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="tel" defaultValue="xxxxxxx987" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Form.Label>Personal Website</Form.Label>
                <Form.Control type="text" defaultValue="www.hencework.com" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="gx-3">
            <Col sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Location</Form.Label>
                <Form.Control type="text" defaultValue="Lane no 1, New York" />
              </Form.Group>
            </Col>
          </Row>
          <Row className="gx-3">
            <Col sm={12}>
              <Form.Group className="mb-3">
                <div className="form-label-group">
                  <Form.Label>Bio</Form.Label>
                  <small className="text-muted">1200</small>
                </div>
                <Form.Control
                  as="textarea"
                  rows={8}
                  placeholder="Write an internal note"
                />
                <Form.Text muted>
                  Brief bio about yourself. This will be displayed on your profile
                  page.
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </>

        {/* Tracking Code */}
        <>
          <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
            <span>Tracking Code</span>
          </div>
          <Row className="gx-3">
            <Col sm={12}>
              <Form.Group className="mb-3">
                <Form.Label>Google Analytics tracking code</Form.Label>
                <Form.Control type="text" defaultValue="UA-1387652-1" />
                <Form.Text muted>
                  Track shot and profile views in your Google analytics account,
                  eg. UA-0000000-0
                </Form.Text>
              </Form.Group>
            </Col>
          </Row>
        </>

        {/* Account Changes */}
        <>
          <div className="title title-xs title-wth-divider text-primary text-uppercase my-4">
            <span>Account Changes</span>
          </div>
          <Row className="gx-3">
            <Col sm={6}>
              <Form.Group className="mb-3">
                <Link to="#" className="h5 d-block mb-0">
                  Delete Account
                </Link>
                <Form.Text muted>Delete account and all your data</Form.Text>
              </Form.Group>
            </Col>
            <Col sm={6} className="text-end">
              <Form.Group className="mb-3">
                <Button className="border-danger" variant="soft-danger">Close account</Button>
              </Form.Group>
            </Col>
          </Row>
        </>
        <Button variant="primary" className="mt-5">
          Save Changes
        </Button>
      </Form>
    </div>
  );
};

export default Account;
