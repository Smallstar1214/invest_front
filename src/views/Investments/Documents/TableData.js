import React from 'react';
import { Copy, Download, Eye, Info, Link2, MoreHorizontal, SkipForward, Trash2, UserPlus } from 'react-feather';
import { Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

//Custom Document Container
export const documentFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <div className="media fmapp-info-trigger" key={indx}>
                <div className="media-head me-3">
                    {data.icons && <div className={classNames("avatar avatar-icon avatar-sm", (`avatar-soft-${data.iconBg}`))}>
                        <span className="initial-wrap">
                            <i className={`ri-${data.icons}`} />
                        </span>
                    </div>}
                    {data.img && <img src={data.img} alt="user" className="d-block img-fluid w-50p" />}
                </div>
                <div className="media-body">
                    <div className="file-name">{data.fileName}</div>
                    <div>{data.fileType}</div>
                </div>
            </div >
        ))
    )
}

//Custom Action Container
export const actionFormater = (cell) => {
    return (
        cell.map((data, indx) => (
            <span className="text-right" key={indx}>
                <Dropdown>
                    <Dropdown.Toggle variant="flush-dark" className="btn-icon btn-rounded flush-soft-hover no-caret" >
                        <span className="icon">
                            <span className="feather-icon">
                                <MoreHorizontal />
                            </span>
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item as={Link} to={data.preview} >
                            <span className="feather-icon dropdown-icon">
                                <Eye />
                            </span>
                            <span>Preview</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <Copy />
                            </span>
                            <span>Duplicate</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <SkipForward />
                            </span>
                            <span>Move</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <UserPlus />
                            </span>
                            <span>Invite</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <Link2 />
                            </span>
                            <span>Share Link</span>
                        </Dropdown.Item>
                        <div className="dropdown-divider" />
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <Info />
                            </span>
                            <span>View Details</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <Download />
                            </span>
                            <span>Download</span>
                        </Dropdown.Item>
                        <Dropdown.Item>
                            <span className="feather-icon dropdown-icon">
                                <Trash2 />
                            </span>
                            <span>Delete</span>
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </span>
        ))
    )
}


export const columns = [
    {
        accessor: "companyName",
        title: "Company Name",
    },
    {
        accessor: "type",
        title: "Type",
    },
    {
        accessor: "lastUpdated",
        title: "Last Updated",
        sort: true,
    },
    {
        accessor: "document",
        title: "Document",
        // sort: true,
        cellFormatter: documentFormater,
        events: {
            onClick: (e) => {
                e.preventDefault();
                // sessionStorage.setItem("FmInfo", true);
            }
        },
    },
    {
        accessor: "size",
        title: "Size",
    },
    {
        accessor: "actions",
        title: "Action",
        cellFormatter: actionFormater,
    },
];

export const data = [
    {
        companyName: "Medium",
        type: "Public",
        document: [{ icons: "file-text-fill", iconBg: "blue", fileName: "minutes_meeting.doc", fileType: "document" }],
        lastUpdated: "18 Feb, 12:25 PM",
        size: "20 KB",
        actions: [{ preview: "#", }]
    },
    {
        companyName: "Figma",
        type: "Confidential",
        document: [{ icons: "folder-2-fill", iconBg: "warning", fileName: "Jampack - HTML - v1.0", fileType: "folder" }],
        lastUpdated: "13 Jul, 1:46 PM",
        size: "501 KB",
        actions: [{ preview: "#", }]
    },
    {
        companyName: "Medium",
        type: "Public",
        document: [{ icons: "file-text-fill", iconBg: "blue", fileName: "expenses.doc", fileType: "document" }],
        lastUpdated: "12 Feb, 12:30 PM",
        size: "76.3 KB",
        actions: [{ preview: "#", }]
    },
    {
        companyName: "Intercom",
        type: "Public",
        document: [{ icons: "file-pdf-fill", iconBg: "danger", fileName: "jampack.pdf", fileType: "pdf" }],
        lastUpdated: "Today, 4:30 PM",
        size: "21.73 MB",
        actions: [{ preview: "#", }]
    },
    {
        companyName: "Figma",
        type: "Confidential",
        document: [{ icons: "file-pdf-fill", iconBg: "danger", fileName: "disclaimers.pdf", fileType: "pdf" }],
        lastUpdated: "Today, 4:30 PM",
        size: "21.73 MB",
        actions: [{ preview: "#", }]
    },

];