import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import History from './History'
import Timeline from './Timeline';
import OrganizerList from './organizers/OrganizerList';
import VisibilitySensor from 'react-visibility-sensor'
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
    }

    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  changeCurrentlyViewedEvent(event) {
    if (event) {
      this.setState({ currentlyViewedEvent: event });
    }
  }

  splashVisibleCallack(event) {
    this.setState({showOrganizers: !event});
  }

  render() {
    return (
      <div className="landing">
        <div className="splash">
          <Timeline />
          <div className="head-text">
            <img src={logo} alt="logo" className="logo"></img>
            <h1>PennApps</h1>
            <h2>{currentEventInfo.season} {currentEventInfo.year}</h2>
            <a href={currentEventInfo.siteLink}>
              <div className="button">Enter Site</div>
            </a>
          </div>
        </div>
        <div className="content">
          <VisibilitySensor
            onChange={this.splashVisibleCallack.bind(this)}
            scrollCheck={true}
            offset={{top: TIMELINE_OFFSET}}
          />
          <OrganizerList
            showAny={this.state.showOrganizers}
            event={this.state.currentlyViewedEvent}
            events={events} />
          <History
            eventViewCallback={this.changeCurrentlyViewedEvent.bind(this)}
            event={this.state.currentlyViewedEvent}
            events={events}
          />
        </div>
      </div>
    );
  }
}

export default App;
