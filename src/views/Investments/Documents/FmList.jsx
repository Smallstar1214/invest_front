import React from 'react';
import { Nav, Tab, } from 'react-bootstrap';
import SimpleBar from 'simplebar-react';
import DocumentsTable from './DocumentsTable';

const FmList = ({ toggleInfo }) => {

    return (
        <div className="fm-body">
            <SimpleBar className="nicescroll-bar">
                <div className="file-list-view">
                    <Tab.Container defaultActiveKey="cloud_doc">
                        <Nav as="ul" variant="tabs" className="nav-line nav-icon nav-light">
                            <Nav.Item as="li">
                                <Nav.Link eventKey="cloud_doc">
                                    <span className="nav-link-text">Company Documents</span>
                                </Nav.Link>
                            </Nav.Item>
                            <Nav.Item as="li">
                                <Nav.Link eventKey="shared_with_me">
                                    <span className="nav-link-text">Shared With Me</span>
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                        <Tab.Content>
                            <Tab.Pane eventKey="cloud_doc">
                                <DocumentsTable />
                            </Tab.Pane>
                            <Tab.Pane eventKey="shared_with_me">
                            </Tab.Pane>
                        </Tab.Content>
                    </Tab.Container>
                </div>
            </SimpleBar>
        </div>
    )
}

export default FmList
