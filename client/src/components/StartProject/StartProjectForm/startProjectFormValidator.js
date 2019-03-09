const startProjectFormValidator = ({
  name, shortDescription, imageUrl, about, aboutCreator,
}) => {
  const errors = {};

  if (!name) errors.name = 'Required';
  if (!shortDescription) errors.shortDescription = 'Required';
  if (!imageUrl) errors.imageUrl = 'Required';
  if (!about) errors.about = 'Required';
  if (!aboutCreator) errors.aboutCreator = 'Required';

  if (name && name.length > 45) errors.name = 'Can’t be longer than 45 characters';
  if (shortDescription && shortDescription.length > 150) errors.shortDescription = 'Can’t be longer than 150 characters'; // eslint-disable-line
  if (aboutCreator && aboutCreator.length > 290) errors.aboutCreator = 'Can’t be longer than 150 characters';

  return errors;
};

export default startProjectFormValidator;
