import express from "express";
import axios from 'axios';

const app = express();

app.use(express.json());

app.all('/*', async (req, res) => {
    try {
      const { method, originalUrl, body, query } = req;

      console.log(process.env.OPENAI_API_KEY)
  
      const response = await axios({
        method,
        url: `https://api.openai.com${originalUrl}`,
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
        params: query,
        data: body,
      });
  
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});