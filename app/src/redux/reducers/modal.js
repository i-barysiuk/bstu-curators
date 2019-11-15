import {
  GROUP_MODAL_OPEN,
  GROUP_MODAL_CLOSE,
  STUDENT_MODAL_OPEN,
  STUDENT_MODAL_CLOSE,
  EVENTS_MODAL_OPEN,
  EVENTS_MODAL_CLOSE
} from "../actionsTypes/modal";

export const defaultModalsState = {
  groupIsOpen: false,
  studentIsOpen: false,
  eventIsOpen: false
};

export default (state = defaultModalsState, action) => {
  switch (action.type) {
    case GROUP_MODAL_OPEN:
      return { groupIsOpen: true };
    case GROUP_MODAL_CLOSE:
      return { groupIsOpen: false };
    case STUDENT_MODAL_OPEN:
      return { studentIsOpen: true };
    case STUDENT_MODAL_CLOSE:
      return { studentIsOpen: false };
    case EVENTS_MODAL_OPEN:
      return { eventIsOpen: true };
    case EVENTS_MODAL_CLOSE:
      return { eventIsOpen: false };
    default:
      return state;
  }
};
