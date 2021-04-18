import React, { Component } from "react";
import { Button, FormGroup, FormControl } from "react-bootstrap";
import { connect } from "react-redux";
import { signup, login } from "../actions/account";
import fetchStates from "../reducers/fetchStates";

class AuthForm extends Component {
  state = {
    username: "",
    password: "",
    buttonClicked: false,
  };

  updateUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  updatePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  signup = () => {
    this.setState({ buttonClicked: true });
    const { username, password } = this.state;
    this.props.signup({ username, password });
  };
  login = () => {
    this.setState({ buttonClicked: true });
    const { username, password } = this.state;
    this.props.login({ username, password });
  };

  // javascript computed property: returns the data type of whatever its returned data is
  get Error() {
    if (
      this.props.account.status === fetchStates.error &&
      this.state.buttonClicked
    ) {
      return <div>{this.props.account.message}</div>;
    }
  }

  render() {
    return (
      <div>
        <h2>Dragon Stack</h2>
        <form>
          <FormGroup>
            <FormControl
              type="text"
              value={this.state.username}
              placeholder="username"
              onChange={this.updateUsername}
            />
            <FormControl
              type="password"
              value={this.state.password}
              placeholder="password"
              onChange={this.updatePassword}
            />
            <div>
              <Button type="button" onClick={this.login}>
                Log In
              </Button>
              <span> or </span>
              <Button type="button" onClick={this.signup}>
                Sign Up
              </Button>
            </div>
          </FormGroup>
          <br />
          {this.Error}
        </form>
      </div>
    );
  }
}

export default connect(({ account }) => ({ account }), { signup, login })(
  AuthForm
);
