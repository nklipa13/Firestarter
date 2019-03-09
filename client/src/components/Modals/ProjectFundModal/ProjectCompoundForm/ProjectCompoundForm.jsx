import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import projectCompoundFormValidator from './projectCompoundFormValidator';
import InputComponent from '../../../Forms/InputComponent';
import { fundProject } from '../../../../actions/projectActions';

const ProjectCompoundForm = ({
  handleSubmit, pristine, invalid, submittingForm, submittingError, closeModal, onSubmit, projectId,
}) => (
  <form
    onSubmit={handleSubmit((e) => { onSubmit(e, projectId, closeModal, 'compound'); })}
    className="form-wrapper"
    noValidate
  >
    <Field
      focus
      type="number"
      additional={{ min: 0 }}
      id="dai-amount"
      name="daiAmount"
      labelText="DAI amount"
      secondLabelText="You will send two transactions. First one approves, second locks DAI."
      placeholder="DAI amount"
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

ProjectCompoundForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  submittingError: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ProjectCompoundFormComp = reduxForm({
  form: 'projectCompoundForm',
  validate: projectCompoundFormValidator,
})(ProjectCompoundForm);

const mapStateToProps = ({ project }) => ({
  submittingForm: project.funding,
  submittingError: project.fundingError,
});

const mapDispatchToProps = {
  onSubmit: fundProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectCompoundFormComp);
