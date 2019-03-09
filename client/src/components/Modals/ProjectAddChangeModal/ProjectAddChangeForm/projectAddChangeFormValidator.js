const projectAddQuestionFormValidator = ({
  version, description, date, changes,
}) => {
  const errors = {};

  if (!version) errors.version = 'Required';
  if (!description) errors.description = 'Required';
  if (!date) errors.date = 'Required';

  if (!changes || !changes.length) {
    errors.changes = { _error: 'At least one change must be entered' };
  } else {
    const changeIndex = changes.findIndex(c => c.change);

    if (changeIndex < 0) errors.changes = { _error: 'At least one change must be entered' };
  }

  return errors;
};

export default projectAddQuestionFormValidator;
