import {
  Copy,
  Download,
  Eye,
  Info,
  Link2,
  SkipForward,
  Trash2,
  UserPlus,
} from "react-feather";

//Images
import symbolAvatar1 from "../../../../assets/dist/img/symbol-avatar-1.png";
import symbolAvatar4 from "../../../../assets/dist/img/symbol-avatar-4.png";
import symbolAvatar16 from "../../../../assets/dist/img/symbol-avatar-16.png";
import symbolAvatar12 from "../../../../assets/dist/img/symbol-avatar-12.png";
import symbolAvatar14 from "../../../../assets/dist/img/symbol-avatar-14.png";
import logoAvatar2 from "../../../../assets/dist/img/logo-avatar-2.png";
import logoAvatar10 from "../../../../assets/dist/img/logo-avatar-10.png";

export const documents = [
  {
    id: 1,
    fileName: "Form CRS.pdf",
    icon: "bi-file-pdf-fill",
    fileSize: "2,635 KB",
    bgColor: "avatar-soft-danger",
  },
  {
    id: 2,
    fileName: "Reg TPA.doc",
    icon: "bi-file-text-fill",
    fileSize: "1.23 MB",
    bgColor: "avatar-soft-blue",
  },
  {
    id: 3,
    fileName: "Disclaimers.pdf",
    icon: "bi-file-pdf-fill",
    fileSize: "1,725 KB",
    bgColor: "avatar-soft-danger",
  },
  {
    id: 4,
    fileName: "Foundation-IOM.doc",
    icon: "bi-file-text-fill",
    fileSize: "293 KB",
    bgColor: "avatar-soft-blue",
  },
  {
    id: 5,
    fileName: "Foundation IOM.pdf",
    icon: "bi-file-pdf-fill",
    fileSize: "1,429 KB",
    bgColor: "avatar-soft-danger",
  },
  {
    id: 6,
    fileName: "IOM Supplement.doc",
    icon: "bi-file-text-fill",
    fileSize: "1.15 MB",
    bgColor: "avatar-soft-blue",
  },
  {
    id: 7,
    fileName: "Risk Disclosures.pdf",
    icon: "bi-file-pdf-fill",
    fileSize: "1.32 MB",
    bgColor: "avatar-soft-danger",
  },
];

export const documentActionItems = [
  { id: 1, name: "Preview", icon: <Eye /> },
  { id: 2, name: "Duplicate", icon: <Copy /> },
  { id: 3, name: "Move", icon: <SkipForward /> },
  { id: 4, name: "Invite", icon: <UserPlus /> },
  { id: 5, name: "Share Link", icon: <Link2 /> },
  { id: 6, name: "View Details", icon: <Info /> },
  { id: 7, name: "Download", icon: <Download /> },
  { id: 8, name: "Delete", icon: <Trash2 /> },
];

export const investmentSummaryItems = [
  {
    id: 1,
    listItem:
      "Innovative Layer 1: Scaling, security, decentralization, unique features.",
  },
  {
    id: 2,
    listItem: "Autonomous Smart Contracts open up new functionality.",
  },
  {
    id: 3,
    listItem:
      "High Transaction Efficiency: Utilizes Blockclique and DAG multithreading.",
  },
  {
    id: 4,
    listItem: "Focused on Security: Recognized for resilience by CertiK.",
  },
  {
    id: 5,
    listItem: "Testnet Achievement: 8,000+ nodes (based on company data)",
  },
  {
    id: 6,
    listItem:
      "70K wallets (based on company data), 100K Discord, 50K Twitter followers.",
  },
  {
    id: 7,
    listItem: "DEX Innovation: Automated orders, decentralized frontend.",
  },
];

export const opportunityItems = [
  {
    id: 1,
    listItem: (
      <text>
        <strong>Market Potential: </strong>Autonomous Smart Contracts and
        on-chain web capabilities, positions it to capture a significant share
        in the market and to revolutionize various industry sectors.
      </text>
    ),
  },
  {
    id: 2,
    listItem: (
      <text>
        <strong>Decentralization Benefits: </strong>Embracing genuine
        decentralization, provides a robust alternative to traditional
        centralized systems, offering enhanced security and autonomy.
      </text>
    ),
  },
  {
    id: 3,
    listItem: (
      <text>
        <strong>Community and User Base Expansion: </strong>The platform's
        engaging and growing community indicates a strong potential for
        widespread adoption.
      </text>
    ),
  },
];

