const express = require("express");
const router = express.Router();

const UserService = require("../../services/UserService");

router.get("/", (req, res) => {
  UserService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.get("/:id", (req, res) => {
  UserService.get(req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => console.error(err));
});

router.post("/", (req, res) => {
  UserService.create(req.body)
    .then(user => res.status(201).json(user))
    .catch(err => console.error(err));
});

router.put("/:id", (req, res) => {
  UserService.update(req.body, req.params.id)
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
  UserService.delete(req.params.id)
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
