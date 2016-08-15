import React from 'react';

class View extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};

    // register for model dispatch
    this.props.model.register(
      this.handleModelEvents.bind(this)
    );
  }

  handleModelEvents(payload) {

  }


  componentDidMount() {
    this.props.model.viewDidLoad
      .call(this.props.model);
  }
}

export default View
