import React from 'react';
import { Button } from 'react-bootstrap';
import { ChevronDown, ChevronUp } from 'react-feather';
import { connect } from 'react-redux';
import HkTooltip from '../../../components/@hk-tooltip/HkTooltip';
import { toggleTopNav } from '../../../redux/action/Theme';

const InvestorsPageHeader = ({ topNavCollapsed, toggleTopNav }) => {

    return (
        <header className="contact-header">
            <div className="d-flex align-items-center">
                    <div className="contactapp-title link-dark" href="#" >
                        <h1>Investors</h1>
                    </div>
            </div>
            <div className="">
                <Button as="a" href="#" className="btn-icon btn-flush-dark btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none" onClick={() => toggleTopNav(!topNavCollapsed)} >
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
        </header>
    )
}

const mapStateToProps = ({ theme }) => {
    const { topNavCollapsed } = theme;
    return { topNavCollapsed }
};

export default connect(mapStateToProps, { toggleTopNav })(InvestorsPageHeader);