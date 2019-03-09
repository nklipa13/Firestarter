const projectWithdrawFormValidator = ({ ethAmount, daiAmount, purpose }) => {
  const errors = {};

  if (!ethAmount && !daiAmount) errors.ethAmount = 'Required';
  if (!purpose) errors.purpose = 'Required';

  if (ethAmount && (parseFloat(ethAmount)) <= 0) errors.ethAmount = 'Must be a positive value';
  if (daiAmount && (parseFloat(daiAmount)) <= 0) errors.daiAmount = 'Must be a positive value';

  return errors;
};

export default projectWithdrawFormValidator;
