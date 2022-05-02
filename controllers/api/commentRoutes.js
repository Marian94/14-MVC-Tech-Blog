const router = require("express").Router();
const { Comment, Post } = require("../../models");

router.post("/", async (req, res) => {
  try {
    const commentData = await Comment.create({
      ...req.body,
      username: req.session.userName,
    });
    const comment = commentData.get({ plain: true });
    console.log(comment);
    res.status(200).json(comment);
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
