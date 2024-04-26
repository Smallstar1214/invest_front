// recommended list images
import symbolAvatar12 from "../../../../assets/dist/img/symbol-avatar-12.png";
import symbolAvatar14 from "../../../../assets/dist/img/symbol-avatar-14.png";
import logoAvatar2 from "../../../../assets/dist/img/logo-avatar-2.png";
import logoAvatar10 from "../../../../assets/dist/img/logo-avatar-10.png";

// popular companies images
import symbolAvatar1 from "../../../../assets/dist/img/symbol-avatar-1.png";
import symbolAvatar4 from "../../../../assets/dist/img/symbol-avatar-4.png";
import symbolAvatar5 from "../../../../assets/dist/img/symbol-avatar-5.png";
import symbolAvatar15 from "../../../../assets/dist/img/symbol-avatar-15.png";
import symbolAvatar16 from "../../../../assets/dist/img/symbol-avatar-16.png";
import logoAvatar1 from "../../../../assets/dist/img/logo-avatar-1.png";
import logoAvatar3 from "../../../../assets/dist/img/logo-avatar-3.png";

export const recommendedList = [
  {
    id: 1,
    appName: "Intercom",
    appCategory: "Chat Application",
    description: "Ref D offering and aiming on SaaS doing Ref CF offering",
    logo: symbolAvatar14,
    buttonLabel: "Read Offering",
    numberOfInvestors: 1245,
  },
  {
    id: 2,
    appName: "Swiggy",
    appCategory: "Food Delivery",
    description: "Food Delivery App and doing Ref CF offering",
    logo: logoAvatar2,
    buttonLabel: "Read Offering",
    numberOfInvestors: 1783,
  },
  {
    id: 3,
    appName: "Medium",
    appCategory: "Blog",
    description: "Ref CF offering from an AI content writing blog",
    logo: logoAvatar10,
    buttonLabel: "Read Offering",
    numberOfInvestors: 1356,
  },
  {
    id: 4,
    appName: "Figma",
    appCategory: "Design Tool",
    description: "Design tool testing the waters before NASDAQ",
    logo: symbolAvatar12,
    buttonLabel: "Read Offering",
    numberOfInvestors: 2911,
  },
];

export const popularCompanies = [
  {
    id: 1,
    image: (
      <div className="avatar avatar-sm avatar-violet mb-3">
        <span className="initial-wrap">H</span>
      </div>
    ),
    name: "Hencework",
    category: "Design Agency",
    description:
      "Id diam maecenas consectetur lorem donec massa faucibus ultricies mi eget mauris. At consectetur lorem donec massa sapien faucibus etc.",
    numberOfInvestors: "70.2K",
    buttonLabel: "Read Offering",
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
    category: "Dashboard Template",
    description:
      "Ac ut consequat semper viverra nam libero justo laoreet sit. Consectetur adipiscing elit duis tristique sollicitudin nibh sit amet commodo.",
    numberOfInvestors: "4,537",
    buttonLabel: "Invest",
  },
  {
    id: 3,
    image: (
      <div className="avatar avatar-sm avatar-logo mb-3">
        <span className="initial-wrap">
          <img src={symbolAvatar16} alt="logo" />
        </span>
      </div>
    ),
    name: "Github",
    category: "Developer Geek",
    description:
      "Tellus in hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Elit at imperdiet dui accumsan sit. Condimentum lacinia.",
    numberOfInvestors: "24.8M",
    buttonLabel: "Read Offering",
  },
  {
    id: 4,
    image: (
      <div className="avatar avatar-sm avatar-logo mb-3">
        <span className="initial-wrap">
          <img src={symbolAvatar5} alt="logo" />
        </span>
      </div>
    ),
    name: "Dribbble",
    category: "Inspiration",
    description:
      "Venenatis tellus in metus vulputate eu scelerisque felis imperdiet proin. Tortor pretium viverra suspendisse potenti nullam ac tortor vitae.",
    logo: symbolAvatar12,
    numberOfInvestors: "1,245",
    buttonLabel: "Read Offering",
  },
  {
    id: 5,
    image: (
      <div className="avatar avatar-sm mb-3">
        <img src={logoAvatar1} className="avatar-img" alt="logo" />
      </div>
    ),
    name: "Phone Pay",
    category: "Payment",
    description:
      "Facilisi nullam vehicula ipsum a arcu cursus vitae congue. Dictum fusce ut placerat orci. Semper viverra nam libero justo laoreet sit amet.",
    numberOfInvestors: "234",
    buttonLabel: "Invest",
  },
  {
    id: 6,
    image: (
      <div className="avatar avatar-sm mb-3">
        <img src={logoAvatar3} className="avatar-img" alt="logo" />
      </div>
    ),
    name: "Coursera",
    category: "Online Courses",
    description:
      "Purus viverra accumsan in nisl nisi scelerisque. Quam vulputate dignissim suspendisse in est ante. Est ultricies integer quis auctor elit sed. ",
    numberOfInvestors: "8,769",
    buttonLabel: "Read Offering",
  },
  {
    id: 7,
    image: (
      <div className="avatar avatar-sm avatar-logo mb-3">
        <span className="initial-wrap">
          <img src={symbolAvatar1} alt="logo" />
        </span>
      </div>
    ),
    name: "Tinder",
    category: "Dating App",
    description:
      "Laoreet suspendisse interdum consectetur libero id faucibus. Egestas pretium aenean pharetra magna ac placerat vestibulum lectus mauris. ",
    numberOfInvestors: "1,245",
    buttonLabel: "Read Offering",
  },
  {
    id: 8,
    image: (
      <div className="avatar avatar-sm avatar-logo mb-3">
        <span className="initial-wrap">
          <img src={symbolAvatar15} alt="logo" />
        </span>
      </div>
    ),
    name: "Kickstarter",
    category: "Fundraiser",
    description:
      "Viverra nam libero justo laoreet sit amet libero justo laoreet amet cursus sit amet. Faucibus vitae aliquet nec ullamcorper. ",
    numberOfInvestors: "9K",
    buttonLabel: "Invest",
  },
];
