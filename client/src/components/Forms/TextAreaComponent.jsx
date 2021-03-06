import React from 'react';
import PropTypes from 'prop-types';

const TextAreaComponent = ({
  input, placeholder, wrapperClassName, inputClassName, errorClassName, showErrorText,
  id, labelText, labelClass, meta: { touched, error }, focus, additional, secondLabelText,
}) => (
  <div className={wrapperClassName}>
    {
      labelText && (
        <label
          className={`${labelClass} ${secondLabelText ? 'two-labels' : ''}`}
          htmlFor={id || ''}
        >
          { labelText }
        </label>
      )
    }
    { secondLabelText && <div className="second-label">{secondLabelText}</div> }
    <textarea
      {...input}
      {...additional}
      placeholder={placeholder}
      id={id || ''}
      className={`${inputClassName} ${touched && error ? errorClassName : ''}`}
      autoFocus={focus}
    />
    {touched && ((error && showErrorText && <div className={errorClassName}>{error}</div>))}
  </div>
);

TextAreaComponent.defaultProps = {
  labelText: '',
  secondLabelText: '',
  labelClass: '',
  id: '',
  placeholder: '',
  showErrorText: false,
  focus: false,
  additional: {},
  wrapperClassName: 'form-item-wrapper form-item-wrapper-textarea',
  inputClassName: 'form-item form-item-textarea',
  errorClassName: 'form-item-error',
};

TextAreaComponent.propTypes = {
  input: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  secondLabelText: PropTypes.string,
  id: PropTypes.string,
  labelText: PropTypes.string,
  labelClass: PropTypes.string,
  meta: PropTypes.object.isRequired,
  showErrorText: PropTypes.bool,
  focus: PropTypes.bool,
  additional: PropTypes.object,
};

export default TextAreaComponent;
