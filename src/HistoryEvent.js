import React, { Component } from 'react';

var links = require('../data/links.json')

import HistoryEventArticle from './HistoryEventArticle';

class HistoryEvent extends Component {
  static propTypes = {
    eventName: React.PropTypes.string.isRequired,
    fullName: React.PropTypes.string.isRequired,
    longHTML: React.PropTypes.string.isRequired,
  }

  render() {
    let eventName = this.props.eventName;
    return (
      <div className="history-event" key={this.props.eventName}>
        <h3>{this.props.fullName}</h3>
        {/*  Set to generated HTML string */}
        <p dangerouslySetInnerHTML={{__html: this.props.longHTML}}></p>
        {links[this.props.eventName].map(function(link, i){
          return <HistoryEventArticle
              key={eventName + '_article_' + i}
              title={link.title}
              url={link.url}
              description={link.description}
              site={link.site}
              image={link.image}
            />;
        })}
      </div>
    );
  }
}

export default HistoryEvent;
