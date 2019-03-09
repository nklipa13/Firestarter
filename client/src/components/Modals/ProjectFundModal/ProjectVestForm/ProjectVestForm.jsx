import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import projectAddQuestionFormValidator from './projectVestFormValidator';
import InputComponent from '../../../Forms/InputComponent';
import { fundProject } from '../../../../actions/projectActions';

const ProjectVestForm = ({
  handleSubmit, pristine, invalid, submittingForm, submittingError, closeModal, onSubmit, projectId,
}) => (
  <form onSubmit={handleSubmit((e) => { onSubmit(e, projectId, closeModal, 'vest'); })} className="form-wrapper">
    <Field
      focus
      type="number"
      additional={{ min: 0 }}
      id="ethAmount"
      name="ethAmount"
      labelText="ETH amount"
      placeholder="ETH amount"
      component={InputComponent}
      showErrorText
    />

    <Field
      type="number"
      additional={{ min: 0 }}
      id="weeks"
      name="weeks"
      labelText="Number of weeks"
      placeholder="Number of weeks"
      component={InputComponent}
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

ProjectVestForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  submittingError: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ProjectVestFormComp = reduxForm({
  form: 'projectVestForm',
  validate: projectAddQuestionFormValidator,
})(ProjectVestForm);

const mapStateToProps = ({ project }) => ({
  submittingForm: project.funding,
  submittingError: project.fundingError,
});

const mapDispatchToProps = {
  onSubmit: fundProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectVestFormComp);
