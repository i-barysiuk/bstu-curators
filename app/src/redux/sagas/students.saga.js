import { call, put, takeLatest, select } from "redux-saga/effects";
import { STUDENTS__ALL_REQUEST } from "../actionsTypes/students";
import {
  fetchGroupsFailed,
  fetchAllStudentsSuccess
} from "../actions/students";
import { openStudentModal } from "../actions/modal";
import GroupsService from "../../services/GroupsService";

function* fetchAllGroups() {
  try {
    const students = yield call(() => GroupsService.getAllGroups());
    yield put(fetchAllStudentsSuccess({ students }));
  } catch (e) {
    console.log(e);
    yield put(fetchGroupsFailed());
  }
}

export default function*() {
  yield takeLatest(STUDENTS__ALL_REQUEST, fetchAllGroups);
}
