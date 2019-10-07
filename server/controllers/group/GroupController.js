const express = require("express");
const router = express.Router();

const GroupService = require("../../services/GroupService");
const UserService = require("../../services/UserService");

router.get("/", (req, res) => {
  UserService.get(req.user.id)
    .then(user => {
      return Promise.all([
        GroupService.select({
          id: user.favoriteGroups,
          isActive: true
        }),
        GroupService.select({ curatorId: user.id, isActive: true })
      ]);
    })
    .then(data => res.status(200).json({ favorite: data[0], my: data[1] }))
    .catch(err => res.status(500).json(err));
});

router.get("/all", (req, res) => {
  GroupService.getActive()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

router.get("/all_groups", (req, res) => {
  GroupService.getAll()
    .then(data => res.status(200).json(data))
    .catch(err => res.status(500).json(err));
});

router.get("/archive", (req, res) => {
  GroupService.getArchive()
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

router.put("/:id/add_favorite", (req, res) => {
  UserService.get(req.user.id)
    .then(user => {
      var favorite = user.favoriteGroups;
      favorite.push(req.params.id);
      return UserService.update({ favoriteGroups: favorite }, req.user.id);
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
    });
});

router.put("/:id/remove_favorite", (req, res) => {
  UserService.get(req.user.id)
    .then(user => {
      var favorite = user.favoriteGroups.filter(item => item !== req.params.id);
      return UserService.update({ favoriteGroups: favorite }, req.user.id);
    })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(err => {
      res.status(500).json(err);
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
