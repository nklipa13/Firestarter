import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProjectWithdrawHistory } from '../../../../actions/projectActions';
import Loader from '../../../Loader/Loader';

import './ProjectFinanceWithdrawHistory.scss';

const ProjectFinanceWithdrawHistory = ({
  data, getProjectWithdrawHistory, projectId, getting, gettingError,
}) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!mounted) {
      getProjectWithdrawHistory(projectId);
      setMounted(true);
    }
  });

  return (
    <div className="project-finance-withdraw-history-wrapper">
      <div className="main-label heading-4">Withdraw history</div>

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
                  <div>There were no withdraws for this project</div>
                </div>
              )
            }

            {
              data.length > 0 && data.map((d, index) => ({ ...d, id: index })).map(({
                id, date, daiAmount, ethAmount, purpose,
              }) => (
                <div className="item" key={id}>
                  <div className="item-header-wrapper text-large-margin">
                    <span>{date}</span>
                    { ethAmount > 0 && <span>{ethAmount} ETH</span> }
                    { daiAmount > 0 && <span>{daiAmount} DAI</span> }
                  </div>

                  <div className="label text-medium-margin">Withdrawal purpose:</div>

                  <div className="purpose">{purpose}</div>
                </div>
              ))
            }
          </React.Fragment>
        )
      }
    </div>
  );
};

ProjectFinanceWithdrawHistory.propTypes = {
  data: PropTypes.array.isRequired,
  getProjectWithdrawHistory: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  getting: PropTypes.bool.isRequired,
  gettingError: PropTypes.string.isRequired,
};

const mapStateToProps = ({ project }) => ({
  getting: project.gettingProjectWithdrawHistory,
  gettingError: project.gettingProjectWithdrawHistoryError,
  data: project.projectWithdrawHistory,
});

const mapDispatchToProps = { getProjectWithdrawHistory };

export default connect(mapStateToProps, mapDispatchToProps)(ProjectFinanceWithdrawHistory);
