import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { openProjectAddProposalModal } from '../../../actions/modalActions';
import { getProjectProposals, supportProposal, declineProposal } from '../../../actions/projectActions';
import Loader from '../../Loader/Loader';

import './ProjectProposals.scss';

const ProjectProposals = ({
  isOwner, projectId, addingProposal, openProjectAddProposalModal, getProjectProposals,
  getting, gettingError, data, supporting, supportProposal, declining, declineProposal,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      getProjectProposals(projectId);
      setMounted(true);
    }
  });

  return (
    <div className="project-proposals-wrapper">
      {
        isOwner && (
          <button
            className="button uppercase text-large-margin"
            type="button"
            disabled={addingProposal}
            onClick={() => { openProjectAddProposalModal(projectId); }}
          >
            Make a proposal
          </button>
        )
      }

      {
        getting && (
          <div className="container">
            <div className="loading-wrapper">
              <Loader />
            </div>
          </div>
        )
      }

      {
        !getting && gettingError && (
          <div className="modal-error"><div className="error-content">{gettingError}</div></div>
        )
      }

      {
        !getting && !gettingError && (
          <React.Fragment>
            {
              data.length === 0 && (
                <div className="no-items-wrapper">
                  <div>There are no proposals for this project</div>
                </div>
              )
            }

            {
              data.length > 0 && data.map(({
                daiAmount, description, ethAmount, proposalId, title, voted = false,
              }, index) => (
                <div className="item" key={proposalId}>
                  <div className="title text-medium-margin">{title}</div>

                  <div className="description text-large-margin">{description}</div>

                  <div className="action-wrapper">
                    <div className="stats">
                      <span>Amount needed for feature</span>
                      { ethAmount > 0 && <span className="stat">{ethAmount} ETH</span> }
                      { daiAmount > 0 && <span className="stat">{daiAmount} DAI</span> }
                    </div>

                    {
                      !isOwner && (
                        <div className="voting-wrapper">
                          <button
                            className="button uppercase"
                            type="button"
                            disabled={supporting || declining || voted}
                            onClick={() => { supportProposal(projectId, proposalId, index); }}
                          >
                            { supporting ? 'Supporting' : 'Support' }
                          </button>

                          <button
                            className="button uppercase"
                            type="button"
                            onClick={() => { declineProposal(projectId, proposalId, index); }}
                            disabled={supporting || declining || voted}
                          >
                            { declining ? 'Declining' : 'Decline' }
                          </button>
                        </div>
                      )
                    }
                  </div>
                </div>
              ))
            }
          </React.Fragment>
        )
      }
    </div>
  );
};

ProjectProposals.propTypes = {
  projectId: PropTypes.number.isRequired,
  isOwner: PropTypes.bool.isRequired,
  addingProposal: PropTypes.bool.isRequired,
  openProjectAddProposalModal: PropTypes.func.isRequired,
  getProjectProposals: PropTypes.func.isRequired,
  getting: PropTypes.bool.isRequired,
  gettingError: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  supporting: PropTypes.bool.isRequired,
  declining: PropTypes.bool.isRequired,
  supportProposal: PropTypes.func.isRequired,
  declineProposal: PropTypes.func.isRequired,
};

const mapStateToProps = ({ project }) => ({
  addingProposal: project.addingProposal,
  data: project.proposals,
  getting: project.gettingProposals,
  gettingError: project.gettingProposalsError,
  supporting: project.supportingProposal,
  declining: project.decliningProposal,
});

const mapDispatchToProps = {
  openProjectAddProposalModal, getProjectProposals, supportProposal, declineProposal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectProposals);
