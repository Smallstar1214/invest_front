import classNames from "classnames";
import { Badge, Dropdown } from "react-bootstrap";
import { MoreVertical } from "react-feather";

//Images
import avatar2 from "../../../../assets/dist/img/avatar2.jpg";
import avatar7 from "../../../../assets/dist/img/avatar7.jpg";
import avatar9 from "../../../../assets/dist/img/avatar9.jpg";
import avatar10 from "../../../../assets/dist/img/avatar10.jpg";
import avatar15 from "../../../../assets/dist/img/avatar15.jpg";

const avatarFormater = (cell) => {
  return cell.map((data, indx) => (
    <div className="media align-items-center" key={indx}>
      <div className="media-head me-2">
        <div
          className={classNames(
            "avatar avatar-xs avatar-rounded",
            data.cstmAvt ? `avatar-${data.avtBg}` : ""
          )}
        >
          {data.Img && <img src={data.Img} alt="user" className="avatar-img" />}
          {data.cstmAvt && <span className="initial-wrap">{data.cstmAvt}</span>}
        </div>
      </div>
      <div className="media-body">{data.userName}</div>
    </div>
  ));
};

//Custom Tag Container
const tagFormater = (cell) =>
  cell ? (
    <Badge
      size="sm"
      bg="white"
      className={classNames(
        "badge-outline badge-wth-icon",
        { "badge-danger": cell === "High" || cell === "Urgent" },
        { "badge-warning": cell === "Low" },
        { "badge-orange": cell === "Medium" }
      )}
    >
      <span>
        <i className="badge-dot ri-checkbox-blank-circle-fill" />
        {cell}
      </span>
    </Badge>
  ) : null;

//Status Container
const statusFormater = (cell) => {
  return cell.map((data, indx) => (
    <Dropdown className="selectable-dropdown">
      <Dropdown.Toggle
        variant={data.variant}
        className="btn-rounded"
        type="button"
      >
        {data.status}
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item data-color="#5e7d8a">On Hold</Dropdown.Item>
        <Dropdown.Item data-color="#FFC400">In Progress</Dropdown.Item>
        <Dropdown.Item data-color="#9e9e9e">To-Do</Dropdown.Item>
        <Dropdown.Item data-color="#007D88">Done</Dropdown.Item>
        <Dropdown.Item data-color="#FF0101">Pending</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ));
};

//Custom Action Container
const actionFormater = (cell) => {
  return cell.map((data, indx) => (
    <Dropdown>
      <Dropdown.Toggle
        variant="flush-dark"
        className="btn-icon btn-rounded flush-soft-hover dropdown-toggle no-caret"
      >
        <span className="icon">
          <span className="feather-icon">
            <MoreVertical />
          </span>
        </span>
      </Dropdown.Toggle>
      <Dropdown.Menu align="end">
        <Dropdown.Item data-color="#5e7d8a">On Hold</Dropdown.Item>
        <Dropdown.Item data-color="#FFC400">In Progress</Dropdown.Item>
        <Dropdown.Item data-color="#9e9e9e">To-Do</Dropdown.Item>
        <Dropdown.Item data-color="#007D88">Done</Dropdown.Item>
        <Dropdown.Item data-color="#FF0101">Pending</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  ));
};

// Investment, Risk Level, Company, Maturity Date, Status

export const columns = [
  {
    accessor: "investment",
    title: "Investment",
    sort: true,
    // cellFormatter: taskFormater,
  },
  {
    accessor: "riskLevel",
    title: "Risk Level",
    sort: true,
    cellFormatter: tagFormater,
  },
  {
    accessor: "company",
    title: "Company",
    sort: true,
    // cellFormatter: avatarFormater,
    // sortValue: (cell, row) => (cell.map((data) => (data.userName))),
  },
  {
    accessor: "maturityDate",
    title: "Maturity Date",
    sort: true,
  },
  {
    accessor: "status",
    title: "Status",
    sort: true,
    cellFormatter: statusFormater,
  },
  {
    accessor: "actions",
    title: "",
    cellFormatter: actionFormater,
  },
];

export const data = [
  {
    starred: true,
    investment: "Purchased 1800 shares...",
    riskLevel: "High",
    company: "Intercom",
    maturityDate: "Tomorrow",
    status: [{ status: "To-Do", variant: "secondary" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: false,
    investment: "Purchased 325 shares...",
    riskLevel: "High",
    company: "Swiggy",
    maturityDate: <span className="text-danger">Yesterday</span>,
    status: [{ status: "In Progress", variant: "warning" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: false,
    investment: "Purchased 409 shares...",
    riskLevel: "Medium",
    company: "Medium",
    maturityDate: "Today",
    status: [{ status: "Done", variant: "primary" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: true,
    investment: "Purchased 105 shares...",
    riskLevel: "Low",
    company: "Figma",
    maturityDate: "Saturday",
    status: [{ status: "On Hold", variant: "info" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: false,
    investment: "Purchased 324 shares...",
    riskLevel: "High",
    company: "Hencework",
    maturityDate: "Sunday",
    status: [{ status: "In Progress", variant: "warning" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: true,
    investment: "Purchased 204 shares...",
    riskLevel: "Medium",
    company: "Jampack",
    maturityDate: "27 Nov, 2020",
    status: [{ status: "Pending", variant: "danger" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: false,
    investment: "Purchased 1356 shares...",
    riskLevel: "Low",
    company: "Github",
    maturityDate: "Today",
    status: [{ status: "Done", variant: "primary" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: false,
    investment: "Purchased 629 shares...",
    riskLevel: "High",
    company: "Dribble",
    maturityDate: <span className="text-danger">4 Days ago</span>,
    status: [{ status: "In Progress", variant: "warning" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: true,
    investment: "Purchased 455 shares...",
    riskLevel: "Urgent",
    company: "Coursera",
    maturityDate: "3 Aug, 2020",
    status: [{ status: "In Progress", variant: "warning" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
  {
    starred: true,
    investment: "Purchased 150 shares...",
    riskLevel: "Medium",
    company: "Phone Pay",
    maturityDate: "8 Aug, 2020",
    status: [{ status: "On Hold", variant: "info" }],
    actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
  },
//   {
//     starred: false,
//     investment: "Remove notifications panel from inbox",
//     riskLevel: "Urgent",
//     company: "Tinder",
//     maturityDate: "24 Sep, 2020",
//     status: [{ status: "To-Do", variant: "secondary" }],
//     actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
//   },
//   {
//     starred: false,
//     investment: "Send an invite to join project",
//     riskLevel: "Low",
//     company: "Kickstarter",
//     maturityDate: <span className="text-danger">Yesterday</span>,
//     status: [{ status: "In Progress", variant: "warning" }],
//     actions: [{ archiveLink: "#", editLink: "edit-contact", deleteLink: "#" }],
//   },
];
