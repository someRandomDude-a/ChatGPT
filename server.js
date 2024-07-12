import express from 'express';
import dotenv from 'dotenv';
import OpenAI from 'openai';

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();
const port = 3000;

// Get the OpenAI API key from the environment variables
const apiKey = process.env.OPENAI_API_KEY; // DO NOT DIRECTLY ENTER YOUR KEY HERE!! USE dotenv!!!

// Check if the API key is provided
if (!apiKey) {
    throw new Error('You forgot to add the API key in the .env file.');
}

// Set up OpenAI configuration
const openai = new OpenAI({
    apiKey: apiKey // This is also the default, can be omitted
});

// Middleware to serve static files from the 'public' directory
app.use(express.static('public'));
// Middleware to parse JSON request bodies
app.use(express.json());

// Route to handle the generation of multiple choice questions
app.post('/generate', async (req, res) => {
    const prompt = req.body.prompt;

    try {
        const response = await openai.completions.create({
            model: "gpt-3.5-turbo-0125",
            prompt: `Make 5 multiple choice questions based on the following: ${prompt}`,
            max_tokens: 4096,
        });

        res.json(response.data);
    } catch (error) {
        if (error instanceof OpenAI.APIError) {
            console.error(`Status: ${error.status}`);
            console.error(`Message: ${error.message}`); // e.g. The authentication token you passed was invalid...
            console.error(`Code: ${error.code}`);
            console.error(`Type: ${error.type}`);
        } else {
            // Handle non-API errors
            console.error(error);
        }
    }
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
