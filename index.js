import express from "express";
import axios from 'axios';

const app = express();

app.use(express.json());

app.all('/*', async (req, res) => {
    try {
      const { method, originalUrl, body, query, headers } = req;

      console.log(process.env.OPENAI_API_KEY)
  
      const response = await axios({
        method,
        url: `https://api.openai.com${originalUrl}`,
        headers,
        params: query,
        data: body,
      });

      console.log(response.data)
  
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