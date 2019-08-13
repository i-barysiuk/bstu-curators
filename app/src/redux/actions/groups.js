import {
  GROUPS_REQUEST,
  GROUPS_SUCCESS,
  GROUPS_FAILED,
  GROUPS__ACTIVE_REQUEST,
  GROUPS__ACTIVE_SUCCESS,
  GROUPS__ACTIVE_FAILED
} from "../actionsTypes/groups";

export const fetchGroups = () => ({
  type: GROUPS_REQUEST
});

export const fetchGroupsSuccess = ({ groups }) => ({
  type: GROUPS_SUCCESS,
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
