import React from "react";
import "../../component/dashbord/dashbord.css";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { signOut } from "@firebase/auth";

const Dashbord = () => {
  const navigate = useNavigate();

  const logout = () => {
    signOut(auth)
      .then(() => {
        localStorage.clear();
        navigate("/login");
      })
      .catch(console.log);
  };

  return (
    <div className="dashboard-wrapper w-[100%] h-[100vh] flex  ">
      {/* left */}
      <div className="side-nev bg-[#282c34] w-[20%]">
        {/* profile info */}
        <div className="profile-info flex p-2.5 items-center gap-2.5">
          <img
            src={localStorage.getItem("photoURL")}
            className="h-[80px] w-[80px] rounded-full mr-2.5"
            alt="image.."
          />
          <div>
            <p className="text-white text-[20px] ">
              {localStorage.getItem("cName")}
            </p>
            <button onClick={logout} className=" p-1 login text-white">
              Logout
            </button>
          </div>
        </div>
        <hr />
        <div className="profile-info div flex flex-col w-[100%] p-2.5 text-white gap-2.5 mt-5 text-[18px]">
          {/* menu-link */}
          <Link to="/dashbord/home" className="menu-link">
            <i className="fa-solid fa-house"></i> Home
          </Link>
          <Link to="/dashbord/invoices" className="menu-link">
            <i className="fa-solid fa-file-invoice"></i> Invoices
          </Link>
          <Link to="/dashbord/new-invoice" className="menu-link">
            <i className="fa-solid fa-file-circle-plus"></i> New Invoices
          </Link>
          <Link to="/dashbord/setting" className="menu-link">
            <i className="fa-solid fa-gear"></i>Setting
          </Link>
        </div>
      </div>

      {/* right main container*/}
      <div className="main-container w-[80%] bg-[#eee] p-2.5">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashbord;
