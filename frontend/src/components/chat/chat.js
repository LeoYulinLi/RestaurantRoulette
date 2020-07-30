import React, { useState, useEffect, useRef } from 'react';
import './chat.scss';

function Chat({ socket, username, roomId, emitMessage, onMessage }) {
  const [messages, setMessages] = useState([]);
  let displayMessages = messages.map((message, idx) => {
    if (message.username === username) {
      return (
        <span key={idx} className="message sent">
          {message.message}
        </span>
      );
    }
    
    if (messages.length > 1 &&
        idx < messages.length - 1 && 
        messages[idx + 1].username === message.username
    ) {
      return (
        <span className="message received">
          {message.message}
        </span>
      );
    }

    return (
      <>
        <span className="message received">
          {message.message}
        </span>
        <div>{message.username}</div>
      </>
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
        console.log(data);
        setMessages(messages =>
          [{ username: data.username, message: data.message }].concat(messages)
        );
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
