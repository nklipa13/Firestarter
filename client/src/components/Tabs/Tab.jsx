import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Tab extends Component {
  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    const { label, handleClick } = this.props;
    handleClick(label);
  }

  render() {
    const { handleClick, props: { activeTab, label } } = this;

    let className = 'tab-list-item';

    if (activeTab === label) {
      className += ' tab-list-item-active';
    }

    return (
      <li className={className} onClick={handleClick}>
        <div className="text">{label}</div>
      </li>
    );
  }
}

Tab.propTypes = {
  activeTab: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
};

export default Tab;
