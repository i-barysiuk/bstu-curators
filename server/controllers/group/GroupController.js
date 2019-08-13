const express = require("express");
const router = express.Router();

const GroupService = require("../../services/GroupService");

router.get("/", (req, res) => {
  GroupService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  GroupService.get(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

router.post("/", (req, res) => {
  GroupService.create(req.body)
    .then(group => res.status(201).json(group))
    .catch(err => res.status(500).json(err));
});

router.put("/:id", (req, res) => {
  GroupService.update(req.body, req.params.id)
    .then(updatedRecord => {
      if (updatedRecord[0] === 1) {
        res.status(200).json({ message: "Updated successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

router.delete("/:id", (req, res) => {
  GroupService.delete(req.params.id)
    .then(deletedRecordCount => {
      if (deletedRecordCount === 1) {
        res.status(200).json({ message: "Deleted successfully" });
      } else {
        res.status(404).json({ message: "record not found" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

module.exports = router;
