import "./bars.css";
import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faUser,
  faSackDollar,
  faTruckField,
  faChartLine,
  faPercent,
  faTable,
  faBox,
  faFileInvoiceDollar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { Menu } from "../context/MenuContext";
import { WindowSize } from "../context/WindowContext";
function SideBar() {
  const menu = useContext(Menu);
  const isOpen = menu.isOpen;
  const WindowContext = useContext(WindowSize);
  const windowSize = WindowContext.windowSize;
  return (
    <>
      <div
        style={{
          position: "fixed",
          top: "70px",
          left: "0",
          widht: "100%",
          backgroundColor: "rgba(0,0,0,0.2",
          display: windowSize < "768" && isOpen ? "block" : "none",
        }}
      ></div>
      <div
        className="side-bar pt-3"
        style={{
          left: windowSize < "768" ? (isOpen ? 0 : "-100%") : 0,
          width: isOpen ? "260px" : "fit-content",
          position: windowSize > "768" ? "fixed" : "sticky",
        }}
      >
        <NavLink
          to={"dashboard"}
          className="d-flex align-items gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faChartLine}
            className="icons "
            style={{ width: isOpen ? "20%" : "100%" }}
          />
          <p className="m-0 " style={{ display: isOpen ? "block" : "none" }}>
            Dashboard
          </p>
        </NavLink>


        <NavLink
          to={"categories"}
          className="d-flex align-items gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faTable}
            className="icons"
            style={{ width: isOpen ? "20%" : "100%" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            category
          </p>
        </NavLink>

        <NavLink
          to={"products"}
          className="d-flex align-items gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faBox}
            className="icons"
            style={{ width: isOpen ? "20%" : "100%" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            product
          </p>
        </NavLink>

        <NavLink
          to={"invoice"}
          className="d-flex align-items gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faFileInvoiceDollar}
            className="icons"
            style={{ width: isOpen ? "20%" : "100%" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            invoice
          </p>
        </NavLink>

        <NavLink
          to={"sales"}
          className="d-flex align-items gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faSackDollar}
            className="icons "
            style={{ width: isOpen ? "20%" : "100%" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            sales
          </p>
        </NavLink>

        <NavLink
          to={"suppliers"}
          className="d-flex align-items gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faTruckField}
            className="icons "
            style={{ width: isOpen ? "20%" : "100%" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            suppliers
          </p>
        </NavLink>

        <NavLink
          to={"customers"}
          className="d-flex align-items gap-2 side-bar-link"
        >
          <FontAwesomeIcon
            icon={faUser}
            className="icons "
            style={{ width: isOpen ? "20%" : "100%" }}
          />
          <p className="m-0" style={{ display: isOpen ? "block" : "none" }}>
            customer
          </p>
        </NavLink>
      </div>
    </>
  );
}

export default SideBar;
