import React from 'react';
import { Link, NavLink } from 'react-router-dom';

import './Header.scss';
import Logo from '../../images/Logo.svg';

const Header = () => (
  <div className="header-wrapper">
    <div className="width-container">
      <Link className="logo-wrapper" to="/">
        <img src={Logo} alt="logo" />
      </Link>

      <div className="links-wrapper">
        <NavLink activeClassName="never-active" to="/">Explore</NavLink>
        <NavLink activeClassName="active" to="/start-project">Start a project</NavLink>
      </div>
    </div>
  </div>
);

Header.propTypes = {};

export default Header;
