import * as dotenv from 'dotenv';
import express from 'express';
import cohere from 'cohere-ai';
import { readFile } from 'fs/promises';
import cors from 'cors';

dotenv.config();

const { defaultPreferences } = JSON.parse(
  await readFile(
    new URL('./default-examples.json', import.meta.url),
  ),
);

cohere.init(process.env.COHERE_API_TOKEN);

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*',
}));

app.post('/post', async (req, res) => {
  try {
    const { text, userPreferences } = req.body;
    const examples = Array.isArray(userPreferences) && userPreferences.length > 0 ? [...defaultPreferences, ...userPreferences] : defaultPreferences;

    const { body } = await cohere.classify({
      model: 'large',
      inputs: [text],
      examples,
    });

    res.status(200).send({
      result: body?.classifications[0]?.prediction,
      confidence: body?.classifications[0]?.confidence,
    });
  } catch (error) {
    res.status(500);
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});