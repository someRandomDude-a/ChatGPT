import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
    throw new Error('brooo you forgot to add the API key in the .env file.......');
}

// Set up OpenAI configuration
const openai = new OpenAI({
    apiKey: apiKey // This is also the default, can be omitted
  });

app.use(express.static('public'));
app.use(express.json());

app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response =  await openai.completions.create({
            model: "gpt-3.5-turbo-0125",
            prompt: "This story begins",
            max_tokens: 30,
          });

        res.json(response.data);
    }
         catch (error) {
        if (error instanceof OpenAI.APIError) {
          console.error(error.status);  // e.g. 401
          console.error(error.message); // e.g. The authentication token you passed was invalid...
          console.error(error.code);  // e.g. 'invalid_api_key'
          console.error(error.type);  // e.g. 'invalid_request_error'
        } else {
          // Non-API error
          console.log(error);
        }
}})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

