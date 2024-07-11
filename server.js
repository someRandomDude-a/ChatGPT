import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env file
dotenv.config();

const app = express();
const port = 3000;

const apiKey = process.env.OPENAI_API_KEY; //DO NOT DIRECTLY ENTER YOUR KEY HERE!! USE dotenv!!!

if (!apiKey) {
    throw new Error('brooo you forgot to add the API key in the .env file.......');
}

// Set up OpenAI key configuration
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
            prompt: "Make 5 multiple choice questions based on the following:" ${prompt},
            max_tokens: 4096,
          });

        res.json(response.data);
    }
         catch (error) {
        if (error instanceof OpenAI.APIError) {
          console.error(error.status);  
          console.error(error.message); // e.g. The authentication token you passed was invalid...
          console.error(error.code);  
          console.error(error.type); 
        } else {
          // Non-API error
          console.error();(error);
        }
}})

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})

