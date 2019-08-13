import {
  GROUPS_SUCCESS,
  GROUPS_FAILED,
  GROUPS__ACTIVE_SUCCESS,
  GROUPS__ACTIVE_FAILED
} from "../actionsTypes/groups";

export const defaultGroupsState = {
  active: {},
  all: {},
  archive: {},
  my: [],
  favorite: []
};

export default (state = defaultGroupsState, action) => {
  switch (action.type) {
    case GROUPS_SUCCESS:
      return { ...state, ...action.payload };

    case GROUPS__ACTIVE_SUCCESS:
      return { ...state, active: action.payload };

    case GROUPS_FAILED:
    case GROUPS__ACTIVE_FAILED:
    default:
      return state;
  }
};
