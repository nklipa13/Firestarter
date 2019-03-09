// Register modal types here
import ProjectAddQuestionModal from './ProjectAddQuestionModal/ProjectAddQuestionModal';
import ProjectAddChangeModal from './ProjectAddChangeModal/ProjectAddChangeModal';
import ProjectWithdrawModal from './ProjectWithdrawModal/ProjectWithdrawModal';
import ProjectFundModal from './ProjectFundModal/ProjectFundModal';

export const PROJECT_ADD_QUESTION_MODAL = 'PROJECT_ADD_QUESTION_MODAL';
export const PROJECT_ADD_CHANGE_MODAL = 'PROJECT_ADD_CHANGE_MODAL';
export const PROJECT_WITHDRAW_MODAL = 'PROJECT_WITHDRAW_MODAL';
export const PROJECT_FUND_MODAL = 'PROJECT_FUND_MODAL';

export default {
  [PROJECT_ADD_QUESTION_MODAL]: ProjectAddQuestionModal,
  [PROJECT_ADD_CHANGE_MODAL]: ProjectAddChangeModal,
  [PROJECT_WITHDRAW_MODAL]: ProjectWithdrawModal,
  [PROJECT_FUND_MODAL]: ProjectFundModal,
};
