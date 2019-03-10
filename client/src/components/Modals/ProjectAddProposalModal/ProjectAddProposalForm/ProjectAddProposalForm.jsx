import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import projectAddProposalFormValidator from './projectAddProposalFormValidator';
import InputComponent from '../../../Forms/InputComponent';
import TextAreaComponent from '../../../Forms/TextAreaComponent';
import { projectAddProposal } from '../../../../actions/projectActions';

const ProjectAddProposalForm = ({
  handleSubmit, pristine, invalid, submittingForm, submittingError, closeModal, onSubmit, projectId,
}) => (
  <form
    onSubmit={handleSubmit((e) => { onSubmit(e, projectId, closeModal); })}
    className="form-wrapper"
    noValidate
  >
    <Field
      focus
      id="add-proposal-name"
      name="featureName"
      labelText="Feature name"
      placeholder="Feature name"
      component={InputComponent}
      showErrorText
    />

    <Field
      type="number"
      additional={{ min: 0 }}
      id="ethAmount"
      name="ethAmount"
      labelText="Amount of ETH needed"
      placeholder="ETH amount"
      component={InputComponent}
      showErrorText
    />

    <Field
      type="number"
      additional={{ min: 0 }}
      id="daiAmount"
      name="daiAmount"
      labelText="Amount of DAI needed"
      placeholder="DAI amount"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="change-description"
      name="featureDescription"
      labelText="Feature description"
      placeholder="Feature description"
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

ProjectAddProposalForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  submittingError: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ProjectAddProposalFormComp = reduxForm({
  form: 'projectAddProposalForm',
  validate: projectAddProposalFormValidator,
})(ProjectAddProposalForm);

const mapStateToProps = ({ project }) => ({
  submittingForm: project.addingProposal,
  submittingError: project.addingProposalError,
});

const mapDispatchToProps = {
  onSubmit: projectAddProposal,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAddProposalFormComp);
