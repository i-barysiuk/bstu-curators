import { GROUPS_SUCCESS, GROUPS_FAILED } from "../actionsTypes/groups";

export const defaultGroupsState = { active: {}, all: [] };

export default (state = defaultGroupsState, action) => {
  switch (action.type) {
    case GROUPS_SUCCESS:
      return { ...state, all: action.payload };

    case GROUPS_FAILED:
    default:
      return state;
  }
};
