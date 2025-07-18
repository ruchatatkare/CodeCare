import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      text: "👋 Hi! I'm your Women's Safety Assistant. Ask me about safety tips, emergencies, or reporting incidents! 🛡️",
      sender: 'bot'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    
    const currentInput = input;
    setInput('');
    setIsLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/gemini', {
        message: currentInput,
      });

      // Add bot response
      const botMessage: Message = { text: res.data.reply, sender: 'bot' };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error('Error:', err);
      const errorMessage: Message = { 
        text: 'Error contacting server. Please try again.', 
        sender: 'bot' 
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <div className="fixed bottom-4 right-4 z-50">
          <button
            onClick={() => setIsOpen(true)}
            className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110 animate-pulse"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3.5l-2.5 2.5z"/>
            </svg>
          </button>
          
          {/* Tooltip */}
          <div className="absolute bottom-16 right-0 bg-gray-800 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 hover:opacity-100 transition-opacity">
            💜 Need Safety Help?
          </div>
        </div>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-white border shadow-xl rounded-xl p-4 z-50 animate-slideIn">
          {/* Header */}
          <div className="flex items-center justify-between mb-3 pb-2 border-b">
            <div className="flex items-center">
              <span className="text-purple-600 font-bold text-sm">👮‍♀️ Women's Safety Assistant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-500 hover:text-gray-700 text-lg font-bold"
              >
                ×
              </button>
            </div>
          </div>
          
          <div className="h-64 overflow-y-auto mb-2 border-b pb-2">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`text-sm mb-2 p-2 rounded ${
                  msg.sender === 'user' 
                    ? 'bg-purple-100 text-purple-800 ml-4' 
                    : 'bg-pink-50 text-gray-800 mr-4 border-l-4 border-purple-400'
                }`}
              >
                <span className="font-semibold">
                  {msg.sender === 'user' ? '👤 You:' : '🛡️ Assistant:'}
                </span>
                <div className="mt-1">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="text-sm mb-2 p-2 rounded bg-pink-50 text-gray-800 mr-4 border-l-4 border-purple-400">
                <span className="font-semibold">🛡️ Assistant:</span>
                <div className="mt-1">Thinking...</div>
              </div>
            )}
          </div>
          
          {/* Quick Action Buttons */}
          <div className="flex flex-wrap gap-1 mb-2">
            <button 
              className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded hover:bg-red-200"
              onClick={() => setInput('Emergency help needed')}
            >
              🚨 Emergency
            </button>
            <button 
              className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded hover:bg-blue-200"
              onClick={() => setInput('Safety tips for women')}
            >
              💡 Safety Tips
            </button>
            <button 
              className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded hover:bg-green-200"
              onClick={() => setInput('How to report harassment')}
            >
              📝 Report
            </button>
          </div>
          
          <div className="flex">
            <input
              type="text"
              className="flex-1 border rounded-l px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Ask about women's safety..."
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !isLoading && handleSend()}
              disabled={isLoading}
            />
            <button
              className="bg-purple-600 text-white px-4 rounded-r hover:bg-purple-700 disabled:opacity-50"
              onClick={handleSend}
              disabled={isLoading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        
        .animate-slideIn {
          animation: slideIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
};

export default Chatbot;