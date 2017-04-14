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
const MOBILE_WIDTH = 610;

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyViewedEvent: '',
      showOrganizers: false,
      mobile: window.innerWidth <= MOBILE_WIDTH
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
    console.log(this.state.mobile);
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
            showAll={this.state.mobile}
            event={this.state.currentlyViewedEvent}
            events={events} />
          <History
            noScroll={this.state.mobile} // set to true for mobile
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
