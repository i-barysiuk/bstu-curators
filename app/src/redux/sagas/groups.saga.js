import { call, put, takeLatest } from "redux-saga/effects";
import { GROUPS_REQUEST } from "../actionsTypes/groups";
import { fetchGroupsSuccess } from "../actions/groups";
import GroupsService from "../../services/GroupsService";

function* fetchGrops({ paylad }) {
  try {
    const groups = yield call(() => GroupsService.getGroups());
    yield put(fetchGroupsSuccess({ groups }));
  } catch (e) {
    console.log(e);
  }
}

export default function*() {
  yield takeLatest(GROUPS_REQUEST, fetchGrops);
}
