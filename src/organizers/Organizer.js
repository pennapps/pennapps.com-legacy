import React, { Component } from 'react';
import './Organizer.css';

let DEFAULT_PHOTO_PATH = '';

class Organizer extends Component {
  static defaultProps = {
    photo: DEFAULT_PHOTO_PATH
  }

  static propTypes = {
    name: React.PropTypes.string.isRequired,
    photo: React.PropTypes.string,
    linkedin: React.PropTypes.string,
    facebook: React.PropTypes.string,
    twitter: React.PropTypes.string,
    github: React.PropTypes.string,
  }

  constructor(props) {

  }

  render() {
    return (
      <div className={'organizer'}>

      </div>
    );
  }
}
