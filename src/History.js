import React, { Component } from 'react';

var events = require('../data/events.json')

import HistoryEvent from './HistoryEvent'

class History extends Component {
  render() {
    return (
      <div className="history">
        <h2>History</h2>
        {Object.keys(events).map(function(eventName, i){
          return (
            <HistoryEvent
              key={eventName}
              eventName={eventName}
              fullName={events[eventName].full}
              longHTML={events[eventName].longHTML}
            />
          );
        })}
      </div>
    );
  }
}

export default History;
