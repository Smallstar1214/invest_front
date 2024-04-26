import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { ChevronDown, ChevronUp } from 'react-feather';
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toggleTopNav } from '../../../../redux/action/Theme';
import HkTooltip from '../../../../components/@hk-tooltip/HkTooltip';

const Header = ({ topNavCollapsed, toggleTopNav }) => {
    return (
        <div className="d-flex">
            <div className="d-flex align-items-center flex-1">
                <Link to="#" className="integrationsapp-title link-dark flex-shrink-0 p-3">
                    <h4>Invest in Pre-IPO, Direct Listing</h4>
                </Link>
                <Form className="ms-3 w-xl-30 d-md-block d-none" role="search">
                    <Form.Control type="text" placeholder="Search by categories, name, tag" />
                </Form>
            </div>
            <div className="d-flex align-items-center mx-4">
                <Form.Select className="me-2">
                    <option value={0}>Popular</option>
                    <option value={1}>New Apps</option>
                    <option value={2}>Recommended</option>
                    <option value={3}>Developer's Tools</option>
                </Form.Select>
                <Button as="a" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none" onClick={() => toggleTopNav(!topNavCollapsed)} >
                    <HkTooltip placement={topNavCollapsed ? "bottom" : "top"} title="Collapse" >
                        <span className="icon">
                            <span className="feather-icon">
                                {
                                    topNavCollapsed ? <ChevronDown /> : <ChevronUp />
                                }
                            </span>
                        </span>
                    </HkTooltip>
                </Button>
            </div>
        </div>
    )
}

const mapStateToProps = ({ theme }) => {
    const { topNavCollapsed } = theme;
    return { topNavCollapsed }
};
export default connect(mapStateToProps, { toggleTopNav })(Header);