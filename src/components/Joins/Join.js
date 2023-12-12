import React, { useState } from "react";
import "./join.css";
// import logo from "../../images/logo.png";
import { Link } from "react-router-dom";
import { IoChatbubbleOutline } from "react-icons/io5";
let user;

const sendUser = () => {
  user = document.getElementById("joinInput").value;
  document.getElementById("joinInput").value = "";
};

const Join = () => {
  const [name, setname] = useState("");

  return (
    <div className="JoinPage">
      <div className="JoinContainer">
        {/* <img src={logo} alt="logo" /> */}
         
        <h1 className="heading">
          <img
            style={{ width: "35%", height: "40%" }}
            src="https://www.svgrepo.com/show/6995/chat.svg"
          />
          Chat - App
        </h1>
        <div className="input-part">
          <input
            onChange={(e) => setname(e.target.value)}
            placeholder="Enter Your Name"
            type="text"
            id="joinInput"
          />
          <Link
            onClick={(event) => (!name ? event.preventDefault() : null)}
            to="/chat"
          >
            {" "}
            <button onClick={sendUser} className="joinbtn">
              Login In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Join;
export { user };
