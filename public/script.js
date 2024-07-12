document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('promptForm');
    const promptTextarea = document.getElementById('prompt');
    const outputDiv = document.getElementById('output');

    // Add event listener to handle form submission
    form.addEventListener('submit', async (event) => {
        event.preventDefault(); // Prevent the form from submitting the default way
        await generateElements();
    });

    // Add event listener to handle Ctrl+Enter key press
    promptTextarea.addEventListener('keydown', (event) => {
        if (event.ctrlKey && event.key === 'Enter') {
            event.preventDefault(); // Prevent the default action for Ctrl+Enter
            form.requestSubmit(); // Programmatically submit the form
        }
    });

    // Function to send the prompt to the server and display the response
    async function generateElements() {
        const prompt = promptTextarea.value;
        
        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ prompt: prompt })
            });

            const data = await response.json();

            // Clear the output div
            outputDiv.innerHTML = '';

            // Add the generated text as a new element
            const generatedText = document.createElement('p');
            generatedText.textContent = data.choices[0].text.trim();
            outputDiv.appendChild(generatedText);
        } catch (error) {
            console.error('Error generating elements:', error);
        }
    }
});
