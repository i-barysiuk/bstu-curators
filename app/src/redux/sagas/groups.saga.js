import { call, put, takeLatest, select } from "redux-saga/effects";
import {
    GROUPS_REQUEST,
    GROUPS__ACTIVE_REQUEST,
    GROUPS__ALL_REQUEST,
    GROUPS__ARCHIVE_REQUEST,
    GROUPS__FAVORITE_ADD_REQUEST,
    GROUPS__FAVORITE_REMOVE_REQUEST,
    GROUPS__ARCHIVE_ADD_REQUEST,
    GROUPS__ARCHIVE_REMOVE_REQUEST,
    GROUPS__EDIT_REQUEST
} from "../actionsTypes/groups";
import {
    fetchGroupsSuccess,
    fetchGroupsFailed,
    fetchActiveGroupSuccess,
    fetchActiveGroupFailed,
    fetchAllGroupsSuccess,
    fetchArchiveGroupsSuccess,
    pushGroupToFavourite,
    popGroupFromFavourite,
    popGroupFromArchive,
    pushGroupToArchive,
    editGroupSucces
} from "../actions/groups";
import { openGroupModal } from "../actions/modal";
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

function* fetchAllGroups() {
    try {
        const groups = yield call(() => GroupsService.getAllGroups());
        yield put(fetchAllGroupsSuccess({ groups }));
    } catch (e) {
        console.log(e);
        yield put(fetchGroupsFailed());
    }
}

function* fetchArchiveGroups() {
    try {
        const groups = yield call(() => GroupsService.getArchiveGroups());
        yield put(fetchArchiveGroupsSuccess({ groups }));
    } catch (e) {
        console.log(e);
        yield put(fetchGroupsFailed());
    }
}

function* fetchActiveGroup({ payload }) {
    try {
        const group = yield call(() => GroupsService.getGroup({ id: payload }));
        yield put(fetchActiveGroupSuccess({ group }));
    } catch (e) {
        console.log(e);
        yield put(fetchActiveGroupFailed());
    }
}

function* addFavoriteGroup({ payload }) {
    try {
        console.log(payload);
        yield call(() => GroupsService.addFavoriteGroup({ id: payload.id }));
        yield put(pushGroupToFavourite({ group: payload }));
    } catch (e) {
        console.log(e);
    }
}

function* removeFavoriteGroup({ payload }) {
    const selectFavorite = state => state.groups.favorite;

    const favorite = yield select(selectFavorite);
    const index = favorite.indexOf(payload);
    favorite.splice(index, 1);
    try {
        console.log(payload);
        yield call(() => GroupsService.removeFavoriteGroup({ id: payload.id }));
        yield put(popGroupFromFavourite({ favorite }));
    } catch (e) {
        console.log(e);
    }
}

function* addArchiveGroup({ payload }) {
    try {
        console.log(payload);
        yield call(() => GroupsService.addArchiveGroup({ id: payload.id }));
        yield put(pushGroupToArchive({ group: payload }));
    } catch (e) {
        console.log(e);
    }
}

function* removeArchiveGroup({ payload }) {
    const selectArchive = state => state.groups.archive;

    const archive = yield select(selectArchive);
    const index = archive.indexOf(payload);
    archive.splice(index, 1);
    try {
        console.log(payload);
        yield call(() => GroupsService.removeArchiveGroup({ id: payload.id }));
        yield put(popGroupFromArchive({ archive }));
    } catch (e) {
        console.log(e);
    }
}

function* editGroup({ payload }) {
    try {
        const group = yield call(() => GroupsService.getGroup({ id: payload }));
        console.log(group);
        yield put(editGroupSucces({ group }));
        yield put(openGroupModal());
    } catch (e) {
        console.log(e);
        yield put(fetchActiveGroupFailed());
    }
}

export default function*() {
    yield takeLatest(GROUPS_REQUEST, fetchGroups);
    yield takeLatest(GROUPS__ACTIVE_REQUEST, fetchActiveGroup);
    yield takeLatest(GROUPS__ALL_REQUEST, fetchAllGroups);
    yield takeLatest(GROUPS__ARCHIVE_REQUEST, fetchArchiveGroups);
    yield takeLatest(GROUPS__FAVORITE_ADD_REQUEST, addFavoriteGroup);
    yield takeLatest(GROUPS__FAVORITE_REMOVE_REQUEST, removeFavoriteGroup);
    yield takeLatest(GROUPS__ARCHIVE_ADD_REQUEST, addArchiveGroup);
    yield takeLatest(GROUPS__ARCHIVE_REMOVE_REQUEST, removeArchiveGroup);
    yield takeLatest(GROUPS__EDIT_REQUEST, editGroup);
}