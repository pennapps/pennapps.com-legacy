import React, { Component } from 'react';
import HistoryEventArticle from './HistoryEventArticle';
import links from '../data/links.json';
import { Element } from 'react-scroll';
import Waypoint from 'react-waypoint';

const PARTIAL_VIEW_RATIO = 6;
const TIMELINE_SIZE = 200;

class HistoryEvent extends Component {
  static propTypes = {
    eventName: React.PropTypes.string.isRequired,
    fullName: React.PropTypes.string.isRequired,
    longHTML: React.PropTypes.string.isRequired,
    visibilityChangeCallback: React.PropTypes.func.isRequired,
    link: React.PropTypes.string.isRequired
  }

  onViewActionCallback(action) {
    this.props.visibilityChangeCallback({
      [this.props.eventName]: action
    });
  }


  render() {
    return (
      <Waypoint
        onEnter={this.onViewActionCallback.bind(this, true)}
        onLeave={this.onViewActionCallback.bind(this, false)}
        bottomOffset={TIMELINE_SIZE + window.innerHeight / PARTIAL_VIEW_RATIO}>
        <div className="history-event-wrapper">
          <Element name={this.props.eventName + "-header"}>
            <div className="history-event" key={this.props.eventName}>
              <a href={this.props.link}><h3>{this.props.fullName}</h3></a>
              {/*  Set to generated HTML string */}
              <p dangerouslySetInnerHTML={{__html: this.props.longHTML}}></p>
              {links[this.props.eventName].map((link, i) => {
                return <HistoryEventArticle
                  key={this.props.eventName + '_article_' + i}
                  {...link}
                  />;
              })}
            </div>
          </Element>
        </div>
      </Waypoint>
    );
  }
}

export default HistoryEvent;
