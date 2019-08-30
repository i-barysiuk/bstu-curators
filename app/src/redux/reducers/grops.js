import {
  GROUPS_SUCCESS,
  GROUPS_FAILED,
  GROUPS__ACTIVE_SUCCESS,
  GROUPS__ACTIVE_FAILED,
  GROUPS__ALL_SUCCESS,
  GROUPS__ARCHIVE_SUCCESS,
  GROUPS__FAVORITE_ADD_SUCCESS,
  GROUPS__FAVORITE_REMOVE_SUCCESS,
  GROUPS__ARCHIVE_ADD_SUCCESS,
  GROUPS__ARCHIVE_REMOVE_SUCCESS
  GROUPS__EDIT_SUCCESS,
  GROUPS__EDIT_END
} from "../actionsTypes/groups";

const defaultEdit = {
  geography: {},
  living: {},
  social: {},
  studyProcess: {},
  isEditing: false
};

export const defaultGroupsState = {
  active: {},
  all: {},
  archive: {},
  my: [],
  editing: defaultEdit,
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

    case GROUPS__ARCHIVE_ADD_SUCCESS:
      return { ...state, archive: [...state.archive, action.payload] };

    case GROUPS__ARCHIVE_REMOVE_SUCCESS:
      return { ...state, archive: action.payload };

    case GROUPS__FAVORITE_ADD_SUCCESS:
      return { ...state, favorite: [...state.favorite, action.payload] };

    case GROUPS__FAVORITE_REMOVE_SUCCESS:
      return { ...state, favorite: action.payload };

    case GROUPS__EDIT_SUCCESS:
      return { ...state, editing: { ...action.payload, isEditing: true } };

    case GROUPS__EDIT_END:
      return { ...state, editing: defaultEdit };

    case GROUPS_FAILED:
    case GROUPS__ACTIVE_FAILED:
    default:
      return state;
  }
};
