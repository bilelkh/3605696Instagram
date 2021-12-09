const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const download = require("image-downloader");

const app = express();
const port = 3000;

const Instagram = require("instagram-web-api");
const username = "bilelkhadhraoui2";
const password = "Azerty123#";
const client = new Instagram({ username, password });
request = require("request");

app.use(express.static("public"));
app.use("/images", express.static("images"));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  res.setHeader("Cross-origin-Embedder-Policy", "require-corp");
  res.setHeader("Cross-origin-Opener-Policy", "same-origin");

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/api/instagram", async (req, res) => {
  client
    .login()
    .then(async () => {
      const result = await client
        .getUserByUsername({ username: req.query.username })
        .catch((err) => {
          console.log(err, err);
        });
      const options = {
        url: result.profile_pic_url_hd,
        dest: "./images",
      };
      const filename = await download
        .image(options)
        .then(({ filename }) => {
          return filename;
        })
        .catch((err) => console.log("err", err));
      res.send({ ...result, filename });
    })
    .catch((err) => {
      res.send(err);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
