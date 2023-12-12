import React from 'react'
import "./message.css";


const Message = ({ user, message, classs }) => {
    if (user) {
        return (
            <div className={`messageBox ${classs}`}  >
                {user==="Admin"?` ${message}`:`${user}: ${message}`}
            </div>
        )
    }
    else {
        return (
            <div className={`messageBox ${classs}`}>
                {`You: ${message}`}
            </div>
        )
    }
}

export default Message
