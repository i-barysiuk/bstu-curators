import {
  STUDENTS_REQUEST,
  STUDENTS_SUCCESS,
  STUDENTS_FAILED,
  STUDENTS__ALL_REQUEST,
  STUDENTS__ALL_SUCCESS
} from "../actionsTypes/STUDENTS";

export default (state = defaultStudentsState, action) => {
  switch (action.type) {
    case STUDENTS__ALL_SUCCESS:
      return { ...state, all: action.payload };

    default:
      return state;
  }
};
