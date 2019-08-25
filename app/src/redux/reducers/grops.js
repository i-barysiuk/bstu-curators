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

const mockedGroup = {
  id: "e9956415-faaf-4fc0-98f1-08740b476425",
  curatorId: "e15f3949-ac4a-4374-9b2e-8e0b88f4ee56",
  group: "ФЭИС",
  name: "Э-33",
  fullName: "Эконом - 33",
  course: 4,
  department: "Факультет электронно-информационных систем",
  cathedra: "Кафедра ЭВМ и систем",
  isActive: true,
  totalStudents: 27,
  gender: { men: 25, women: 2 },
  community: { brsm: 15, profkom: 10, studsovet: 0, others: 2 },
  family: { full: 18, notfull: 2, manychild: 5, orphan: 2 },
  geography: { local: 18, nonresident: 2, foreign: 5 },
  living: { parents: 18, relatives: 2, independent: 5, hostel: 2 },
  social: { test1: 18, test2: 5, test3: 2 },
  others: "ПРОЧАЯ ИНФОРМАЦИЯ О ГРУППЕ",
  studyProcess: {},
  createdAt: "2019-08-15T11:50:43.677Z",
  updatedAt: "2019-08-15T11:50:43.677Z"
};

export const defaultGroupsState = {
  active: {},
  all: {},
  archive: {},
  my: [],
  editing: mockedGroup,
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
