import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatAcc, calcDaysPassed } from '../../services/utils';
import Tabs from '../Tabs/Tabs';
import ProjectFinance from './ProjectFinance/ProjectFinance';
import ProjectFAQ from './ProjectFAQ/ProjectFAQ';
import ProjectChangelog from './ProjectChangelog/ProjectChangelog';
import { openProjectWithdrawModal, openProjectFundModal } from '../../actions/modalActions';

import './Project.scss';

const Project = ({
  data: {
    name, description, imageUrl, ethCollected, date,
    numSupporters, creator, aboutProject, finance, faqs, changelog, id, ethWithdraw, daiWithdraw, aboutCreator,
  },
  openProjectWithdrawModal, openProjectFundModal, funding, withdrawing,
}) => {
  const isOwner = false; // TODO change this

  return (
    <div className="project-wrapper">
      <div className="info-wrapper">
        <div className="heading-2 text-large-margin">{name}</div>

        <div className="heading-4 text-large-margin">{description}</div>
      </div>

      <div className="main-wrapper">
        <img src={imageUrl} alt="Project cover" className="cover-image" />

        <div className="creator-section">
          <div className="creator-data-wrapper">
            <img src="https://bit.ly/2NPKKEz" alt="Creator avatar" className="avatar-image" />

            <div className="creator-data">
              <div className="label">Created by</div>
              <div className="value text-bold">{ formatAcc(creator) }</div>
            </div>
          </div>

          <div className="creator-about">{aboutCreator}</div>
        </div>
      </div>

      <div className="action-wrapper">
        <div className="stats-wrapper">
          <div className="stat text-bold heading-4">{numSupporters} supporters</div>
          <div className="stat text-bold heading-4">{ethCollected} ETH collected</div>
          <div className="stat text-bold heading-4">{ calcDaysPassed(date) } days passed</div>
        </div>

        {
          !isOwner && (
            <button
              type="button"
              onClick={() => { openProjectFundModal(id); }}
              className="button  uppercase no-wrap"
              disabled={funding}
            >
              Support the project
            </button>
          )
        }

        {
          isOwner && (
            <button
              type="button"
              className="button uppercase no-wrap"
              disabled={withdrawing}
              onClick={() => { openProjectWithdrawModal(id, ethWithdraw, daiWithdraw); }}
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
              aboutProject.split(':').map((t, index) => ({ text: t, id: index })).map(t => (
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
  openProjectFundModal: PropTypes.func.isRequired,
  funding: PropTypes.bool.isRequired,
  withdrawing: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ project }) => ({
  data: project.data,
  funding: project.funding,
  withdrawing: project.withdrawing,
});

const mapDispatchToProps = {
  openProjectWithdrawModal,
  openProjectFundModal,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
