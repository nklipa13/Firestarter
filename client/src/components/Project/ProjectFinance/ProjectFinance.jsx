import React from 'react';
import PropTypes from 'prop-types';
import ProjectFinanceWithdrawHistory from './ProjectFinanceWithdrawHistory/ProjectFinanceWithdrawHistory';
import TooltipWrapper from '../../TooltipWrapper/TooltipWrapper';
import { formatNumber } from '../../../services/utils';

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

        <div className="col-item">
          <TooltipWrapper title={oneTimePaymentAmount}>{ formatNumber(oneTimePaymentAmount, 2) } ETH</TooltipWrapper>
        </div>
      </div>

      <div className="column-wrapper">
        <div className="label">Vested: (Earned / Locked):</div>
        <div className="col-item">
          <TooltipWrapper title={earnedInVesting}>{ formatNumber(earnedInVesting, 2) }</TooltipWrapper>
          /
          <TooltipWrapper title={lockedInVesting}>{ formatNumber(lockedInVesting, 2) } ETH</TooltipWrapper>
        </div>
      </div>

      <div className="column-wrapper">
        <div className="label">Compound: (Earned / Staked):</div>
        <div className="col-item">
          <TooltipWrapper title={earnedInCompund}>{ formatNumber(earnedInCompund, 2) }</TooltipWrapper>
          /
          <TooltipWrapper title={lockedInCompound}>{ formatNumber(lockedInCompound, 2) } DAI</TooltipWrapper>
        </div>
      </div>
    </div>

    <div className="total-wrapper">
      <div className="label">Totally earned:</div>
      <div className="value">
        <TooltipWrapper title={ethCollected}>{ formatNumber(ethCollected, 2) } ETH</TooltipWrapper>
      </div>
    </div>

    <ProjectFinanceWithdrawHistory projectId={projectId} />
  </div>
);

ProjectFinance.propTypes = {
  data: PropTypes.object.isRequired,
  projectId: PropTypes.number.isRequired,
};

export default ProjectFinance;
