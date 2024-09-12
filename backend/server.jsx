const express = require("express");

const app = express();
app.use(express.json());
app.use(cors());

const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello world");
});

app.listen(port, () => {
  console.log(`Example app listening at port ${port}`);
});

