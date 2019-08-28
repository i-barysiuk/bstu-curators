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
  }
];

const replaceConfig = [
  { name: "total", newName: "totalSudents" },
  { name: "more", newName: "others" }
];

export const getGroupData = data => {
  const newData = { ...data };
  // eslint-disable-next-line array-callback-return
  groupConfig.map(item => {
    newData[item.name] = item.data.reduce((object, item) => {
      object[item] = newData[item];
      if (item === "men") {
        object[item] = newData.total - newData.women;
      }
      delete newData[item];
      return object;
    }, {});
  });
  replaceConfig.map(item => {
    newData[item.newName] = newData[item.name];
    delete newData[item.name];
  });
  return newData;
};
