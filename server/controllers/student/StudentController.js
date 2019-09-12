const express = require("express");
const router = express.Router();

const StudentService = require("../../services/StudentService");

router.get("/", (req, res) => {
  StudentService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.get("/:id", (req, res) => {
  StudentService.get(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.get("/group/:id", (req, res) => {
  StudentService.findGroup(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.post("/", (req, res) => {
  StudentService.create(req.body)
    .then(student => res.status(201).json(student))
    .catch(err => console.error(err));
});

router.put("/:id", (req, res) => {
  StudentService.update(req.body, req.params.id)
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
  StudentService.delete(req.params.id)
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

router.get("/select", (req, res) => {
  StudentService.select(req.body)
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

module.exports = router;
