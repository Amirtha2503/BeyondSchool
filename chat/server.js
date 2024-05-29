// node --version # Should be >= 18
// npm install @google/generative-ai express

const express = require('express');
const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require('@google/generative-ai');
const dotenv = require('dotenv').config()

const app = express();
const port = process.env.PORT || 3000;
app.use(express.json());
const MODEL_NAME = "gemini-pro";
const API_KEY = process.env.API_KEY;

async function runChat(userInput) {
  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: MODEL_NAME,
    systemInstruction: "You are a chabot designed for an educational app called Beyond school for them to learn everthing that is typically not taught in schools like mental health, financial literacy, home repair, sex education, cooking, disaster preparedness and enivornment awareness. The chatbot is for children, so make it child safe and keep the words and explanations to be simple. Make sure to give simple and innovative explanation with pointers and stories\n",
   });

  const generationConfig = {
    temperature: 0.9,
    topK: 1,
    topP: 1,
    maxOutputTokens: 1000,
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_LOW_AND_ABOVE,
    },
  ];
  

  const chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [
      {
        role: "user",
        parts: [
          {text: "explain more about good touch and bad touch"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "It's important to understand that **everyone has the right to feel safe and comfortable.**  \n\n**Good touch** is a touch that makes you feel happy and safe. It's a touch that is **appropriate** and **makes you feel good**.  For example, a hug from your parents or a high-five from your friend.\n\n**Bad touch** is a touch that makes you feel uncomfortable or unsafe. It's a touch that is **not appropriate**"},
        ],
      },
      {
        role: "user",
        parts: [
          {text: "what is climate change"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Imagine Earth is like a big, warm blanket.  Climate change is when that blanket gets a little too warm!  \n\nIt happens when the air around Earth gets warmer than usual. This can happen because we burn too much fuel in our cars and factories. It's like when you use a hairdryer - it makes the air hot! \n\nWhen the air gets warmer, it can cause problems like:\n\n* **Melting ice caps:** Imagine a big ice cube melting! The ice caps at the North and South Pole are melting because of the warmer air, and that can cause the sea level to rise.\n* **More extreme weather:** We might have more storms, floods, and droughts because of the changing climate.\n\nBut don't worry, we can help! We can do things like:\n\n* **Plant trees:** Trees help to clean the air and make the Earth cooler.\n* **Recycle:** Recycling helps to reduce the amount of pollution we make.\n* **Use less energy:** Turn off the lights when you leave a room and try to use less water! \n\nWe can all do our part to keep Earth cool and healthy! \n"},
        ],
      },
    ],
  });


  const result = await chat.sendMessage(userInput);
  const response = result.response;
  return response.text();
}

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/chat.html');
});
app.get('/loader.gif', (req, res) => {
  res.sendFile(__dirname + '/loader.gif');
});
app.post('/chat', async (req, res) => {
  try {
    const userInput = req.body?.userInput;
    console.log('incoming /chat req', userInput)
    if (!userInput) {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    const response = await runChat(userInput);
    res.json({ response });
  } catch (error) {
    console.error('Error in chat endpoint:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
