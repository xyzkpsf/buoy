const express = require("express");
const axios = require("axios");
const bodyParser = require("body-parser");
const port = 3000;

const app = express();

const getData = async (sid, n) => {
  const res = await axios.get(
    `https://www.ndbc.noaa.gov/data/realtime2/${sid}.txt`
  );
  const textData = res.data;
  const arrData = textData.split("\n");
  const validData = arrData
    .slice(2)
    .map((d) => handleFormat(d))
    .filter((s) => filterFormat(s));
  validData.sort((s1, s2) => sortFormat(s1, s2));
  const formatedData = validData.map((d) => {
    return {
      time: `${d[0]}-${d[1]}-${d[2]}`,
      height: `${d[8]}`,
    };
  });
  return formatedData.slice(0, n);
};

app.get("/big-waves", async (req, res) => {
  const sid = req.query.sid;
  const n = req.query.n;
  if (n > 100) {
    res.status(500);
    res.send({ error: `n must be less than 100` });
    return;
  }
  try {
    const response = await getData(sid, n);
    res.send(response);
  } catch (e) {
    res.status(404);
    res.send({ error: `Can't find the sid` });
  }
});

const handleFormat = (s) => s.split(/  */);

const filterFormat = (s) => s[8] !== "MM";

const sortFormat = (s1, s2) => s2[8] - s1[8];

module.exports = app;
