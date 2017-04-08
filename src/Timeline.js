import React, { Component } from 'react';
import TimelineEvent from './TimelineEvent'

var events = require('../data/events.json')

class Timeline extends Component {
  render() {
    return (
      <div className="timeline-wrapper">
        <div className="content-row">
          <div className="scroll-hide">
            <div className="scrollable">
              <table className="content-list">
                <tbody>
                  <tr>
                    {Object.keys(events).map(function(eventName, i){
                        let event = events[eventName];
                        return <TimelineEvent
                          key={eventName}
                          date={event.full}
                          num={event.roman}
                          description={event.short}
                        />;
                    })}
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Timeline;
