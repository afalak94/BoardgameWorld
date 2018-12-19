//FAQ component
import React, { Component } from 'react';

class FAQ extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render() {
    return (
      <div className='faq'>
        <h2>FAQ screen</h2>
      </div>
    );
  }
}

export default FAQ;
