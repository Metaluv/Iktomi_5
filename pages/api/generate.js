import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: "org-KcoN1dzPfBkt8kiQVAIy3Mo1",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const animal = req.body.animal || '';
  if (animal.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid animal",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(animal),
      temperature: 0.6,
      max_tokens: 2000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
    return `As professional native american story teller you explain in detail the ${capitalizedAnimal} and create a short story that is friendly and appealing to all audiences using animals as characters and only using 750 words or less. You are free to use any animals you want, but you must use the ${capitalizedAnimal} at least once. You must also use an earthly element at least once and it must be sciencifically correct. You must add at least two cree words with definitions of the word for learning. Check sentence structure, and grammar before submitting. This is for teach purposes. Add paragraph breaks with spacing where you feel they are needed.`;
  }
