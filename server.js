const express = require('express')
const mongoose = require('mongoose')
const Article = require('./models/article')
const articleRouter = require('./routes/articles')
const methodOverride = require('method-override')
const app = express()

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/blog");
    console.log("database connected");
  } catch (err) {
    console.log(err);
  }
};

connectDB();

app.set("view engine", "ejs");
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: false }));
app.use("/articles", articleRouter);

app.get("/", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });
  res.render("articles/index", { articles: articles });
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});