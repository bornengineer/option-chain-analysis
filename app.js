const express = require("express");
const cors = require("cors"); // Import the cors package
const fs = require("fs");
const nse = require("./nse_lib");

const app = express();
const port = process.env.PORT || 3001;

app.use(
  cors({
    origin: ["http://localhost:3000", "http://127.0.0.1:5500"],
  })
);

app.use(express.static("public"));

nse.loadCookies();

app.get("/", (req, res) => res.redirect("/index.html"));

app.get("/chain", async (req, res) => {
  try {
    const indexName = req.query.index;
    const symbolName = req.query.symbol;

    let resp = await nse.getOptionChain(
      indexName ?? symbolName,
      indexName ? "index" : "symbol"
    );
    res.send(resp);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/symbols", async (req, res) => {
  try {
    let resp = await nse.getSymbols();
    console.log("resp3 :>> ", resp);
    res.send(resp);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
