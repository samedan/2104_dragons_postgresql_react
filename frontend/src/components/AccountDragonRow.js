import React, { Component } from "react";
import { Button } from "react-bootstrap";
import DragonAvatar from "./DragonAvatar";

class AccountDragonRow extends Component {
  state = {
    nickname: this.props.dragon.nickname,
    edit: false,
  };

  updateNickname = (event) => {
    this.setState({ nickname: event.target.value });
  };

  toggleEdit = () => {
    this.setState({ edit: !this.state.edit });
  };

  get SaveButton() {
    return <Button>Save</Button>;
  }
  get EditButton() {
    return <Button onClick={this.toggleEdit}>Edit</Button>;
  }

  render() {
    return (
      <div>
        <input
          onChange={this.updateNickname}
          type="text"
          value={this.state.nickname}
          disabled={!this.state.edit}
        />
        <br />

        <DragonAvatar dragon={this.props.dragon} />
        {this.state.edit ? this.SaveButton : this.EditButton}
      </div>
    );
  }
}

export default AccountDragonRow;
