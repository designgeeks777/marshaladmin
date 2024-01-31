import { Button, Nav, NavItem } from "reactstrap";
import Logo from "./Logo";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faBullhorn,
  faPeopleGroup,
  faCalendarDays,
  faPersonPraying,
  faBook,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: faColumns,
  },
  // {
  //   title: "Announcements",
  //   href: "/announcements",
  //   icon: faBullhorn,
  // },
  // {
  //   title: "Life Groups",
  //   href: "/lifeGroups",
  //   icon: faPeopleGroup,
  // },
  // {
  //   title: "Events",
  //   href: "/events",
  //   icon: faCalendarDays,
  // },
  {
    title: "Books",
    href: "/books",
    icon: faMoneyBillTransfer,
  },
  {
    title: "Transaction",
    href: "/transactions",
    icon: faBook,
  },
  // {
  //   title: "Guest Counter",
  //   href: "/guestCounter",
  //   icon: faPeopleGroup,
  // },
];

const Sidebar = () => {
  const showMobilemenu = () => {
    document.getElementById("sidebarArea").classList.toggle("showSidebar");
  };
  let location = useLocation();

  return (
    <div className="p-3">
      <div>
        <Nav vertical className="sidebarNav">
          {navigation.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link
                to={navi.href}
                className={
                  location.pathname === navi.href
                    ? "text-primary nav-link py-3"
                    : "nav-link text-secondary py-3"
                }
                onClick={() => showMobilemenu()}
              >
                <FontAwesomeIcon
                  className="sidenav-icons-color"
                  icon={navi.icon}
                />
                <span className="ms-3 d-inline-block">{navi.title}</span>
              </Link>
            </NavItem>
          ))}
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
