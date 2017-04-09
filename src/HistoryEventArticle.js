import React, { Component } from 'react';

class HistoryEventArticle extends Component {
  static propTypes = {
    title: React.PropTypes.string,
    url: React.PropTypes.string.isRequired,
    // Optional
    description: React.PropTypes.string,
    site: React.PropTypes.string,
    image: React.PropTypes.shape({
      url: React.PropTypes.string.isRequired,
    }),
  }

  getLinkOrImageHeader() {
    if (this.props.site && this.props.image) {
      return <span className="site">{this.props.site}</span>;
    } else if (this.props.site && !this.props.image) {
      return <span className="site rel">{this.props.site}</span>;
    }
  }

  getImage() {
    if (this.props.image) {
      return <img
        className="hero"
        alt={this.props.title}
        src={this.props.image.url}
      />;
    }
  }

  getDescription() {
    if (this.props.description) {
      return <span className="desc">{this.props.description}</span>;
    }
  }

  render() {
    return (
      <div className="preview">
        <a href={this.props.url} target="_blank" rel="nofollow">
          {this.getLinkOrImageHeader()}
          {this.getImage()}
          <h3>{this.props.title}</h3>
          {this.getDescription()}
        </a>
      </div>
    );
  }
}

export default HistoryEventArticle;
