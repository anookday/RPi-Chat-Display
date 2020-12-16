import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';

const { ipcRenderer } = window.require('electron');

const App = () => {
  const [username, setUsername] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    ipcRenderer.on('message', (event, { name, msg }) => {
      console.log(name, msg);
      setUsername(name);
      setMessage(msg);
    });
  }, []);

  const renderContent = () => {
    return (
      <p className="chatMessage">
        <b className="text-green">{username}: </b>
        {message}
      </p>
    );
  };

  return <div className="appContainer">{renderContent()}</div>;
};

ReactDOM.render(<App />, document.querySelector('#root'));
