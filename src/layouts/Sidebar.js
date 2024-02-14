import { Nav, NavItem } from "reactstrap";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faColumns,
  faBook,
  faMoneyBillTransfer,
} from "@fortawesome/free-solid-svg-icons";
const navigation = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: faColumns,
  },
  {
    title: "Books",
    href: "/books",
    icon: faMoneyBillTransfer,
  },
  {
    title: "Orders",
    href: "/orders",
    icon: faBook,
  },
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
