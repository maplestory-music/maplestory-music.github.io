import React from 'react';

class LinkComponent extends React.Component {
  render() {
    return (
      <a href={'https://youtu.be/' + this.props.youtube} target='_blank' rel='noopener noreferrer'>{this.props.title}</a>
    );
  }
}

export default LinkComponent;
