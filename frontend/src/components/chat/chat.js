import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';
import './chat.scss';

function Chat({ socket }) {
  const [messages, setMessages] = useState([]);
  let displayMessages = messages.map((message, idx) => {
    const messageLocation = 
      idx === messages.length - 1 ? 'top-message'    :
      idx ===                   0 ? 'bottom-message' : '';


    return (
      <span key={idx} id={messageLocation} className="message">
        {message}
      </span>
    );
  });

  const [hover, setHover] = useState(false);
  const toggleScrollbar = hover ? 'revealed' : 'hidden';
  let msgContainer, scrollHeight, bottomHeight;
  useEffect(() => {
    // msgContainer = document.querySelector('.message-container');
    // scrollHeight = msgContainer.scrollHeight;
    // bottomHeight = scrollHeight - msgContainer.clientHeight;
    const temp = document.querySelector('.message-container');
    debugger
    temp.dispatchEvent(new KeyboardEvent('keypress',  {'key':'h'}));
  });

  
  return (
    <div
      className="chat-container"
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
    >
      <h1>Messages</h1>
      <div className={`message-container ${toggleScrollbar}`}
        onKeyDown={
          e => {
            debugger
          }
        }
      >
        <div
          onClick={
            (e) => {
              e.preventDefault();
              e.target.parentElement.dispatchEvent(new Event('focus'));
              e.target.parentElement.dispatchEvent(
                new KeyboardEvent('keydown', {'key': 'Home'})
              );
            }
          }
        >
          Go to the top
        </div>
        { displayMessages }
      </div>

      <div className="message-input-container">
        <span
          className="message-input"
          contentEditable="true"
          placeholder="Type a message..."
          onKeyDown={
            (e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                if (e.target.textContent) {
                  setMessages(
                    [e.target.textContent].concat(messages)
                  );
                  e.target.textContent = '';
                }
              }
            }
          }
        />
      </div>
    </div>
  );
}

export default Chat;