import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import History from './History'
import Timeline from './Timeline';
import OrganizerList from './organizers/OrganizerList';

const MOST_RECENT_EVENT = '2017s';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyViewedEvent: MOST_RECENT_EVENT,
    }
  }

  changeCurrentlyViewedEvent(event) {
    if (event) {
      this.setState({ currentlyViewedEvent: event });
    }
  }

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
          <History
            eventViewCallback={this.changeCurrentlyViewedEvent.bind(this)}
            event={this.state.currentlyViewedEvent}
          />
          <OrganizerList event={this.state.currentlyViewedEvent} />
        </div>
      </div>
    );
  }
}

export default App;
