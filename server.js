const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const config = require("config");
const mongoURI = config.get("mongoURI");
app.use(express.json());

mongoose.Promise = global.Promise;
mongoose
  .connect(mongoURI, {
    useNewUrlParser: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

app.use("/api/items", require("./routers/api/items"));
app.use("/api/users", require("./routers/api/users"));

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
