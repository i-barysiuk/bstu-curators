import {
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  GROUPS_FAILED,
  GROUPS__ACTIVE_REQUEST,
  GROUPS__ACTIVE_SUCCESS,
  GROUPS__ACTIVE_FAILED,
  GROUPS__ALL_REQUEST,
  GROUPS__ALL_SUCCESS,
  GROUPS__ARCHIVE_REQUEST,
  GROUPS__ARCHIVE_SUCCESS,
  GROUPS__ARCHIVE_ADD_REQUEST,
  GROUPS__ARCHIVE_ADD_SUCCESS,
  GROUPS__ARCHIVE_REMOVE_SUCCESS,
  GROUPS__ARCHIVE_REMOVE_REQUEST,
  GROUPS__FAVORITE_ADD_REQUEST,
  GROUPS__FAVORITE_ADD_SUCCESS,
  GROUPS__FAVORITE_REMOVE_REQUEST,
  GROUPS__FAVORITE_REMOVE_SUCCESS
} from "../actionsTypes/groups";

export const fetchMyAndFavGroups = () => ({
  type: GROUPS_REQUEST
});

export const fetchGroupsSuccess = ({ groups }) => ({
  type: GROUPS_SUCCESS,
  payload: groups
});

export const fetchAllGroups = () => ({
  type: GROUPS__ALL_REQUEST
});

export const fetchAllGroupsSuccess = ({ groups }) => ({
  type: GROUPS__ALL_SUCCESS,
  payload: groups
});

export const fetchArchiveGroups = () => ({
  type: GROUPS__ARCHIVE_REQUEST
});

export const fetchArchiveGroupsSuccess = ({ groups }) => ({
  type: GROUPS__ARCHIVE_SUCCESS,
  payload: groups
});

export const fetchGroupsFailed = () => ({
  type: GROUPS_FAILED
});

export const fetchActiveGroup = ({ id }) => ({
  type: GROUPS__ACTIVE_REQUEST,
  payload: id
});

export const fetchActiveGroupSuccess = ({ group }) => ({
  type: GROUPS__ACTIVE_SUCCESS,
  payload: group
});

export const fetchActiveGroupFailed = () => ({
  type: GROUPS__ACTIVE_FAILED
});

export const addGroupToFavouriteRequest = ({ group }) => ({
  type: GROUPS__FAVORITE_ADD_REQUEST,
  payload: group
});

export const pushGroupToFavourite = ({ group }) => ({
  type: GROUPS__FAVORITE_ADD_SUCCESS,
  payload: group
});

export const removeGroupFromFavouriteRequest = ({ group }) => ({
  type: GROUPS__FAVORITE_REMOVE_REQUEST,
  payload: group
});

export const popGroupFromFavourite = ({ favorite }) => ({
  type: GROUPS__FAVORITE_REMOVE_SUCCESS,
  payload: favorite
});

export const addGroupToArchiveRequest = ({ group }) => ({
  type: GROUPS__ARCHIVE_ADD_REQUEST,
  payload: group
});

export const pushGroupToArchive = ({ group }) => ({
  type: GROUPS__ARCHIVE_ADD_SUCCESS,
  payload: group
});

export const removeGroupFromArchiveRequest = ({ group }) => ({
  type: GROUPS__ARCHIVE_REMOVE_REQUEST,
  payload: group
});

export const popGroupFromArchive = ({ archive }) => ({
  type: GROUPS__ARCHIVE_REMOVE_SUCCESS,
  payload: archive
});