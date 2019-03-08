import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatAcc } from '../../services/utils';
import Tabs from '../Tabs/Tabs';

import './Project.scss';

const Project = ({
  data: {
    name, description, cover, supporters, ethRaised, daysPassed, creator,
  },
}) => (
  <div className="project-wrapper">
    <div className="info-wrapper">
      <div className="heading-2 text-large-margin">{name}</div>

      <div className="heading-4 text-large-margin">{description}</div>
    </div>

    <div className="main-wrapper">
      <img src={cover} alt="Project cover" className="cover-image" />

      <div className="creator-section">
        <div className="creator-data-wrapper">
          <img src={creator.avatar} alt="Creator avatar" className="avatar-image" />

          <div className="creator-data">
            <div className="label">Created by</div>
            <div className="value text-bold">{ formatAcc(creator.address) }</div>
          </div>
        </div>

        <div className="creator-about">{creator.about}</div>
      </div>
    </div>

    <div className="action-wrapper">
      <div className="stats-wrapper">
        <div className="stat text-bold heading-4">{supporters} supporters</div>
        <div className="stat text-bold heading-4">{ethRaised} ETH raised</div>
        <div className="stat text-bold heading-4">{daysPassed} days passed</div>
      </div>

      <button type="button" className="button uppercase no-wrap">Support the project</button>
    </div>

    <Tabs>
      <div label="About">
        About
        {/* <ProjectAbout /> */}
      </div>

      <div label="Finance">
        Finance
        {/* <ProjectFinance /> */}
      </div>

      <div label="FAQ">
        FAQ
        {/* <ProjectFAQ /> */}
      </div>

      <div label="Changelog">
        Changelog
        {/* <ProjectChangelog /> */}
      </div>
    </Tabs>
  </div>
);

Project.propTypes = {
  data: PropTypes.object.isRequired,
};

const mapStateToProps = ({ project }) => ({
  data: project.data,
});

export default connect(mapStateToProps)(Project);
