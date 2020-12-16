import React from 'react';
import './index.css';

const App = () => {
  const renderContent = () => {
    let username = 'elonmusk';
    let message = 'EZ Clap EZ Clap EZ Clap EZ Clap EZ Clap EZ Clap';
    return (
      <p className="chatMessage">
        <b className="text-green">{username}: </b>
        {message}
      </p>
    );
  };

  return <div className="appContainer">{renderContent()}</div>;
};

export default App;
