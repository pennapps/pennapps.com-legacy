import React, { Component } from 'react';
import './Organizer.css';

class Organizer extends Component {
  static defaultProps = {
    image: "/default_person.png"
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    events: React.PropTypes.object,
    image: React.PropTypes.string,
    linkedin: React.PropTypes.string,
    facebook: React.PropTypes.string,
    twitter: React.PropTypes.string,
    github: React.PropTypes.string,
    website: React.PropTypes.string,
    showDesc: React.PropTypes.bool,
    currEvent: React.PropTypes.string
  }

  state = {
    // true on mobile
    showDesc: false,
    currEvent: this.props.event
  }

  componentWillReceiveProps(props) {
    this.setState({
       showDesc: props.showDesc,
       currEvent: props.event
     });
  }

  getLinkedIn() {
    if (this.props.linkedin) {
      return <a href={this.props.linkedin}><i className="fa fa-linkedin-square" aria-hidden="true"></i></a>;
    }
  }

  getFacebook() {
    if (this.props.facebook) {
      return <a href={this.props.facebook}><i className="fa fa-facebook-square" aria-hidden="true"></i></a>;
    }
  }

  getTwitter() {
    if (this.props.twitter) {
      return <a href={this.props.twitter}><i className="fa fa-twitter-square" aria-hidden="true"></i></a>;
    }
  }

  getGitHub() {
    if (this.props.github) {
      return <a href={this.props.github}><i className="fa fa-github" aria-hidden="true"></i></a>;
    }
  }

  getWebsite() {
    if (this.props.website) {
      return <a href={this.props.website}><i className="fa fa-home"></i></a>;
    }
  }

  shortDesc () {
    var positions = {};

    for (var key in this.props.events) {
      if (!this.props.events.hasOwnProperty(key)) { continue };
      var curPos = this.props.events[key];
      if (positions[curPos]) {
        positions[curPos].push(key);
      } else {
        positions[curPos] = [key];
      }
    }

    var desc = "";
    for (var pos in positions) {
      if (!positions.hasOwnProperty(pos)) { continue };
      var events = positions[pos];
      if (desc !== "") {
        desc += ", ";
      }
      desc += pos + " (";
      for (var i = 0; i < events.length; i++) {
        if (i > 0) { desc += ", "; }
        desc += events[i];
      }
      desc += ")";
    }

    if (this.state.showDesc) {
      return <span className="desc">{desc}</span>;
    } else {
      return <span className="desc">{this.props.events[this.state.currEvent]}</span>;
    }
  }

  render() {
    return (
      <div className={'organizer'}>
        <img src={this.props.image} alt={this.props.name} />
        <span className="name">{this.props.name}</span>
        <br />
        {this.getWebsite()}
        {this.getFacebook()}
        {this.getTwitter()}
        {this.getLinkedIn()}
        {this.getGitHub()}
        <br />
        {this.shortDesc()}
      </div>
    );
  }
}

export default Organizer;
