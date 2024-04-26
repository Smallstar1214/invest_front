import classNames from 'classnames';
import React from 'react';
import { Button, Dropdown } from 'react-bootstrap';
import { ChevronDown, ChevronUp, File, FilePlus, FolderPlus, Info, UploadCloud, UserPlus } from 'react-feather';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HkTooltip from '../../../components/@hk-tooltip/HkTooltip';
import { toggleTopNav } from '../../../redux/action/Theme';

const FmHeader = ({ topNavCollapsed, toggleTopNav, toggleSidebar, showSidebar, showInfo, toggleInfo }) => {

    return (
        <header className="fm-header">
            <div className="d-flex align-items-center flex-grow-1">
                <Dropdown>
                    <Dropdown.Toggle as="a" className="fmapp-title link-dark" href="#">
                        <h1>My Documents</h1>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <File />
                            </span>
                            <span>All Files</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <FilePlus />
                            </span>
                            <span>Synced Files</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <UploadCloud />
                            </span>
                            <span>Cloud Document</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                {/* <Form className="mx-3 flex-grow-1 mw-400p" role="search">
                    <Form.Control type="text" placeholder="Search" />
                </Form> */}
            </div>
            <div className="fm-options-wrap">
                <Link to="#" className="btn btn-icon btn-flush-dark btn-rounded flush-soft-hover disabled d-xl-inline-block d-none">
                    <span className="icon">
                        <span className="feather-icon">
                            <UserPlus />
                        </span>
                    </span>
                </Link>
                <Button as="a" variant="flush-dark" className={classNames("btn-icon btn-rounded flush-soft-hover fmapp-info-toggle", { "active": showInfo })} onClick={toggleInfo} >
                    <span className="icon">
                        <span className="feather-icon">
                            <Info />
                        </span>
                    </span>
                </Button>
                <div className="v-separator d-xl-inline-block d-none" />
                <Button as="a" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover ms-0 d-xl-inline-block d-none">
                    <HkTooltip placement="top" title="Add New Folder">
                        <span className="icon">
                            <span className="feather-icon">
                                <FolderPlus />
                            </span>
                        </span>
                    </HkTooltip>
                </Button>
                <Button as="a" variant="flush-dark" className="btn-icon btn-rounded btn-file flush-soft-hover  d-md-inline-block d-none">
                    <HkTooltip placement="top" title="Upload">
                        <span className="icon">
                            <span className="feather-icon">
                                <UploadCloud />
                            </span>
                        </span>
                    </HkTooltip>
                </Button>
                <Button as="a" href="#" variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover hk-navbar-togglable d-sm-inline-block d-none" onClick={() => toggleTopNav(!topNavCollapsed)} >
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
            <div className={classNames("hk-sidebar-togglable", { "active": !showSidebar })} onClick={toggleSidebar} />
        </header>
    )
}

const mapStateToProps = ({ theme }) => {
    const { topNavCollapsed } = theme;
    return { topNavCollapsed }
};

export default connect(mapStateToProps, { toggleTopNav })(FmHeader);