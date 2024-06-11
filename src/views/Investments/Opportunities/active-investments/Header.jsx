import React from 'react';
import classNames from 'classnames';
import { Button, Form } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import { connect } from 'react-redux';
import HkTooltip from '../../../../components/@hk-tooltip/HkTooltip';
import { toggleTopNav } from '../../../../redux/action/Theme';

const Header = ({ topNavCollapsed, toggleTopNav, toggleSidebar, showSidebar, toggleInfo }) => {
    return (
        <header className="todo-header">
            <div className="d-flex align-items-center">
                <h4>Active Investments</h4>
            </div>
            <div className="todo-options-wrap">
                <Form className="d-sm-block d-none" role="search">
                    <Form.Control type="text" placeholder="Search" />
                </Form>
                <Button as="a" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover hk-navbar-togglable" onClick={() => toggleTopNav(!topNavCollapsed)} >
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
            <div
                // className={classNames("hk-sidebar-togglable", { "active": showSidebar })}
                className={classNames("hk-sidebar-togglable", { "active": showSidebar })}
                // onClick={toggleSidebar}
            />
        </header>
    )
}

const mapStateToProps = ({ theme }) => {
    const { topNavCollapsed } = theme;
    return { topNavCollapsed }
};

export default connect(mapStateToProps, { toggleTopNav })(Header);