content = """import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bot, X, Send, Loader2 } from 'lucide-react';
import { Logo } from './Logo';

type Message = {
  id: string;
  role: 'user' | 'model';
  text: string;
};

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: 'Sat Shri Akal! Main M Forex AI haan. Tusi trading ya live market baare kujh vi puchh sakde ho. Main internet ton vi information search kar sakda haan!'
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), role: 'user', text: input.trim() };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Pass previous messages excluding the welcome message if we want to save tokens, 
      // but passing all history is good for context.
      const history = messages.filter(m => m.id !== 'welcome').map(m => ({ role: m.role, text: m.text }));
      
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.text,
          history: history
        })
      });

      if (!response.ok) {
        throw new Error('API Error');
      }

      const data = await response.json();
      
      const modelMessage: Message = {
        id: Date.now().toString() + 'm',
        role: 'model',
        text: data.text
      };
      
      setMessages(prev => [...prev, modelMessage]);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: Date.now().toString() + 'e',
        role: 'model',
        text: "Maaf karna, main thoda network error face kar reha haan. Kripya baad vich try karo."
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-gold-600 to-gold-500 px-5 py-3 font-bold text-brand-black shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-shadow hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] md:bottom-8 md:right-8"
      >
        <Bot className="h-6 w-6" />
        <span className="hidden sm:inline">🤖 M FOREX AI</span>
      </motion.button>

      {/* Main Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed inset-0 z-50 flex w-full flex-col overflow-hidden bg-brand-dark sm:inset-auto sm:bottom-24 sm:right-8 sm:h-[650px] sm:w-[450px] sm:rounded-3xl sm:border sm:border-slate-800 sm:shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-700/50 bg-brand-black p-4 shrink-0">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gold-500/10">
                  <Logo />
                </div>
                <div>
                  <h3 className="font-display font-bold text-white tracking-wide">M FOREX AI</h3>
                  <p className="text-xs text-gold-400">Live Trading Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-800/50 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Chat Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl ${
                      msg.role === 'user'
                        ? 'bg-gold-500 text-brand-black rounded-tr-sm'
                        : 'bg-slate-800/80 text-slate-200 border border-slate-700/50 rounded-tl-sm'
                    }`}
                  >
                    {/* Render simple formatting for markdown-like text from Gemini */}
                    <div 
                      className="whitespace-pre-wrap text-sm" 
                      dangerouslySetInnerHTML={{ 
                        __html: msg.text
                          .replace(/\\*\\*(.*?)\\*\\*/g, '<strong>$1</strong>')
                          .replace(/\\*(.*?)\\*/g, '<em>$1</em>')
                      }} 
                    />
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-slate-800/80 border border-slate-700/50 rounded-2xl rounded-tl-sm p-4">
                    <Loader2 className="w-5 h-5 text-gold-500 animate-spin" />
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
            
            {/* Input Area */}
            <div className="p-4 bg-brand-black border-t border-slate-700/50">
              <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Kujh vi pucho..."
                  className="flex-1 bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-gold-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-gold-500 hover:bg-gold-400 text-brand-black p-3 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
              <div className="text-center mt-2">
                <span className="text-[10px] text-slate-500">M Forex AI live data search kar sakda hai par kadi vi financial advice nahi dinda.</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
"""

with open('src/components/AIChatbot.tsx', 'w') as f:
    f.write(content)
