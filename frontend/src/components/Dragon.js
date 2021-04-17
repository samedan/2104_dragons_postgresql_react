import React, { Component } from "react";
import { connect } from "react-redux";
import DragonAvatar from "./DragonAvatar";
import { Button } from "react-bootstrap";
import { fetchDragon } from "../actions/dragon";

class Dragon extends Component {
  render() {
    return (
      <div>
        <Button
          type="button"
          className="btn btn-primary"
          onClick={this.props.fetchDragon}
        >
          New Dragon
        </Button>
        <DragonAvatar dragon={this.props.dragon} />
      </div>
    );
  }
}

export default connect(
  // mapStateToProps
  ({ dragon }) => {
    return { dragon };
  },
  //mapDispatchToProps
  { fetchDragon }
)(Dragon);
