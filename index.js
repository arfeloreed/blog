import express from "express";
import bodyParser from "body-parser";
import morgan from "morgan";

// constants
const app = express();
const port = 3000;

// variables
let index = 0;
let posts = [];
const months = [
  "Jan.",
  "Feb.",
  "Mar.",
  "Apr.",
  "May",
  "Jun.",
  "Jul.",
  "Aug.",
  "Sep.",
  "Oct.",
  "Nov.",
  "Dec.",
];

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static("public"));

// endpoints
// home page
app.get("/", (req, res) => {
  // console.log(posts);
  console.log(posts);
  res.render("index.ejs", {
    allPosts: posts,
  });
});

// creating post
app.get("/create-post/", (req, res) => {
  res.render("create-post.ejs");
});

app.post("/create-post/", (req, res) => {
  const year = new Date().getFullYear();
  const monthIndex = new Date().getMonth();
  const month = months[monthIndex];
  const day = new Date().getDate();

  let post = {
    id: index,
    author: req.body.author,
    title: req.body.title,
    date: `${month} ${day} ${year}`,
    content: req.body.post,
  };
  posts.push(post);
  index++;

  res.redirect("/");
});

// view post
app.get("/post/:id", (req, res) => {
  const postId = parseInt(req.params.id);

  res.render("view-post.ejs", {
    post: posts.find((post) => post.id === postId),
  });
});

// edit post
app.get("/post/:id/edit/", (req, res) => {
  const postId = parseInt(req.params.id);

  res.render("edit-post.ejs", {
    post: posts.find((post) => post.id === postId),
  });
});

app.post("/post/:id/edit/", (req, res) => {
  const postId = parseInt(req.params.id);
  let post = posts.find((post) => post.id === postId);
  post.title = req.body.title;
  post.content = req.body.post;

  res.redirect(`/post/${post.id}`);
});

// delete post
app.post("/post/:id/delete/", (req, res) => {
  const postId = parseInt(req.params.id);
  const postIndex = posts.findIndex((post) => post.id === postId);
  posts.splice(postIndex, 1);

  res.redirect("/");
});

// server listener
app.listen(port, (err) => {
  if (err) throw err;
  console.log(`Server running and listening to port ${port}.`);
});
