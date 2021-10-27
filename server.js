const express = require("express");
require("dotenv").config();
require("./db");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  "/public/myimagesupload",
  express.static(__dirname + "/public/myimagesupload")
);

app.use("/", require("./router/image_router"));

app.listen(3000, () => {
  console.log("App listening on port 3000!");
});
