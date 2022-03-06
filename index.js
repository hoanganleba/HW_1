const express = require("express");
const cors = require("cors");
const fileRoute = require("./routes/fileRoute");

const PORT = 8080;

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/files", fileRoute);

app.listen(PORT, () => {
  console.log("Listening on port: ", PORT);
});
