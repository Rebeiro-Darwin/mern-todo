import React, { Component } from "react";
import { connect } from "react-redux";
import { NavLink } from "reactstrap";
import { logout } from "../actions/authAction";
import PropTypes from "prop-types";

class Logout extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired
  };
  render() {
    return (
      <div>
        <React.Fragment>
          <NavLink onClick={this.props.logout} href="#">
            Logout
          </NavLink>
        </React.Fragment>
      </div>
    );
  }
}
export default connect(
  null,
  { logout }
)(Logout);
