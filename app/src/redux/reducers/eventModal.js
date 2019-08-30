import {
  EVENTS_MODAL_OPEN,
  EVENTS_MODAL_CLOSE
} from "../actionsTypes/eventModal";

export const defaultEventsModalsState = {
  isOpen: false
};

export default (state = defaultEventsModalsState, action) => {
  switch (action.type) {
    case EVENTS_MODAL_OPEN:
      return { isOpen: true };
    case EVENTS_MODAL_CLOSE:
      return { isOpen: false };
    default:
      return state;
  }
};
