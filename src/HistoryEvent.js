import React, { Component } from 'react';
import VisibilitySensor from 'react-visibility-sensor'
import HistoryEventArticle from './HistoryEventArticle';
import links from '../data/links.json';
import { Element } from 'react-scroll';

const PARTIAL_VIEW_RATIO = 3;

class HistoryEvent extends Component {
  static propTypes = {
    eventName: React.PropTypes.string.isRequired,
    fullName: React.PropTypes.string.isRequired,
    longHTML: React.PropTypes.string.isRequired,
    visibilityChangeCallback: React.PropTypes.func.isRequired,
  }

  onVisibilityChange(value) {
    this.props.visibilityChangeCallback({
      [this.props.eventName]: value
    });
  }

  render() {
    return (
      <VisibilitySensor
        onChange={this.onVisibilityChange.bind(this)}
        partialVisibility={true}
        scrollCheck={true}
        delayedCall={true}
        offset={{top: window.innerHeight / PARTIAL_VIEW_RATIO}}>

        <div className="history-event" key={this.props.eventName}>
          <Element name={this.props.eventName + "-header"}>
            <h3>{this.props.fullName}</h3>
          </Element>
          {/*  Set to generated HTML string */}
          <p dangerouslySetInnerHTML={{__html: this.props.longHTML}}></p>
          {links[this.props.eventName].map((link, i) => {
            return <HistoryEventArticle
              key={this.props.eventName + '_article_' + i}
              {...link}
              />;
          })}
        </div>
      </VisibilitySensor>
    );
  }
}

export default HistoryEvent;
