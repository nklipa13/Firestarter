import React from 'react';
import { Link } from 'react-router-dom';

import './HomePage.scss';

const HomePage = () => (
  <div className="home width-container flex">
    <h1 className="heading-2 text-large-margin">
      Support projects on Ethereum
      <br />
      and watch them grow
    </h1>
    <h2 className="heading-4 text-large-margin">
      Firestarter introduces various projects built on Ethereum and helps
      developers
      <br />
      getting their projects funded by community.
    </h2>

    <div className="projects">
      <Link to="/project/0" className="project">
        <h3>Community-driven Dapps on Ethereum Blockchain</h3>
        <img src="https://bit.ly/2SUf41r" alt="Community-driven Dapps on Ethereum Blockchain"/>
        <h4>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          nulla ante, pretium vel neque. Praesent nulla ante, pretium vel neque.
          Praesent nulla asda.
        </h4>
      </Link>

      <Link to="/project/0" className="project">
        <h3>Community-driven Dapps on Ethereum Blockchain</h3>
        <img src="https://bit.ly/2SUf41r" alt="Community-driven Dapps on Ethereum Blockchain"/>
        <h4>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
          nulla ante, pretium vel neque. Praesent nulla ante, pretium vel neque.
          Praesent nulla asda.
        </h4>
      </Link>
    </div>

    <div className="cta">
      <h2 className="heading-3 text-large-margin">Are you building a community-driven dapp?</h2>
      <h3 className="heading-4 text-large-margin">Start your project with Firestrater and fund your project easily.</h3>
      <Link to="/start-project" className="button  uppercase no-wrap">Start a project</Link>
    </div>

  </div>
);

HomePage.propTypes = {};

export default HomePage;
