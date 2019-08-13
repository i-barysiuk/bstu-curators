import { GROUPS_REQUEST, GROUPS_SUCCESS } from "../actionsTypes/groups";

export const fetchGroups = ({ currentGroup }) => ({
  type: GROUPS_REQUEST,
  payload: currentGroup
});

export const fetchGroupsSuccess = ({ groups }) => ({
  type: GROUPS_SUCCESS,
  payload: groups
});
