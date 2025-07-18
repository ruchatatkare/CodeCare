const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Check if API key is loaded
if (!process.env.GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found in environment variables');
  console.log('Please create a .env file with your API key');
  process.exit(1);
}

const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Gemini with API Key
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Women safety related keywords
const womenSafetyKeywords = [
  'safety', 'harassment', 'assault', 'emergency', 'help', 'danger', 'threat', 'violence',
  'stalking', 'abuse', 'domestic', 'sexual', 'rape', 'attack', 'kidnap', 'missing',
  'police', 'crime', 'report', 'incident', 'witness', 'victim', 'support', 'counseling',
  'hotline', 'refuge', 'shelter', 'protection', 'security', 'self-defense', 'precaution',
  'awareness', 'prevention', 'law', 'legal', 'rights', 'justice', 'court', 'evidence',
  'safe', 'unsafe', 'risk', 'vulnerable', 'women', 'girl', 'female', 'lady', 'mother',
  'sister', 'daughter', 'wife', 'girlfriend', 'woman', 'ladies', 'girls', 'feminist',
  'gender', 'discrimination', 'workplace', 'street', 'home', 'public', 'transport',
  'travel', 'night', 'alone', 'dark', 'crowd', 'stranger', 'unknown', 'suspicious',
  'emergency contact', 'sos', 'panic', 'alert', 'distress', 'trauma', 'mental health',
  'cyber', 'online', 'digital', 'privacy', 'data', 'location', 'tracking', 'app'
];

function isWomenSafetyRelated(message) {
  const lowerMessage = message.toLowerCase();
  return womenSafetyKeywords.some(keyword => lowerMessage.includes(keyword));
}

app.post('/api/gemini', async (req, res) => {
  const { message } = req.body;

  console.log('Received message:', message);

  if (!message) {
    return res.status(400).json({ reply: 'No message provided.' });
  }

  // Check if message is related to women's safety
  if (!isWomenSafetyRelated(message)) {
    return res.json({ 
      reply: "🚨 I'm a Women's Safety Assistant. I only help with safety, security, harassment, and protection topics. Ask me about women's safety! 💜" 
    });
  }

  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    console.log('Sending to Gemini...');
    
    // Add context to make responses more focused on women's safety
    const contextualPrompt = `You are a Women's Safety Assistant. Please provide helpful, accurate, and supportive information about women's safety. Keep your response focused on safety, security, and protection. 

IMPORTANT: Keep your response SHORT and CONCISE - maximum 2-3 sentences or 50 words. Be direct and to the point while being helpful.

User question: ${message}`;
    
    const result = await model.generateContent(contextualPrompt);
    const response = await result.response.text();
    
    console.log('Gemini response received');
    res.json({ reply: response });
  } catch (err) {
    console.error('Gemini API Error:', err.message);
    res.status(500).json({ reply: 'Error generating response from Gemini: ' + err.message });
  }
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'Server is running' });
});

app.listen(port, () => {
  console.log(`✅ Gemini server running on http://localhost:${port}`);
});