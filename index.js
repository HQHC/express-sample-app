const express = require('express');
const request = require('request');

const app = express();

app.use('/', (req, res) => {
  const url = `https://api.openai.com${req.url}`;
  req.pipe(request(url)).pipe(res);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Proxy server listening on port ${port}`);
});
