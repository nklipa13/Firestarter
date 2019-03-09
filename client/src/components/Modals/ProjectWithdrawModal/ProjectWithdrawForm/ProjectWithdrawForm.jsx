import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import projectWithdrawFormValidator from './projectWithdrawFormValidator';
import InputComponent from '../../../Forms/InputComponent';
import TextAreaComponent from '../../../Forms/TextAreaComponent';
import { projectWithdraw } from '../../../../actions/projectActions';
import { notGraterThan } from '../../../../services/utils';

const ProjectWithdrawForm = ({
  handleSubmit, pristine, invalid, submittingForm, submittingError, closeModal, onSubmit, projectId,
  maxEth, maxDai,
}) => (
  <form onSubmit={handleSubmit((e) => { onSubmit(e, projectId, closeModal); })} className="form-wrapper">
    <Field
      focus
      type="number"
      normalize={val => notGraterThan(val, maxEth)}
      additional={{ min: 0, max: maxEth }}
      id="ethAmount"
      name="ethAmount"
      labelText={`Withdraw ETH - ${maxEth} ETH available`}
      placeholder="ETH amount"
      component={InputComponent}
      showErrorText
    />

    <Field
      type="number"
      normalize={val => notGraterThan(val, maxDai)}
      additional={{ min: 0, max: maxDai }}
      id="daiAmount"
      name="daiAmount"
      labelText={`Withdraw DAI - ${maxDai} DAI available`}
      placeholder="ETH amount"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="purpose"
      name="purpose"
      labelText="Purpose of withdrawal"
      placeholder="Purpose of withdrawal"
      component={TextAreaComponent}
      showErrorText
    />

    { !submittingForm && submittingError && <div className="submit-error-wrapper">{submittingError}</div> }

    <div className="buttons-wrapper">
      <button
        type="submit"
        className="button uppercase"
        disabled={submittingForm || pristine || invalid}
      >
        { submittingForm ? 'Submitting' : 'Submit' }
      </button>
    </div>
  </form>
);

ProjectWithdrawForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  submittingError: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  maxEth: PropTypes.number.isRequired,
  maxDai: PropTypes.number.isRequired,
};

const ProjectWithdrawFormComp = reduxForm({
  form: 'projectWithdrawForm',
  validate: projectWithdrawFormValidator,
})(ProjectWithdrawForm);

const mapStateToProps = ({ project }) => ({
  submittingForm: project.withdrawing,
  submittingError: project.withdrawingError,
});

const mapDispatchToProps = {
  onSubmit: projectWithdraw,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectWithdrawFormComp);
