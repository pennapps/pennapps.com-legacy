import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import History from './History'
import Timeline from './Timeline';
import OrganizerList from './organizers/OrganizerList';

class App extends Component {
  render() {
    return (
      <div className="landing">
        <div className="splash">

          <Timeline />

          <img src={logo} alt="logo" className="logo"></img>
          <div className="head-text">
            <h1>PennApps</h1>
            <h2>Fall 2017</h2>
            <a><div className="button">Enter Site</div></a>
          </div>
        </div>

        <div className="content">
          <History />
          <OrganizerList event={'2015f'} />
        </div>

      </div>
    );
  }
}

export default App;
