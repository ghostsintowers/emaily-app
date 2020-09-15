import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  renderContent() {
    switch (this.props.auth) {
      case null:
        return;

      case false:
        return (
          <li>
            <a href='/auth/google'>Login With Google</a>
          </li>
        );
      default:
        return <li>Logged In</li>;
    }
  }

  render() {
    console.log(this.props);
    return (
      <nav>
        <div className='nav-wrapper'>
          <a href='/' className='left brand-logo'>
            Emaily
          </a>
          <ul className='right'>
            <li>
              <a>{this.renderContent()}</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

function mapStateToProps({ auth }) {
  return { auth: auth };
}

export default connect(mapStateToProps)(Header);
