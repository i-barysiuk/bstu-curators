const express = require("express");
const router = express.Router();

const EventService = require("../../services/EventService");

router.get("/", (req, res) => {
  EventService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.get("/:id", (req, res) => {
  EventService.get(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.post("/", (req, res) => {
  EventService.create(req.body)
    .then(event => res.status(201).json(event))
    .catch(err => console.error(err));
});

router.put("/:id", (req, res) => {
  EventService.update(req.body, req.params.id)
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
  EventService.delete(req.params.id)
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
