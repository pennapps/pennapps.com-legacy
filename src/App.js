import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';
import History from './history/History'
import Timeline from './timeline/Timeline';
import OrganizerList from './organizers/OrganizerList';
import Waypoint from 'react-waypoint';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import events from '../data/events.json';
import currentEventInfo from '../data/currentEvent.json';

const TIMELINE_OFFSET = 200;
const MOBILE_WIDTH = 610;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyViewedEvent: '',
      showOrganizers: false,
      mobile: window.innerWidth <= MOBILE_WIDTH,
      lockScrollListeners: false,
    }

    this.shouldComponentUpdate =
      PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  componentDidMount() {
    this.updateIsMobile();
    window.addEventListener('resize', this.updateIsMobile.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMobile.bind(this));
  }

  updateIsMobile () {
    this.setState({mobile: window.innerWidth <= MOBILE_WIDTH});
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
            
            <h1>The Original College Hackathon</h1>
            

            <a href={currentEventInfo.siteLink || '#'}>
              <div className="button">{currentEventInfo.hasOwnProperty('siteLink') ? ('Enter ' + currentEventInfo.season + " " +  currentEventInfo.year.substring(0, 4) + " site" ) : 'Coming Soon'}</div>
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
            showAll={this.state.mobile}
            event={this.state.currentlyViewedEvent}
            events={events} />
          <History
            noScroll={this.state.mobile} // set to true for mobile
            eventViewCallback={this.changeCurrentlyViewedEvent.bind(this)}
            event={this.state.currentlyViewedEvent}
            events={events}
            lockScrollListeners={this.state.lockScrollListeners}
          />
        </div>
        <div className="footer">
          PennApps is organized by students with the help of <a href="http://www.seas.upenn.edu/">Penn Engineering</a>. This website is open sourced on <a href="https://github.com/pennapps/pennapps.com">Github</a>.
        </div>
      </div>
    );
  }
}

export default App;
