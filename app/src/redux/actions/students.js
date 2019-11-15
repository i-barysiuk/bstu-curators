import {
  STUDENTS_REQUEST,
  STUDENTS_SUCCESS,
  STUDENTS_FAILED,
  STUDENTS__ALL_REQUEST,
  STUDENTS__ALL_SUCCESS
} from "../actionsTypes/STUDENTS";

export const fetchAllStudents = () => ({
  type: STUDENTS__ALL_REQUEST
});

export const fetchAllStudentsSuccess = ({ students }) => ({
  type: STUDENTS__ALL_SUCCESS,
  payload: students
});
