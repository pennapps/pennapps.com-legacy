import React, { Component } from 'react';
import TimelineEvent from './TimelineEvent'
import events from '../data/events.json';

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
                    {Object.keys(events).reverse().map((eventName, i) => {
                        let event = events[eventName];
                        return (
                          <TimelineEvent
                            key={eventName}
                            eventName={eventName}
                            date={event.full}
                            num={event.roman}
                            description={event.short}
                          />);
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
