import moment from "moment";
import { get } from "lodash";

const groupConfig = [
  { name: "gender", data: ["men", "women"] },
  { name: "community", data: ["brsm", "profkom", "studsovet", "others"] },
  { name: "family", data: ["full", "notfull", "manychild", "orphan"] },
  { name: "geography", data: ["local", "nonresident", "foreign"] },
  { name: "living", data: ["parents", "relatives", "independent", "hostel"] },
  {
    name: "social",
    data: [
      "socCHAES",
      "socCHAESRegion",
      "socFeature",
      "socOrphan18",
      "socOrphans",
      "socParentsInvalid",
      "socWithoutParents18"
    ]
  },
  {
    name: "studyProcess",
    data: ["1", "2", "3", "4", "5", "6"]
  }
];

const dateConfig = [
  "coursePeriod",
  "winterHoliday",
  "winterSession",
  "summerSession",
  "practice",
  "attestation1",
  "attestation2",
  "attestation3",
  "attestation4"
];

const replaceConfig = [
  { name: "total", newName: "totalSudents" },
  { name: "more", newName: "others" }
];

export const getGroupData = data => {
  let newData = { ...data };
  // eslint-disable-next-line array-callback-return
  groupConfig.map(item => {
    newData[item.name] = item.data.reduce((object, item) => {
      object[item] = newData[item] || null;
      if (item === "men") {
        object[item] = newData.total - newData.women;
      }
      delete newData[item];
      return object;
    }, {});
  });

  // eslint-disable-next-line array-callback-return
  replaceConfig.map(item => {
    newData[item.newName] = newData[item.name];
    delete newData[item.name];
  });

  for (let i = 1; i < 7; i++) {
    // eslint-disable-next-line no-loop-func
    const courseDates = dateConfig.reduce((object, item) => {
      const dates = getDate(item, newData[item + i]);
      delete newData[item + i];
      return { ...object, ...dates };
    }, {});
    newData.studyProcess[i] = courseDates;
  }
  const { studyPeriodStart, studyPeriodEnd } = getDate(
    "studyPeriod",
    newData.studyPeriod
  );
  newData = { ...newData, studyPeriodStart, studyPeriodEnd };
  delete newData.studyPeriod;
  return newData;
};

export const getDate = (name, dates) => {
  if (!dates) {
    return;
  }
  const [start, end] = dates;
  let newDate = {};
  newDate[`${name}Start`] = moment(start).format("YYYY-MM-DD");
  newDate[`${name}End`] = moment(end).format("YYYY-MM-DD");
  return newDate;
};

export const formDate = (name, objcet) => {
  const start = get(objcet, `${name}Start`, null);
  const end = get(objcet, `${name}End`, null);
  if (start && end) {
    return [moment(start), moment(end)];
  }
};
