import { all } from "redux-saga/effects";

import groupsSaga from "./groups.saga";

export default function*() {
  yield all([groupsSaga()]);
}
