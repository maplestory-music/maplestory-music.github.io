import React from 'react';

class MarkComponent extends React.Component {
  render() {
    let path = 'mark/' + this.props.value + '.png';
    return (
      <span>
        <img
          src={path}
          alt='icon'
        />
      </span>
    )
  }
}

export default MarkComponent;
