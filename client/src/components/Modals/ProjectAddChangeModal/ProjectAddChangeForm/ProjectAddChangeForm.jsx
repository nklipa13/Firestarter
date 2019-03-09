import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Field, reduxForm, FieldArray } from 'redux-form';
import projectAddChangeFormValidator from './projectAddChangeFormValidator';
import InputComponent from '../../../Forms/InputComponent';
import TextAreaComponent from '../../../Forms/TextAreaComponent';
import ProjectChangesFieldArray from './ProjectChangesFieldArray/ProjectChangesFieldArray';
import { projectAddChange } from '../../../../actions/projectActions';

const ProjectAddChangeForm = ({
  handleSubmit, pristine, invalid, submittingForm, submittingError, closeModal, onSubmit, projectId,
}) => (
  <form onSubmit={handleSubmit((e) => { onSubmit(e, projectId, closeModal); })} className="form-wrapper">
    <Field
      focus
      id="change-version-number"
      name="version"
      labelText="Version number"
      placeholder="Version number"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="change-version-date"
      name="date"
      labelText="Version date"
      placeholder="Version date"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="change-description"
      name="description"
      labelText="Version description"
      placeholder="Version description"
      component={TextAreaComponent}
      showErrorText
    />

    <FieldArray name="changes" component={ProjectChangesFieldArray} />

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

ProjectAddChangeForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  submittingError: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ProjectAddChangeFormComp = reduxForm({
  form: 'projectAddChangeForm',
  validate: projectAddChangeFormValidator,
})(ProjectAddChangeForm);

const mapStateToProps = ({ project }) => ({
  submittingForm: project.addingChange,
  submittingError: project.addingChangeError,
});

const mapDispatchToProps = {
  onSubmit: projectAddChange,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAddChangeFormComp);
