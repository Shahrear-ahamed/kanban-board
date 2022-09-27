const express = require("express");
const jsonServer = require("json-server");
const auth = require("json-server-auth");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const app = express();

const router = jsonServer.router("kanbandb.json");
const middleware = jsonServer.defaults();

const rules = auth.rewriter({
  users: 640,
  teams: 660,
});

// /!\ Bind the router db to the app
app.db = router.db;

app.use(middleware);
app.use(cors());
app.use(rules);
app.use(auth);
app.use(router);

app.listen(PORT, () => {
  console.log("Server is running in Port " + PORT);
});
