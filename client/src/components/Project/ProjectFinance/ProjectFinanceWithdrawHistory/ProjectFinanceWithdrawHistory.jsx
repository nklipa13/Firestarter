import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './ProjectFinanceWithdrawHistory.scss';

const ProjectFinanceWithdrawHistory = ({ data }) => (
  <div className="project-finance-withdraw-history-wrapper">
    <div className="main-label heading-4">Withdraw history</div>

    {
      data.map((d, index) => ({ ...d, id: index })).map(({
        id, date, daiAmount, ethAmount, purpose,
      }) => (
        <div className="item" key={id}>
          <div className="item-header-wrapper text-large-margin">
            <span className="text-bold">{date}</span>
            { ethAmount > 0 && <span className="text-bold">{ethAmount} ETH</span> }
            { daiAmount > 0 && <span className="text-bold">{daiAmount} DAI</span> }
          </div>

          <div className="label text-bold text-medium-margin">Withdrawal purpose:</div>

          <div className="purpose">{purpose}</div>
        </div>
      ))
    }
  </div>
);

ProjectFinanceWithdrawHistory.propTypes = {
  data: PropTypes.array.isRequired,
};

const mapStateToProps = () => ({});

export default connect(mapStateToProps)(ProjectFinanceWithdrawHistory);
