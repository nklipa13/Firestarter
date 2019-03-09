const projectOneTimeFormValidator = ({ ethAmount }) => {
  const errors = {};

  if (!ethAmount) errors.ethAmount = 'Required';
  if (ethAmount && (parseFloat(ethAmount)) <= 0) errors.ethAmount = 'Must be a positive value';

  return errors;
};

export default projectOneTimeFormValidator;
