"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, X, Paperclip, Loader2, Sparkles, Leaf } from "lucide-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import { useAuth } from "@/lib/auth-context";

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  imageUrl?: string;
  timestamp: Date;
}

const SUGGESTED_PROMPTS = [
  "Why are my tomato leaves turning yellow?",
  "How do I treat powdery mildew naturally?",
  "What's the NPK ratio for optimal corn growth?",
  "Best practices for organic pest control",
  "How to improve soil quality naturally?",
  "Signs of nitrogen deficiency in plants",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      const newHeight = Math.min(textareaRef.current.scrollHeight, 200); // Max height 200px
      textareaRef.current.style.height = newHeight + 'px';
    }
  }, [input]);

  const handleSuggestedPrompt = (prompt: string) => {
    setInput(prompt);
    textareaRef.current?.focus();
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setSelectedImage(result);
        setImagePreview(result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSend = async () => {
    if ((!input.trim() && !selectedImage) || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input || "Please analyze this image.",
      imageUrl: selectedImage || undefined,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    const imageData = selectedImage;
    setSelectedImage(null);
    setImagePreview(null);
    setIsLoading(true);

    // Create assistant message placeholder
    const assistantId = (Date.now() + 1).toString();
    const assistantMessage: Message = {
      id: assistantId,
      role: 'assistant',
      content: '',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, assistantMessage]);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: userMessage.content,
          imageData: imageData,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const reader = response.body?.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = '';

      if (reader) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split('\n');

          for (const line of lines) {
            if (line.startsWith('data: ')) {
              const data = line.slice(6);
              if (data === '[DONE]') {
                break;
              }
              try {
                const parsed = JSON.parse(data);
                if (parsed.content) {
                  accumulatedContent += parsed.content;
                  setMessages(prev => 
                    prev.map(msg => 
                      msg.id === assistantId 
                        ? { ...msg, content: accumulatedContent }
                        : msg
                    )
                  );
                }
              } catch (e) {
                // Skip invalid JSON
              }
            }
          }
        }
      }
    } catch (error) {
      console.error("Error getting AI response:", error);
      setMessages(prev => 
        prev.map(msg => 
          msg.id === assistantId 
            ? { ...msg, content: "I'm sorry, I encountered an error. Please try again." }
            : msg
        )
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-32">
        <div className="max-w-3xl mx-auto px-4 pt-8">
          {/* Welcome Header - Only show when no messages */}
          {messages.length === 0 && (
            <div className="text-center mb-12 animate-in fade-in slide-in-from-top duration-700">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl mb-6 shadow-lg">
                <Sparkles className="h-10 w-10 text-white" />
              </div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                AgriSight AI Assistant
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Your expert agricultural advisor powered by Gemini AI
              </p>
              
              {/* Suggested Prompts */}
              <div className="mb-8">
                <p className="text-sm font-medium text-gray-500 mb-4">Try asking:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-w-2xl mx-auto">
                  {SUGGESTED_PROMPTS.map((prompt, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestedPrompt(prompt)}
                      className="group text-left p-4 bg-white border-2 border-gray-200 rounded-2xl hover:border-green-500 hover:bg-green-50 transition-all duration-200 shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-start gap-3">
                        <Leaf className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-medium text-gray-700 group-hover:text-green-900">
                          {prompt}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Messages */}
          {messages.map((message) => (
            <div
              key={message.id}
              className="mb-6 animate-in fade-in slide-in-from-bottom duration-500"
            >
              <div className={`flex items-start gap-4 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center shadow-md ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-blue-600' 
                    : 'bg-gradient-to-br from-green-500 to-emerald-600'
                }`}>
                  {message.role === 'user' ? (
                    <User className="h-5 w-5 text-white" />
                  ) : (
                    <Sparkles className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-2">
                  {message.imageUrl && (
                    <div className="mb-3">
                      <img 
                        src={message.imageUrl} 
                        alt="Uploaded" 
                        className="max-w-md rounded-2xl border-2 border-gray-200 shadow-lg"
                      />
                    </div>
                  )}
                  
                  {message.role === 'user' ? (
                    <div className="inline-block max-w-lg">
                      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-3xl px-5 py-3 shadow-md">
                        <p className="whitespace-pre-wrap leading-relaxed">{message.content}</p>
                      </div>
                    </div>
                  ) : (
                    <div className="prose prose-green max-w-none">
                      {message.content ? (
                        <MarkdownRenderer content={message.content} />
                      ) : (
                        <div className="flex items-center gap-2 text-gray-500 bg-gray-100 rounded-2xl px-4 py-3 inline-flex">
                          <Loader2 className="h-4 w-4 animate-spin" />
                          <span className="text-sm">Thinking...</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Floating Input Area */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white via-white to-transparent pb-6 pt-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-3 bg-white rounded-2xl p-3 shadow-lg border-2 border-gray-200 inline-block">
              <div className="relative">
                <img 
                  src={imagePreview} 
                  alt="Preview" 
                  className="max-w-xs rounded-xl"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600 shadow-lg transition-all hover:scale-110"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}

          {/* Input Box */}
          <div className="bg-white rounded-3xl shadow-2xl border-2 border-gray-200 p-2">
            <div className="flex items-end gap-2">
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                onChange={handleImageSelect}
                className="hidden"
              />
              
              <Button
                variant="ghost"
                size="icon"
                onClick={() => fileInputRef.current?.click()}
                disabled={isLoading}
                className="flex-shrink-0 rounded-2xl hover:bg-gray-100"
                title="Attach image"
              >
                <Paperclip className="h-5 w-5 text-gray-600" />
              </Button>

              <textarea
                ref={textareaRef}
                placeholder="Ask anything about farming, plant diseases, or crop management..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                disabled={isLoading}
                rows={1}
                className="flex-1 px-4 py-3 bg-transparent resize-none focus:outline-none text-gray-900 placeholder-gray-400 max-h-48 overflow-y-auto"
                style={{ minHeight: '44px' }}
              />

              <Button
                onClick={handleSend}
                disabled={(!input.trim() && !selectedImage) || isLoading}
                className="flex-shrink-0 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 shadow-md px-6 h-11"
              >
                {isLoading ? (
                  <Loader2 className="h-5 w-5 animate-spin" />
                ) : (
                  <>
                    <Send className="h-5 w-5 mr-2" />
                    <span className="font-medium">Send</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-3 text-center">
            Press <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-600">Enter</kbd> to send • <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-600">Shift + Enter</kbd> for new line
          </p>
        </div>
      </div>
    </div>
  );
}
