import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import startProjectFormValidator from './startProjectFormValidator';
import startProjectFormAsyncValidator from './startProjectFormAsyncValidator';
import InputComponent from '../../Forms/InputComponent';
import { startProject } from '../../../actions/startProjectActions';
import TextAreaComponent from '../../Forms/TextAreaComponent';

const StartProjectForm = ({
  handleSubmit, pristine, invalid, submittingForm, submittingError, onSubmit, history,
}) => (
  <form onSubmit={handleSubmit((e) => { onSubmit(e, history); })} className="form-wrapper">
    <Field
      focus
      id="name"
      name="name"
      labelText="Project name"
      secondLabelText="Project name should be bla bla. Lorem ipsum dolor sum"
      placeholder="Project name"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="short-description"
      name="description"
      labelText="Short description"
      secondLabelText="Project name should be bla bla. Lorem ipsum dolor sum"
      placeholder="Short description"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="image-url"
      name="imageUrl"
      labelText="Project image URL"
      secondLabelText="Your image should be minimum 800x270px large to look pretty"
      placeholder="Project image URL"
      component={InputComponent}
      showErrorText
    />

    <Field
      id="about"
      name="aboutProject"
      labelText="About project"
      secondLabelText="Project name should be bla bla. Lorem ipsum dolor sum"
      placeholder="About project"
      component={TextAreaComponent}
      showErrorText
    />

    <Field
      id="about-creator"
      name="aboutCreator"
      labelText="About creator"
      secondLabelText="Project name should be bla bla. Lorem ipsum dolor sum "
      placeholder="About creator"
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
        { submittingForm ? 'Starting' : 'Start' }
      </button>
    </div>
  </form>
);

StartProjectForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  pristine: PropTypes.bool.isRequired,
  invalid: PropTypes.bool.isRequired,
  submittingForm: PropTypes.bool.isRequired,
  submittingError: PropTypes.string.isRequired,
};

const StartProjectFormComp = reduxForm({
  form: 'startProjectForm',
  validate: startProjectFormValidator,
  asyncValidate: startProjectFormAsyncValidator,
  asyncBlurFields: ['imageUrl'],
})(StartProjectForm);

const mapStateToProps = ({ startProject }) => ({
  submittingForm: startProject.startingProject,
  submittingError: startProject.startingProjectError,
});

const mapDispatchToProps = {
  onSubmit: startProject,
};

export default connect(mapStateToProps, mapDispatchToProps)(StartProjectFormComp);
