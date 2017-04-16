import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import History from './History'
import Timeline from './Timeline';
import OrganizerList from './organizers/OrganizerList';
import Waypoint from 'react-waypoint';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import events from '../data/events.json';
import currentEventInfo from '../data/currentEvent.json';

const TIMELINE_OFFSET = 200;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyViewedEvent: '',
      showOrganizers: false,
      lockScrollListeners: false,
    }

    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  changeCurrentlyViewedEvent(event, callback) {
    if (event && !this.state.lockScrollListeners) {
      this.setState({ currentlyViewedEvent: event }, callback);
    }
  }

  splashActionCallback(action) {
    this.setState({showOrganizers: action})
  }

  lockScrollListeners() {
    this.setState({lockScrollListeners: !this.state.lockScrollListeners});
  }

  render() {
    return (
      <div className="landing">
        <div className="splash">
          <Timeline
            eventSelectionCallback={this.changeCurrentlyViewedEvent.bind(this)}
            event={this.state.currentlyViewedEvent}
            lockHistoryScrollListener={this.lockScrollListeners.bind(this)}
          />
          <div className="head-text">
            <img src={logo} alt="logo" className="logo"></img>
            <h1>PennApps</h1>
            <h2>{currentEventInfo.season} {currentEventInfo.year}</h2>
            <a href={currentEventInfo.siteLink}>
              <div className="button">Enter Site</div>
            </a>
          </div>
        </div>
        <Waypoint
          onEnter={this.splashActionCallback.bind(this, false)}
          onLeave={this.splashActionCallback.bind(this, true)}
          topOffset={TIMELINE_OFFSET}
        />

        <div className="content">
          <OrganizerList
            showAny={this.state.showOrganizers}
            event={this.state.currentlyViewedEvent}
            events={events} />
          <History
            noScroll={false} // set to true for mobile
            eventViewCallback={this.changeCurrentlyViewedEvent.bind(this)}
            event={this.state.currentlyViewedEvent}
            events={events}
            lockScrollListeners={this.state.lockScrollListeners}
          />
        </div>
      </div>
    );
  }
}

export default App;
