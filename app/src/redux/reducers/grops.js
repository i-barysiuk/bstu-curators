import {
  GROUPS_SUCCESS,
  GROUPS_FAILED,
  GROUPS__ACTIVE_SUCCESS,
  GROUPS__ACTIVE_FAILED,
  GROUPS__ALL_SUCCESS,
  GROUPS__ARCHIVE_SUCCESS,
  GROUPS__FAVORITE_ADD_SUCCESS,
  GROUPS__FAVORITE_REMOVE_SUCCESS
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

    case GROUPS__ALL_SUCCESS:
      return { ...state, all: action.payload };

    case GROUPS__ARCHIVE_SUCCESS:
      return { ...state, archive: action.payload };

    case GROUPS__FAVORITE_ADD_SUCCESS:
      return { ...state, favorite: [...state.favorite, action.payload] };

    case GROUPS__FAVORITE_REMOVE_SUCCESS:
      return { ...state, favorite: action.payload };

    case GROUPS_FAILED:
    case GROUPS__ACTIVE_FAILED:
    default:
      return state;
  }
};
