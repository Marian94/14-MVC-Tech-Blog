const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({
      include: [
        {
          model: User,
          attributes: ["username"],
        },
      ],
    });
    const posts = postData.map((post) => post.get({ plain: true })).reverse();
    console.log(posts);
    res.render("homepage", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/login", async (req, res) => {
  try {
    res.render("login", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/signup", async (req, res) => {
  try {
    res.render("signup", { loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/dashboard", async (req, res) => {
  try {
    const postsData = await Post.findAll({
      where: {
        user_id: req.session.userId,
      },
    });
    const posts = postsData.map((post) => post.get({ plain: true })).reverse();
    console.log(posts);
    res.render("dashboard", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get("/posts/:id", async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["username"],
        },
        {
          model: Comment,
        },
      ],
    });
    const post = postData.get({ plain: true });
    console.log(post);
    res.render("post", {
      ...post,
      loggedIn: req.session.loggedIn,
      userName: req.session.userName,
    });
  } catch (err) {
    res.status(400).json(err);
  }
});
module.exports = router;
