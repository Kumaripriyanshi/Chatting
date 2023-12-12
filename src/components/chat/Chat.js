import React, { useEffect, useState } from "react";
import { user } from "../Joins/Join";
import socketIo from "socket.io-client";
import "./Chat.css";
import Message from "../message/Message";
import ReactScrollToBottom from "react-scroll-to-bottom";


let socket;

const ENDPOINT = "https://magical-wise-mitten.glitch.me/";

const Chat = () => {
  const [id, setid] = useState("");
  const [messages, setMessages] = useState([]);

  const send = () => {
    const message = document.getElementById("chatInput").value;
    socket.emit("message", { message, id });
    document.getElementById("chatInput").value = "";
  };

  console.log(messages);
  useEffect(() => {
    socket = socketIo(ENDPOINT, { transports: ["websocket"] });

    socket.on("connect", () => {
      setid(socket.id);
    });
    
    console.log(socket);
    
    socket.emit("joined", { user });

    socket.on("welcome", (data) => {
      setMessages([...messages, data]);
      console.log("user welcome",messages);
    });

    socket.on("userJoined", (data) => {
      setMessages([...messages, data]);
      console.log("user joined",messages);
    });

    socket.on("leave", (data) => {
      setMessages([...messages, data]);
      console.log("user left",messages);
       return () => {
      socket.emit("disconnect");
      socket.off();
    };
    });

    // return () => {
    //   // socket.emit("disconnect");
    //   // socket.off();
    // };

    
  }, []);

  useEffect(() => {
    socket.on("sendMessage", (data) => {
      setMessages([...messages, data]);
      console.log(data.user, data.message, data.id);
    });
    return () => {
      socket.off();
    };
  }, [messages]);

  return (
    <div className="chatPage">
      <div className="chatContainer">
        <div className="header">
          <div className="logo">
          <img
            style={{ width: "37%" }}
            src="https://www.svgrepo.com/show/6995/chat.svg"
          />
          <h2 style={{"margin":"0px"}}>Chat - App</h2>
          </div>
       
          {/* <a href="/"> <img src={closeIcon} alt="Close" /></a> */}
        </div>
        <ReactScrollToBottom className="chatBox">
          {messages.map((item, i) => (
           item.user==="Admin"?<Message key={i}
           user={item.id === id ? "" : item.user}
           message={item.message}
           classs="center"
         />:<Message key={i}
         user={item.id === id ? "" : item.user}
         message={item.message}
         classs={item.id === id ? "right" : "left"}
       />
            
            
          ))}
        </ReactScrollToBottom>
        <div className="inputBox">
          <input
            onKeyPress={(event) => (event.key === "Enter" ? send() : null)}
            type="text"
            id="chatInput"
          />
          <button onClick={send} className="sendBtn">
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
