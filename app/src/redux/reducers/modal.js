import { MODAL_OPEN, MODAL_CLOSE } from "../actionsTypes/modal";

export const defaultGroupsState = {
  isOpen: false
};

export default (state = defaultGroupsState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return { isOpen: true };
    case MODAL_CLOSE:
      return { isOpen: false };
    default:
      return state;
  }
};
