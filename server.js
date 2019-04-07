const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
const app = express();
const mongoURI = require("./config/keys");
app.use(bodyParser.json());

const items = require("./routers/api/items");
mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

app.use("/api/items", items);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("Port openend at", port);
});
