const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

router.post("/", (req, res) => {
  try {
    let filename = req.body.filename;
    let content = req.body.content;

    if (!filename) {
      return res
        .status(400)
        .send({ message: "Please specify filename parameter" });
    }

    if (!content) {
      return res
        .status(400)
        .send({ message: "Please specify content parameter" });
    }

    if (!content && !filename) {
      return res.status(400).send({ message: "Please specify parameter" });
    }

    if (filename.split(".").pop() === " ") {
      return res.status(400).send({ message: "Please specify extensions" });
    }

    let writer = fs.createWriteStream("files/" + filename);
    writer.write(content);

    return res.status(200).send({ message: "File created successfully" });
  } catch (error) {
    return res.status(500).send("Internal server error: ", error);
  }
});

router.get("/", (req, res) => {
  try {
    const files = fs.readdirSync("./files/");
    return res.status(200).send({ message: "Success", files: files });
  } catch (error) {
    return res.status(500).send("Internal server error: ", error);
  }
});

router.get("/:filename", (req, res) => {
  try {
    if (fs.existsSync("files/" + req.params.filename)) {
      const content = fs.readFileSync("./files/" + req.params.filename, 'utf8');
      return res
        .status(200)
        .send({
          message: "Success",
          filename: req.params.filename,
          content: content,
          extension: path.extname(req.params.filename) 
        });
    } else {
      return res.status(200).send({
        message: `No file with '${req.params.filename}' filename found`,
      });
    }
  } catch (error) {
    return res.status(500).send("Internal server error: ", error);
  }
});

module.exports = router;
