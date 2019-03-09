import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import projectAddQuestionFormValidator from './projectAddQuestionFormValidator';
import InputComponent from '../../../Forms/InputComponent';
import TextAreaComponent from '../../../Forms/TextAreaComponent';
import { projectAddQuestion } from '../../../../actions/projectActions';

const ProjectAddQuestionForm = ({
  handleSubmit, pristine, invalid, submittingForm, submittingError, closeModal, onSubmit, projectId,
}) => (
  <form onSubmit={handleSubmit((e) => { onSubmit(e, projectId, closeModal); })} className="form-wrapper">
    <Field
      focus
      id="question"
      name="question"
      labelText="Question"
      placeholder="Question"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="answer"
      name="answer"
      labelText="Answer"
      placeholder="Answer"
      wrapperClassName="form-item-wrapper form-item-wrapper-textarea last"
      component={TextAreaComponent}
      showErrorText
    />

    { !submittingForm && submittingError && <div className="submit-error-wrapper">{submittingError}</div> }

    <div className="buttons-wrapper">
      <button type="button" className="button" onClick={closeModal}>Cancel</button>

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

ProjectAddQuestionForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  projectId: PropTypes.number.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  submittingError: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
};

const ProjectAddQuestionFormComp = reduxForm({
  form: 'projectAddQuestionForm',
  validate: projectAddQuestionFormValidator,
})(ProjectAddQuestionForm);

const mapStateToProps = ({ project }) => ({
  submittingForm: project.addingQuestion,
  submittingError: project.addingQuestionError,
});

const mapDispatchToProps = {
  onSubmit: projectAddQuestion,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProjectAddQuestionFormComp);
