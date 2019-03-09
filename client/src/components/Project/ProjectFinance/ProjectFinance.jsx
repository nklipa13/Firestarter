import React from 'react';
import PropTypes from 'prop-types';
import ProjectFinanceWithdrawHistory from './ProjectFinanceWithdrawHistory/ProjectFinanceWithdrawHistory';

import './ProjectFinance.scss';

const ProjectFinance = ({
  data: {
    lockedInVesting, earnedInVesting, earnedInCompund, lockedInCompound, oneTimePaymentAmount, ethCollected,
  }, projectId,
}) => (
  <div className="project-finance-wrapper">
    <div className="funds-wrapper">
      <div className="column-wrapper">
        <div className="label">One time payments:</div>

        <div className="col-item">{`${oneTimePaymentAmount} ETH`}</div>
      </div>

      <div className="column-wrapper">
        <div className="label">Vested: (Earned / Locked):</div>
        <div className="col-item">{`${earnedInVesting} / ${lockedInVesting} ETH`}</div>
      </div>

      <div className="column-wrapper">
        <div className="label">Compound: (Earned / Staked):</div>
        <div className="col-item">{`${earnedInCompund} / ${lockedInCompound} DAI`}</div>
      </div>
    </div>

    <div className="total-wrapper">
      <div className="label">Totally collected:</div>
      <div className="value">{ethCollected} ETH</div>
    </div>

    <ProjectFinanceWithdrawHistory projectId={projectId} />
  </div>
);

ProjectFinance.propTypes = {
  data: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
};

export default ProjectFinance;
