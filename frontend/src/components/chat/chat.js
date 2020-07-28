import React, { useState, useEffect, useRef } from 'react';
import Message from './message';
import './chat.scss';

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  let displayMessages = messages.map((message, idx) => (
    <div key={idx} className="message">
      {message}
    </div>
  ));
  
  return (
    <div className="chat-container">
      <span className="message-container">
        { displayMessages }
      </span>

      <span
        className="message-input"
        contentEditable="true"
        onKeyDown={
          (e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              setMessages(
                messages.concat(e.target.textContent)
              );
            }
          }
        }
      />
    </div>
  );
}

export default Chat;