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

  const [activeScroll, setActiveScroll] = useState(false);
  const [scrollTop, setScrollTop] = useState(0);
  const [bottomHeight, setBottomHeight] = useState(0);
  const [scrollMessage, setScrollMessage] = useState('');

  const msgContainer = useRef(null);
  useEffect(() => {
    msgContainer.current = document.querySelector('.message-container');
  }, [])

  useEffect(() => {
    if (!activeScroll &&
        msgContainer.current.scrollHeight > msgContainer.current.clientHeight
    ) {
      setActiveScroll(true);
    }

    if (activeScroll) {
      setBottomHeight(
        msgContainer.current.scrollHeight - msgContainer.current.clientHeight
      );

      if (msgContainer.current.scrollTop) {
        setScrollMessage('Go to top');
        setScrollTop(0);
      } else {
        setScrollMessage('Go to bottom');
        setScrollTop(bottomHeight);
      }
    }
  }, [messages]);
  
  return (
    <div
      className="chat-container"
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
    >
      <h1>Messages</h1>
      <div className={`message-container ${toggleScrollbar}`}>
        <div
          onClick={
            (e) => {
              e.preventDefault();
              msgContainer.current.scrollTop = scrollTop;
            }
          }
        >
          { scrollMessage }
        </div>
        
        { displayMessages }
        
        <div
          onClick={
            (e) => {
              e.preventDefault();
              msgContainer.current.scrollTop = scrollTop;
            }
          }
        >
          { scrollMessage }
        </div>
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