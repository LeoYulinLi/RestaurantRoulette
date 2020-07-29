import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Message from './message';
import './chat.scss';

function Chat(props) {
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
  const [bottomHeight, setBottomHeight] = useState(0);
  const [toggleTopButton, setTopButton] = useState('hidden');
  const [toggleBottomButton, setBottomButton] = useState('hidden');

  const msgContainer = useRef(null);
  useEffect(() => {
    msgContainer.current = document.querySelector('.message-container');
  }, [])

  useEffect(() => {
    if (!activeScroll &&
        msgContainer.current.scrollHeight > msgContainer.current.clientHeight
    ) {
      setActiveScroll(true);
      setTopButton('revealed');
    }
  }, [messages]);

  function handleScroll() {
    if (activeScroll) {
      const bottomHeight = 
        msgContainer.current.scrollHeight - msgContainer.current.clientHeight;
      setBottomHeight(bottomHeight);

      if (msgContainer.current.scrollTop === 0) {
        setTopButton('hidden');
        setBottomButton('revealed');
      } else if (msgContainer.current.scrollTop === bottomHeight) {
        setTopButton('revealed');
        setBottomButton('hidden');
      } else {
        setTopButton('revealed');
        setBottomButton('revealed');
      }
    }
  }

  function scroll(location) {
    return e => {
      e.preventDefault();
      if (location === 'top') {
        msgContainer.current.scrollTop = 0;
        setTopButton('hidden')
      } else {
        msgContainer.current.scrollTop = bottomHeight;
        setBottomButton('hidden');
      }
    }
  }
  
  function sendMessage(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (e.target.textContent) {
        // socket.emit('message', { message: e.target.textContent });
        // setMessages( [e.target.textContent].concat(messages) );
        e.target.textContent = '';
      }
    }
  }
  
  return (
    <div
      className="chat-container"
      onMouseEnter={ () => setHover(true) }
      onMouseLeave={ () => setHover(false) }
    >
      <div className="messages-header">
        <h1>Messages</h1>
      </div>
      
      <div
        className={`scroll-button to-top ${toggleTopButton}`}
        onClick={scroll('top')}
        >
        ⬆
      </div>

      <div className={`message-container ${toggleScrollbar}`}
        onScroll={handleScroll}
        >
        { displayMessages }
      </div>

      <div
        className={`scroll-button to-bottom ${toggleBottomButton}`}
        onClick={scroll('bottom')}
      >
        ⬇
      </div>

      <div className="message-input-container">
        <span
          className="message-input"
          contentEditable="true"
          placeholder="Type a message..."
          onKeyDown={sendMessage}
        />
      </div>
    </div>
  );
}

export default Chat;