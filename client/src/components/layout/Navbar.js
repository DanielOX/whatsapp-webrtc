import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from 'react-redux'



class Navbar extends Component {


  renderNavbarStates = () => {
    if (this.props.auth.isAuthenticated) {
      const { user } = this.props.auth
      return (<React.Fragment>
        <li>
          <Link to="/profile" className="black-text">
            Welcome, <b> {user.name.split(' ')[0]}</b>
          </Link>
        </li>
      </React.Fragment>
      )
    } else {
      return (
        <React.Fragment>
          <li><Link className="black-text" to="/login">
            Login
          </Link>
          </li>
          <li><Link className="black-text" to="/register">
            Register
          </Link>
          </li>

        </React.Fragment>
      )
    }

  }

  render() {
    return (
      <div className="navbar-fixed z-depth-3">
        <nav>
          <div className="nav-wrapper white">
            <a href="#" class="brand-logo black-text"> <i className="material-icons">message</i> chatty </a>
            <ul id="nav-mobile" class="right hide-on-med-and-down">
              {this.renderNavbarStates()}
            </ul>
          </div>
        </nav>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps)(Navbar);
