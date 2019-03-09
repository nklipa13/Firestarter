import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatAcc } from '../../services/utils';
import Tabs from '../Tabs/Tabs';
import ProjectFinance from './ProjectFinance/ProjectFinance';
import ProjectFAQ from './ProjectFAQ/ProjectFAQ';
import ProjectChangelog from './ProjectChangelog/ProjectChangelog';
import { openProjectWithdrawModal } from '../../actions/modalActions';

import './Project.scss';

const Project = ({
  data: {
    name, description, cover, supporters, ethRaised, daysPassed, creator, about, finance, faqs, changelog, id,
  },
  openProjectWithdrawModal,
}) => {
  const isOwner = true;

  return (
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

        { !isOwner && (<button type="button" className="button uppercase no-wrap">Support the project</button>) }

        {
          isOwner && (
            <button
              type="button"
              className="button uppercase no-wrap"
              onClick={() => { openProjectWithdrawModal(id); }}
            >
              Withdraw
            </button>
          )
        }
      </div>

      <Tabs>
        <div label="About">
          <div className="about-wrapper">
            {
              about.split(':').map((t, index) => ({ text: t, id: index })).map(t => (
                <div className="row" key={t.id}>{t.text}</div>
              ))
            }
          </div>
        </div>

        <div label="Finance"><ProjectFinance data={finance} /></div>
        <div label="FAQ"><ProjectFAQ data={faqs} id={id} /></div>
        <div label="Changelog"><ProjectChangelog data={changelog} id={id} /></div>
      </Tabs>
    </div>
  );
};

Project.propTypes = {
  data: PropTypes.object.isRequired,
  openProjectWithdrawModal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ project }) => ({
  data: project.data,
});

const mapDispatchToProps = {
  openProjectWithdrawModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
