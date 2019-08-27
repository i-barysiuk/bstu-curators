import { MODAL_OPEN, MODAL_CLOSE } from "../actionsTypes/modal";

export const defaultModalsState = {
  isOpen: false
};

export default (state = defaultModalsState, action) => {
  switch (action.type) {
    case MODAL_OPEN:
      return { isOpen: true };
    case MODAL_CLOSE:
      return { isOpen: false };
    default:
      return state;
  }
};
