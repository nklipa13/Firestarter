const projectVestFormValidator = ({ ethAmount, weeks }) => {
  const errors = {};

  if (!ethAmount) errors.ethAmount = 'Required';
  if (!weeks) errors.weeks = 'Required';

  if (ethAmount && (parseFloat(ethAmount)) <= 0) errors.ethAmount = 'Must be a positive value';
  if (weeks && (parseFloat(weeks)) <= 0) errors.weeks = 'Must be a positive value';

  return errors;
};

export default projectVestFormValidator;