export const offeringListItems = [
  {
    id: 1,
    listItem: "~ $32M lifetime revenue (95% of Sales Online Only)",
  },
  {
    id: 2,
    listItem: "$10M in Gross Revenue 2022 + In-house manufacturing",
  },
  {
    id: 3,
    listItem: "260,000+ Customers",
  },
  {
    id: 4,
    listItem: "460 Ultra Beauty Stores",
  },
  {
    id: 5,
    listItem: "Private celebrity investor with substantial industry influence",
  },
];

export const dealTermsItems = [
  {
    id: 1,
    label: "Minimum Investment",
    value: "$250",
  },
  {
    id: 2,
    label: "Maximum Investment",
    value: "$100,000",
  },
  {
    id: 3,
    label: "Funding goal",
    value: "$2.9M",
  },
  {
    id: 4,
    label: "Deadline",
    value: "Feb 23, 2024",
  },
  {
    id: 5,
    label: "Type of security",
    value: "Token Purchase Agreement",
  },
  {
    id: 6,
    label: "Price per token",
    value: "$0.1-0.12",
  },
];

export const relatedCompanies = [
  {
    id: 1,
    name: "Intercom",
    type: "Chat Application",
    downloads: "15M",
    ratingBg: "primary",
    rating: "4.5",
    image: (
      <div className="avatar avatar-sm avatar-logo">
        <span className="initial-wrap bg-success-light-5">
          <img src={symbolAvatar14} alt="logo" />
        </span>
      </div>
    ),
  },
  {
    id: 2,
    name: "Swiggy",
    type: "Food Delivery",
    downloads: "12M",
    ratingBg: "warning",
    rating: "3.5",
    image: (
      <div className="avatar avatar-sm">
        <img className="avatar-img" src={logoAvatar2} alt="logo" />
      </div>
    ),
  },
  {
    id: 3,
    name: "Medium",
    type: "Blog",
    downloads: "13.5M",
    ratingBg: "danger",
    rating: "2.0",
    image: (
      <div className="avatar avatar-sm">
        <img className="avatar-img" src={logoAvatar10} alt="logo" />
      </div>
    ),
  },
  {
    id: 4,
    name: "Figma",
    type: "Design Tool",
    downloads: "11M",
    ratingBg: "primary",
    rating: "4.5",
    image: (
      <div className="avatar avatar-sm avatar-logo">
        <span className="initial-wrap bg-dark">
          <img src={symbolAvatar12} alt="logo" />
        </span>
      </div>
    ),
  },
];

export const similarCompanies = [
  {
    id: 1,
    image: (
      <div className="avatar avatar-sm avatar-violet mb-3">
        <span className="initial-wrap">H</span>
      </div>
    ),
    name: "Hencework",
    type: "Chat Application",
    ratingValue: "3",
    numberOfRatings: "3,672",
  },
  {
    id: 2,
    image: (
      <div className="avatar avatar-sm avatar-logo mb-3">
        <span className="initial-wrap">
          <img src={symbolAvatar4} alt="logo" />
        </span>
      </div>
    ),
    name: "Jampack",
    type: "Dashboard Template",
    ratingValue: "4.5",
    numberOfRatings: "2,634",
  },
  {
    id: 3,
    image: (
      <div className="avatar avatar-sm avatar-logo mb-3">
        <span className="initial-wrap">
          <img src={symbolAvatar1} alt="logo" />
        </span>
      </div>
    ),
    name: "Tinder",
    type: "Dating App",
    ratingValue: "4",
    numberOfRatings: "2,546",
  },
  {
    id: 4,
    image: (
      <div className="avatar avatar-sm avatar-logo mb-3">
        <span className="initial-wrap">
          <img src={symbolAvatar16} alt="logo" />
        </span>
      </div>
    ),
    name: "Github",
    type: "Developer Geek",
    ratingValue: "3.5",
    numberOfRatings: "1,557",
  },
];
