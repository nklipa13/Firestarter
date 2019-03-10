import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { formatAcc, calcDaysPassed } from '../../services/utils';
import Tabs from '../Tabs/Tabs';
import ProjectFinance from './ProjectFinance/ProjectFinance';
import ProjectFAQ from './ProjectFAQ/ProjectFAQ';
import ProjectChangelog from './ProjectChangelog/ProjectChangelog';
import ProjectProposals from './ProjectProposals/ProjectProposals';
import { openProjectWithdrawModal, openProjectFundModal } from '../../actions/modalActions';
import { cancelFunding } from '../../actions/projectActions';

import './Project.scss';

const Project = ({
  data, account, hasFunding,
  data: {
    name, description, imageUrl, ethCollected, date,
    numSupporters, creator, aboutProject, faq, projectId, aboutCreator, logs,
  },
  openProjectWithdrawModal, openProjectFundModal, funding, withdrawing, cancelFunding,
}) => {
  const isOwner = account === creator;

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
            <img src={`https:\/\/eth.vanity.show\/${creator}`} alt="Creator avatar" className="avatar-image" /> {/* eslint-disable-line */ }

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
          <div className="stat text-bold heading-4">{ethCollected} ETH earned</div>
          <div className="stat text-bold heading-4">{ calcDaysPassed(date) } days passed</div>
        </div>

        {
          !isOwner && !hasFunding && (
            <button
              type="button"
              onClick={() => { openProjectFundModal(projectId); }}
              className="button  uppercase no-wrap"
              disabled={funding || !account}
            >
              Support the project
            </button>
          )
        }

        {
          !isOwner && hasFunding && (
            <button
              type="button"
              onClick={() => { cancelFunding(projectId, account); }}
              className="button  uppercase no-wrap"
              disabled={funding || !account}
            >
              Cancel funding
            </button>
          )
        }

        {
          isOwner && (
            <button
              type="button"
              className="button uppercase no-wrap"
              disabled={withdrawing}
              onClick={() => { openProjectWithdrawModal(projectId); }}
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

        <div label="Finance"><ProjectFinance projectId={projectId} data={data} /></div>
        <div label="FAQ"><ProjectFAQ isOwner={isOwner} data={faq} projectId={projectId} /></div>
        <div label="Changelog"><ProjectChangelog isOwner={isOwner} data={logs} projectId={projectId} /></div>
        <div label="Proposals"><ProjectProposals isOwner={isOwner} projectId={projectId} /></div>
      </Tabs>
    </div>
  );
};

Project.propTypes = {
  data: PropTypes.object.isRequired,
  openProjectWithdrawModal: PropTypes.func.isRequired,
  openProjectFundModal: PropTypes.func.isRequired,
  cancelFunding: PropTypes.func.isRequired,
  funding: PropTypes.bool.isRequired,
  withdrawing: PropTypes.bool.isRequired,
  account: PropTypes.string.isRequired,
  hasFunding: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ project, account }) => ({
  data: project.data,
  funding: project.funding,
  withdrawing: project.withdrawing,
  account: account.account,
  hasFunding: account.hasFunding,
});

const mapDispatchToProps = {
  openProjectWithdrawModal,
  openProjectFundModal,
  cancelFunding,
};

export default connect(mapStateToProps, mapDispatchToProps)(Project);
