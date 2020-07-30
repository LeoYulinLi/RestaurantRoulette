import React, { useState, useEffect, useRef } from 'react';
import './chat.scss';

function Chat({ socket, username }) {
  const [messages, setMessages] = useState([]);
  let displayMessages = messages.map((message, idx) => {
    if (message.connection) {
      if (message.connecter === username) {
        return (
          <div key={idx} className="chat-connection">
            you have {message.connection} the chat
          </div>
        );
      }

      return (
        <div key={idx} className="chat-connection">
          {message.connecter} has {message.connection} the chat
        </div>
      );
    }
    
    if (message.username === username) {
      return (
        <span key={idx} className="message sent">
          {message.message}
        </span>
      );
    }
    
    if (
      idx < messages.length - 1 && 
      messages[idx + 1].username === message.username
    ) {
      return (
        <span key={idx} className="message received">
          {message.message}
        </span>
      );
    }

    return (
      <React.Fragment key={idx}>
        <span className="message received">
          {message.message}
        </span>
        <div className="message-username">{message.username}</div>
      </React.Fragment>
    )
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
        socket.emit('message', e.target.textContent);
        e.target.textContent = '';
      }
    }
  }

  useEffect(() => {
    if (socket) {
      socket.on('chat', (data) => {
        setMessages(messages =>
          [{ username: data.username, message: data.message }].concat(messages)
        );
      });
      socket.on('joinChat', (username) => {
        setMessages(messages =>
          [{ connecter: username, connection: 'joined' }].concat(messages)
        )
      });
      socket.on('leaveChat', (username) => {
        setMessages(messages =>
          [{ connecter: username, connection: 'left' }].concat(messages)
        )
      });
    }
  }, [socket]);
  
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
