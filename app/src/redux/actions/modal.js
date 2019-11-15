import {
  GROUP_MODAL_OPEN,
  GROUP_MODAL_CLOSE,
  STUDENT_MODAL_OPEN,
  STUDENT_MODAL_CLOSE,
  EVENTS_MODAL_OPEN,
  EVENTS_MODAL_CLOSE
} from "../actionsTypes/modal";

export const openGroupModal = () => ({
  type: GROUP_MODAL_OPEN
});

export const closeGroupModal = () => ({
  type: GROUP_MODAL_CLOSE
});

export const openStudentModal = () => ({
  type: STUDENT_MODAL_OPEN
});

export const closeStudentModal = () => ({
  type: STUDENT_MODAL_CLOSE
});

export const openEventsModal = () => ({
  type: EVENTS_MODAL_OPEN
});

export const closeEventsModal = () => ({
  type: EVENTS_MODAL_CLOSE
});
