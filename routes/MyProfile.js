const express = require("express");
const router = express.Router();
const { MyProfile } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/", async (req, res) => {
  const listMyProfile = await MyProfile.findAll();
  res.json(listMyProfile);
});

router.post("/", async (req, res) => {
  const myprofile = req.body;
  await MyProfile.create(myprofile);
  res.json(myprofile);
});

router.delete("/:myProfileId", validateToken, async (req, res) => {
  const myProfileId = req.params.myProfileId;

  await MyProfile.destroy({
    where: {
      id: myProfileId,
    },
  });

  res.json("DELETED SUCCESSFULLY");
});

module.exports = router;
