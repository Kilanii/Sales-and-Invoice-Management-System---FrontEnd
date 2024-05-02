import { Outlet } from "react-router-dom";
import TopBar from "../../../Components/TopBar";
import "./dashboard.css";
import SideBar from "../../../Components/SideBar";
import "../../../index.css"

function Dashboard() {
  return (
    <div>
      <TopBar />
      <div className="dashboard">
        <SideBar />
        <div className="container">
          <Outlet/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
