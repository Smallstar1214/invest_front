import React from "react";
import { Container, Nav, Tab } from "react-bootstrap";
import PrivacySettings from "./PrivacySettings";
import LoginAndSecurity from "./LoginAndSecurity";
import Account from "./Account";
import BillingInfo from "./BillingInfo";
import Notifications from "./Notifications";

const AccountsAndSecurity = () => {
  return (
    <Container>
      {/* page header */}
      <div className="hk-pg-header pt-7 pb-4">
        <h1 className="pg-title">Edit Profile</h1>
        <p>
          The Avatar component is used to represent a user, and displays the
          profile picture, initials or fallback icon.
        </p>
      </div>

      {/* page body */}
      <Tab.Container defaultActiveKey="tabBlock1">
        <div className="pt-3">
          <Nav variant="tabs" className="nav-line nav-light">
            <Nav.Item>
              <Nav.Link eventKey="tabBlock1">
                <span className="nav-link-text">Account</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tabBlock2">
                <span className="nav-link-text">Privacy Settings</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tabBlock3">
                <span className="nav-link-text">Login & Security</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tabBlock4">
                <span className="nav-link-text">Billing Info</span>
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="tabBlock5">
                <span className="nav-link-text">Notifications</span>
              </Nav.Link>
            </Nav.Item>
          </Nav>
        </div>

        <div className="hk-pg-body">
          <Tab.Content>
            <Tab.Pane eventKey="tabBlock1">
              <Account />
            </Tab.Pane>
            <Tab.Pane eventKey="tabBlock2">
              <PrivacySettings />
            </Tab.Pane>
            <Tab.Pane eventKey="tabBlock3">
              <LoginAndSecurity />
            </Tab.Pane>
            <Tab.Pane eventKey="tabBlock4">
              <BillingInfo />
            </Tab.Pane>
            <Tab.Pane eventKey="tabBlock5">
              <Notifications />
            </Tab.Pane>
          </Tab.Content>
        </div>
      </Tab.Container>
    </Container>
  );
};

export default AccountsAndSecurity;
