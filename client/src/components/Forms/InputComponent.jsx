import React from 'react';
import PropTypes from 'prop-types';

import '../../common/forms.scss';

const InputComponent = ({
  input, placeholder, wrapperClassName, inputClassName, errorClassName, showErrorText,
  type, id, labelText, labelClass, meta: { touched, error }, focus, additional, icon, disabled,
  secondLabelText,
}) => (
  <div className={`${wrapperClassName} ${touched && error ? 'wrapper-error' : ''}`}>
    <div className="input-values">
      {labelText && <label className={labelClass} htmlFor={id || ''}>{ labelText }</label>}
      { icon && <span className={`${touched && error ? 'icon-error' : ''} input-icon`}>{icon}</span> }
      <input
        {...input}
        {...additional}
        placeholder={placeholder}
        id={id || ''}
        className={`${inputClassName} ${touched && error ? errorClassName : ''}`}
        type={type}
        autoFocus={focus}
        disabled={disabled}
      />
      { secondLabelText && <div className="second-label">{secondLabelText}</div> }
    </div>

    {touched && ((error && showErrorText && <div className={errorClassName}>{error}</div>))}
  </div>
);

InputComponent.defaultProps = {
  type: 'text',
  labelText: '',
  secondLabelText: '',
  labelClass: '',
  id: '',
  placeholder: '',
  showErrorText: false,
  focus: false,
  disabled: false,
  additional: {},
  wrapperClassName: 'form-item-wrapper',
  inputClassName: 'form-item',
  errorClassName: 'form-item-error',
  icon: <div />,
};

InputComponent.propTypes = {
  input: PropTypes.any.isRequired,
  placeholder: PropTypes.string,
  wrapperClassName: PropTypes.string,
  inputClassName: PropTypes.string,
  errorClassName: PropTypes.string,
  type: PropTypes.string,
  id: PropTypes.string,
  labelText: PropTypes.string,
  secondLabelText: PropTypes.string,
  labelClass: PropTypes.string,
  meta: PropTypes.object.isRequired,
  showErrorText: PropTypes.bool,
  focus: PropTypes.bool,
  disabled: PropTypes.bool,
  additional: PropTypes.object,
  icon: PropTypes.node,
};

export default InputComponent;
