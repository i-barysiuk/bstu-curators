import { call, put, takeLatest } from "redux-saga/effects";
import { GROUPS_REQUEST, GROUPS__ACTIVE_REQUEST } from "../actionsTypes/groups";
import {
  fetchGroupsSuccess,
  fetchGroupsFailed,
  fetchActiveGroupSuccess,
  fetchActiveGroupFailed
} from "../actions/groups";
import GroupsService from "../../services/GroupsService";

function* fetchGroups() {
  try {
    const groups = yield call(() => GroupsService.getMyAndFavoriteGroups());
    yield put(fetchGroupsSuccess({ groups }));
  } catch (e) {
    console.log(e);
    yield put(fetchGroupsFailed());
  }
}

function* fetchActiveGroup({ payload }) {
  try {
    const group = yield call(() =>
      GroupsService.getActiveGroup({ id: payload })
    );
    yield put(fetchActiveGroupSuccess({ group }));
  } catch (e) {
    console.log(e);
    yield put(fetchActiveGroupFailed());
  }
}

export default function*() {
  yield takeLatest(GROUPS_REQUEST, fetchGroups);
  yield takeLatest(GROUPS__ACTIVE_REQUEST, fetchActiveGroup);
}
