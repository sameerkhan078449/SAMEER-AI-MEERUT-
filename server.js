// SAMEER AI MEERUT - Server.js
// 🔐 Backend code to securely connect to OpenAI

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Configuration, OpenAIApi } = require('openai');

const app = express();
const port = 3000;

// ✅ Middlewares
app.use(cors());
app.use(bodyParser.json());

// ✅ Secure OpenAI API Configuration (Tumhara real API key yahan hai)
const configuration = new Configuration({
  apiKey: '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'
});

const openai = new OpenAIApi(configuration);

// ✅ API Route to handle chatbot requests
app.post('/api/chat', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const reply = response.data.choices[0].message.content;
    res.json({ reply });

  } catch (error) {
    console.error('❌ Error from OpenAI:', error.message);
    res.status(500).json({ reply: '⚠️ AI error: Unable to respond. Please try again.' });
  }
});

// ✅ Start server
app.listen(port, () => {
  console.log(`✅ SAMEER AI server is live at http://localhost:${port}`);
});
