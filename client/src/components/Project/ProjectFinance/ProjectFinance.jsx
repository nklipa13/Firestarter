import React from 'react';
import PropTypes from 'prop-types';

import './ProjectFinance.scss';

const ProjectFinance = ({
  data: {
    oneTimePayments, total, funded, compound,
  },
}) => (
  <div className="project-finance-wrapper">
    <div className="funds-wrapper">
      <div className="column-wrapper">
        <div className="label">One time payments:</div>

        {
          oneTimePayments.eth && (
            <div className="col-item">{`${oneTimePayments.eth} ETH / ${oneTimePayments.usd} USD`}</div>
          )
        }

        { oneTimePayments.dai && (<div className="col-item">{`${oneTimePayments.dai} DAI`}</div>) }
        { oneTimePayments.mln && (<div className="col-item">{`${oneTimePayments.dai} MLN`}</div>) }
      </div>

      {
        funded && (
          <div className="column-wrapper">
            <div className="label">Funded: (Earned / Locked):</div>
            <div className="col-item">{`${funded.earned} / ${funded.locked} ETH`}</div>
          </div>
        )
      }

      {
        compound && (
          <div className="column-wrapper">
            <div className="label">Compound: (Earned / Staked):</div>
            <div className="col-item">{`${compound.earned} / ${compound.locked} DAI`}</div>
          </div>
        )
      }
    </div>

    <div className="total-wrapper">
      <div className="label">Totally raised:</div>
      <div className="value">{total} ETH</div>
    </div>
  </div>
);

ProjectFinance.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ProjectFinance;
