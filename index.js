import express from "express";
import axios from 'axios';

const app = express();

app.use(express.json());

app.all('/*', async (req, res) => {
    try {
      const { method, originalUrl, body, query, headers } = req;

      const response = await axios({
        method,
        url: `https://api.openai.com${originalUrl}`,
        headers: {
            "Content-Type": "application/json",
            "authorization": headers.authorization
        },
        params: query,
        data: body,
      });

      console.log('requestBody', body);
      console.log('responseBody', response.data)
  
      res.json(response.data);
    } catch (error) {
      console.error(JSON.stringify(error));
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});