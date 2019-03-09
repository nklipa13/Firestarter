const startProjectFormValidator = ({
  name, description, imageUrl, aboutProject, aboutCreator,
}) => {
  const errors = {};

  if (!name) errors.name = 'Required';
  if (!description) errors.description = 'Required';
  if (!imageUrl) errors.imageUrl = 'Required';
  if (!aboutProject) errors.aboutProject = 'Required';
  if (!aboutCreator) errors.aboutCreator = 'Required';

  if (name && name.length > 45) errors.name = 'Can’t be longer than 45 characters';
  if (description && description.length > 150) errors.description = 'Can’t be longer than 150 characters'; // eslint-disable-line
  if (aboutCreator && aboutCreator.length > 290) errors.aboutCreator = 'Can’t be longer than description characters';

  return errors;
};

export default startProjectFormValidator;
