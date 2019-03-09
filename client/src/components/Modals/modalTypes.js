// Register modal types here
import ProjectAddQuestionModal from './ProjectAddQuestionModal/ProjectAddQuestionModal';
import ProjectAddChangeModal from './ProjectAddChangeModal/ProjectAddChangeModal';

export const PROJECT_ADD_QUESTION_MODAL = 'PROJECT_ADD_QUESTION_MODAL';
export const PROJECT_ADD_CHANGE_MODAL = 'PROJECT_ADD_CHANGE_MODAL';

export default {
  [PROJECT_ADD_QUESTION_MODAL]: ProjectAddQuestionModal,
  [PROJECT_ADD_CHANGE_MODAL]: ProjectAddChangeModal,
};
