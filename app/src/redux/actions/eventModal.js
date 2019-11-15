import {
  EVENTS_MODAL_OPEN,
  EVENTS_MODAL_CLOSE
} from "../actionsTypes/eventModal";

export const openEventsModal = () => ({
  type: EVENTS_MODAL_OPEN
});

export const closeEventsModal = () => ({
  type: EVENTS_MODAL_CLOSE
});
