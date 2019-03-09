const projectAddQuestionFormValidator = ({ question, answer }) => {
  const errors = {};

  if (!question) errors.question = 'Required';
  if (!answer) errors.answer = 'Required';

  return errors;
};

export default projectAddQuestionFormValidator;
