const express = require("express");
const router = express.Router();

const GroupsEventService = require("../../services/GroupsEventService");

router.get("/", (req, res) => {
  GroupsEventService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.get("/:id", (req, res) => {
  GroupsEventService.get(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.post("/", (req, res) => {
  var groupsData = req.body.groupId.map(item => {
    return { eventId: req.body.eventId, groupId: item };
  });
  groupsData.map(item => {
    GroupsEventService.create(item)
      .then(data => res.status(201).json(data))
      .catch(err => console.error(err));
  });
});

router.put("/:id", (req, res) => {
  GroupsEventService.update(req.body, req.params.id)
    .then(updatedRecord => {
      if (updatedRecord[0] === 1) {
        res.status(200).json({ message: "Updated successfully" });
      } else {
        res.status(404).json({ message: "event not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  GroupsEventService.delete(req.params.id)
    .then(deletedRecordCount => {
      if (deletedRecordCount === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "event not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
