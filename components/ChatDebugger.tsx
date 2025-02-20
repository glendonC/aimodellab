"use client";

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot } from 'lucide-react';
import { TypeAnimation } from 'react-type-animation';
import { cn } from '@/lib/utils';

type Message = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
};

const RESPONSE_VARIATIONS = {
  layer: [
    "This layer performs feature extraction using a combination of weighted connections. It processes input data through activation functions to identify important patterns.",
    "Looking at the architecture, this layer acts as a transformation unit. It applies non-linear operations to extract higher-level features from the input.",
    "Based on my analysis, this layer serves as a feature detector. It uses learned weights to identify specific patterns in the data stream.",
  ],
  performance: [
    "The model's performance is influenced by several factors. The key bottleneck appears to be in the feature extraction pipeline, specifically in layers 2 and 3.",
    "I've analyzed the execution profile, and the main performance constraints are in the data preprocessing and feature transformation stages.",
    "Looking at the computational graph, the performance bottleneck is primarily in the dense layers, where matrix multiplications are most intensive.",
  ],
  architecture: [
    "The model uses a sophisticated architecture with multiple interconnected layers. Each layer is specialized for different aspects of feature detection and transformation.",
    "This neural network implements a hierarchical structure where each layer builds upon the features detected by previous layers.",
    "The architecture follows a deep learning paradigm with progressive feature abstraction through multiple processing stages.",
  ],
};

export default function ChatDebugger({ modelFile, powerMode }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const getRandomResponse = (type: keyof typeof RESPONSE_VARIATIONS) => {
    const variations = RESPONSE_VARIATIONS[type];
    return variations[Math.floor(Math.random() * variations.length)];
  };

  const generateResponse = async (question: string) => {
    const lowerQuestion = question.toLowerCase();
    let response = "";

    if (lowerQuestion.includes("layer")) {
      response = getRandomResponse("layer");
    } else if (lowerQuestion.includes("performance") || lowerQuestion.includes("slow")) {
      response = getRandomResponse("performance");
    } else if (lowerQuestion.includes("architecture") || lowerQuestion.includes("structure")) {
      response = getRandomResponse("architecture");
    } else {
      response = "Based on my analysis of the model's architecture and behavior, " + getRandomResponse("architecture");
    }

    return response;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    const response = await generateResponse(input);
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
      }]);
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className={cn(
      "rounded-xl border bg-card h-[400px] flex flex-col transition-all duration-300",
      powerMode ? "border-cyan-500/50 shadow-lg shadow-cyan-500/20" : "border-border"
    )}>
      <div className={cn(
        "p-4 border-b transition-colors duration-300",
        powerMode ? "border-cyan-500/50" : "border-border"
      )}>
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Bot className={cn(
            "w-5 h-5 transition-colors duration-300",
            powerMode && "text-cyan-400"
          )} />
          AI Assistant
        </h2>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={cn(
                  "max-w-[80%] rounded-lg p-3",
                  message.role === 'user'
                    ? powerMode
                      ? "bg-cyan-500 text-white ml-4"
                      : "bg-primary text-primary-foreground ml-4"
                    : powerMode
                      ? "bg-gray-900/60 text-white backdrop-blur-sm mr-4 border border-cyan-500/20"
                      : "bg-muted text-foreground mr-4"
                )}
              >
                {message.role === 'assistant' ? (
                  <TypeAnimation
                    sequence={[message.content]}
                    wrapper="p"
                    speed={50}
                    cursor={false}
                  />
                ) : (
                  <p>{message.content}</p>
                )}
              </div>
            </motion.div>
          ))}
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-start"
            >
              <div className={cn(
                "rounded-lg p-3 mr-4",
                powerMode
                  ? "bg-gray-900/60 text-white backdrop-blur-sm border border-cyan-500/20"
                  : "bg-muted text-foreground"
              )}>
                <div className="flex space-x-2">
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-bounce",
                    powerMode ? "bg-cyan-400" : "bg-primary"
                  )} style={{ animationDelay: '0ms' }} />
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-bounce",
                    powerMode ? "bg-cyan-400" : "bg-primary"
                  )} style={{ animationDelay: '150ms' }} />
                  <div className={cn(
                    "w-2 h-2 rounded-full animate-bounce",
                    powerMode ? "bg-cyan-400" : "bg-primary"
                  )} style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className={cn(
        "p-4 border-t transition-colors duration-300",
        powerMode ? "border-cyan-500/50" : "border-border"
      )}>
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about the model..."
            className={cn(
              "flex-1 bg-background rounded-lg px-4 py-2 border focus:outline-none focus:ring-2 transition-all duration-300",
              powerMode
                ? "border-cyan-500/50 focus:ring-cyan-500/50"
                : "border-border focus:ring-primary"
            )}
          />
          <button
            type="submit"
            className={cn(
              "px-4 py-2 rounded-lg transition-colors",
              powerMode
                ? "bg-cyan-500 text-white hover:bg-cyan-600"
                : "bg-primary text-primary-foreground hover:bg-primary/90"
            )}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
    </div>
  );
}