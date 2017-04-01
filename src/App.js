import React, { Component } from 'react';
import logo from './logo.png';
import './App.css';

var events = require('../data/events.json')
var links = require('../data/links.json')

class App extends Component {
  render() {
    return (
      <div className="landing">
        <div className="splash">
          <div className="timeline-wrapper">
            <div className="content-row">
              <div className="scroll-hide">
                <div className="scrollable">
                  <table className="content-list">
                    <tr>
                      {Object.keys(events).map(function(eventName, i){
                          var event = events[eventName];
                          return (
                            <td key={eventName}>
                              <div className="timeline-bubble"></div>
                              <div className="date">{event.full}</div>
                              <div className="event-wrapper"><span className="event">PENNAPPS</span><span className="eventnum"> {event.roman}</span><span className="description">{event.short}</span></div>
                            </td>);
                      })}
                    </tr>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <img src={logo} alt="logo" className="logo"></img>
          <div className="head-text">
            <h1>PennApps</h1>
            <h2>Fall 2017</h2>
            <a><div className="button">Enter Site</div></a>
          </div>
        </div>
        <div className="history">
          <h2>History</h2>
          {Object.keys(events).map(function(eventName, i){
            var event = events[eventName];
            return (
              <div className="history-event" key={eventName}>
                <h3>{event.full}</h3>
                <p dangerouslySetInnerHTML={{__html: event.longHTML}}></p>
                {links[eventName].map(function(link, i){
                  return (
                    <div className="preview" key={eventName + "_article_" + i}>
                      <a href={link.url} target="_blank">
                        {(() => {
                          if (link.site && link.image) {
                            return <span className="site">{link.site}</span>;
                          } else if (link.site && !link.image) {
                            return <span className="site rel">{link.site}</span>;
                          }
                        })()}
                        {(() => {
                          if (link.image) {
                            return <img className="hero" alt={link.title} src={link.image.url} />;
                          }
                        })()}
                        <h3>{link.title}</h3>
                        {(() => {
                          if (link.description) {
                            return <span className="desc">{link.description}</span>;
                          }
                        })()}
                      </a>
                    </div>);
                })}
              </div> );
          })}
        </div>
      </div>
    );
  }
}

export default App;
