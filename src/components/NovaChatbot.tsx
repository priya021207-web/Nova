import React, { useState, useRef, useEffect } from 'react';
import { 
  MessageSquare, 
  X, 
  Send, 
  Sparkles, 
  RotateCcw, 
  Minimize2, 
  Maximize2,
  ShoppingBag,
  ExternalLink,
  Bot
} from 'lucide-react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';

interface ChatMessage {
  id: string;
  sender: 'user' | 'bot' | 'system';
  text: string;
  timestamp: string;
  suggestedAction?: {
    label: string;
    action: () => void;
  };
  productCards?: Product[];
}

const N8N_WEBHOOK_URL = 'https://priya0212.app.n8n.cloud/webhook/89290d10-3589-459d-93ac-59b06cb97be7/chat';

export const NovaChatbot: React.FC<{ onSelectProduct?: (product: Product) => void }> = ({ onSelectProduct }) => {
  const { products, user, cart, cartTotal } = useShop();

  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => {
    const saved = localStorage.getItem('nova_chat_session_id');
    if (saved) return saved;
    const newId = `session_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
    localStorage.setItem('nova_chat_session_id', newId);
    return newId;
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => [
    {
      id: 'welcome-1',
      sender: 'bot',
      text: "Welcome to NOVA Concierge. I can help you discover products, check specs, track orders, or answer questions about our curated drops. How may I assist you today?",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
      inputRef.current?.focus();
    }
  }, [isOpen, messages, isLoading]);

  // Extract products mentioned in bot response for rich rendering
  const findReferencedProducts = (text: string): Product[] => {
    const matched: Product[] = [];
    const lower = text.toLowerCase();
    products.forEach(p => {
      if (lower.includes(p.name.toLowerCase()) || (p.subtitle && lower.includes(p.subtitle.toLowerCase()))) {
        if (!matched.some(m => m.id === p.id)) {
          matched.push(p);
        }
      }
    });
    return matched.slice(0, 2);
  };

  const sendMessage = async (customText?: string) => {
    const textToSend = customText || inputMessage;
    if (!textToSend.trim() || isLoading) return;

    const userMsgId = `user_${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    if (!customText) setInputMessage('');
    setIsLoading(true);

    try {
      // Send message to n8n webhook
      const payload = {
        message: textToSend.trim(),
        chatInput: textToSend.trim(), // common n8n AI chat trigger standard
        sessionId: sessionId,
        action: 'sendMessage',
        context: {
          userName: user?.name || 'Guest Discoverer',
          userEmail: user?.email || '',
          cartCount: cart.length,
          cartTotal: cartTotal,
          currentStoreUrl: window.location.origin
        }
      };

      const response = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*'
        },
        body: JSON.stringify(payload)
      });

      let botText = '';

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await response.json();
        // Handle n8n standard output formats (output, text, message, response, or raw array)
        if (typeof data === 'string') {
          botText = data;
        } else if (data.output) {
          botText = typeof data.output === 'string' ? data.output : JSON.stringify(data.output);
        } else if (data.text) {
          botText = data.text;
        } else if (data.message) {
          botText = data.message;
        } else if (data.response) {
          botText = data.response;
        } else if (Array.isArray(data) && data[0]) {
          botText = data[0].output || data[0].text || data[0].message || JSON.stringify(data[0]);
        } else {
          botText = JSON.stringify(data);
        }
      } else {
        botText = await response.text();
      }

      if (!botText.trim()) {
        botText = "I've received your query through the NOVA system. How else may I assist with your discovery?";
      }

      const foundCards = findReferencedProducts(botText);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: botText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        productCards: foundCards.length > 0 ? foundCards : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      console.warn('n8n webhook error, using graceful concierge fallback:', error);
      
      // Intelligent fallback in case n8n webhook workflow is inactive or CORS-restricted
      const queryLower = textToSend.toLowerCase();
      let fallbackReply = "I am connected to the NOVA Concierge system. ";
      
      if (queryLower.includes('shipping') || queryLower.includes('delivery')) {
        fallbackReply += "We offer Free Express Air Shipping on all orders above ₹999 (24–48 hour priority delivery with zero carbon footprint). Orders below ₹999 incur a flat ₹99 fee.";
      } else if (queryLower.includes('return') || queryLower.includes('refund')) {
        fallbackReply += "All NOVA orders come with a 14-day doorstep return guarantee with instant refunds and zero hassle pickup.";
      } else if (queryLower.includes('discount') || queryLower.includes('coupon') || queryLower.includes('code')) {
        fallbackReply += "You can use code 'NOVA10' for 10% off orders above ₹1,999, or 'FIRST500' for ₹500 off your first purchase above ₹2,499!";
      } else if (queryLower.includes('watch') || queryLower.includes('aurora')) {
        fallbackReply += "The Aurora Smart Watch (₹14,999) features Grade 5 Aerospace Titanium, Sapphire Crystal glass, and up to 14 days of battery life.";
      } else if (queryLower.includes('headphone') || queryLower.includes('echo')) {
        fallbackReply += "The Echo Wireless Headphones (₹12,499) offer active acoustic cancelation, 40mm Beryllium drivers, and 45 hours of playback.";
      } else if (queryLower.includes('drop') || queryLower.includes('limited')) {
        fallbackReply += "Our current drop is the NOVA AIR — Limited Edition (₹18,499), strictly capped at 500 numbered units worldwide with forged carbon fiber.";
      } else {
        fallbackReply += "I'm ready to answer any questions about our curated acoustics, lifestyle objects, sizes, materials, or delivery status.";
      }

      const foundCards = findReferencedProducts(fallbackReply);

      const botMsg: ChatMessage = {
        id: `bot_${Date.now()}`,
        sender: 'bot',
        text: fallbackReply,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        productCards: foundCards.length > 0 ? foundCards : undefined
      };

      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: 'welcome-fresh',
        sender: 'bot',
        text: "Conversation refreshed. Ask me about any product, order, or styling question.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  const quickPrompts = [
    "What are your best sellers?",
    "Tell me about the NOVA Air drop",
    "What is your shipping policy?",
    "Do you have any discount codes?"
  ];

  return (
    <>
      {/* Floating Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] text-white shadow-2xl transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center gap-2.5 group cursor-pointer border border-white/20"
          aria-label="Open AI Concierge Chatbot"
        >
          <div className="relative">
            <MessageSquare className="w-5 h-5" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 rounded-full border-2 border-[#7C3AED] animate-pulse" />
          </div>
          <span className="text-xs font-mono font-bold tracking-wider uppercase pr-1 hidden sm:inline-block">
            Ask NOVA AI
          </span>
        </button>
      )}

      {/* Chat Window Container */}
      {isOpen && (
        <div
          className={`fixed z-50 transition-all duration-300 flex flex-col overflow-hidden bg-white/95 dark:bg-[#121316]/95 backdrop-blur-2xl border border-black/10 dark:border-white/10 shadow-2xl rounded-3xl ${
            isExpanded
              ? 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[540px] h-[calc(100vh-80px)] sm:h-[650px]'
              : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-[calc(100vw-32px)] sm:w-[400px] h-[520px]'
          } animate-in slide-in-from-bottom-5 duration-200`}
        >
          {/* Header */}
          <div className="px-5 py-4 bg-gradient-to-r from-slate-900 to-[#7C3AED] text-white flex items-center justify-between shadow-md">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-white/15 backdrop-blur-md border border-white/20 flex items-center justify-center text-white">
                <Bot className="w-5 h-5 text-violet-200" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="font-display font-bold text-sm tracking-tight">NOVA AI Concierge</h3>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </div>
                <p className="text-[10px] font-mono text-violet-200 flex items-center gap-1">
                  <span>Powered by n8n Agent</span>
                  <span>•</span>
                  <span>Active</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-white/80">
              <button
                onClick={handleClearHistory}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                title="Reset conversation"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsExpanded(prev => !prev)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors hidden sm:block"
                title={isExpanded ? "Collapse" : "Expand"}
              >
                {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-white hover:bg-white/10 rounded-lg transition-colors ml-1"
                title="Close chat"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs font-sans">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} space-y-1.5`}
              >
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-slate-400 dark:text-zinc-500 px-1">
                  <span>{msg.sender === 'user' ? 'You' : 'NOVA AI'}</span>
                  <span>•</span>
                  <span>{msg.timestamp}</span>
                </div>

                <div
                  className={`p-3.5 rounded-2xl max-w-[85%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-[#7C3AED] text-white rounded-tr-xs shadow-md'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 rounded-tl-xs border border-black/5 dark:border-white/5'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{msg.text}</p>

                  {/* Rich Product Recommendation Cards */}
                  {msg.productCards && msg.productCards.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-black/10 dark:border-white/10 space-y-2">
                      <div className="text-[10px] font-mono uppercase text-[#7C3AED] dark:text-[#A78BFA] font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        <span>Recommended Product</span>
                      </div>
                      {msg.productCards.map(prod => (
                        <div
                          key={prod.id}
                          onClick={() => {
                            if (onSelectProduct) onSelectProduct(prod);
                          }}
                          className="flex items-center gap-3 p-2 bg-white dark:bg-zinc-900 rounded-xl border border-black/5 dark:border-white/10 cursor-pointer hover:border-[#7C3AED] transition-all"
                        >
                          <img
                            src={prod.images[0]}
                            alt={prod.name}
                            referrerPolicy="no-referrer"
                            className="w-11 h-11 rounded-lg object-cover"
                          />
                          <div className="flex-1 min-w-0">
                            <div className="font-semibold text-slate-900 dark:text-white truncate">
                              {prod.name}
                            </div>
                            <div className="font-mono text-[11px] text-[#7C3AED] font-bold">
                              ₹{prod.price.toLocaleString('en-IN')}
                            </div>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}

            {/* Typing Loader */}
            {isLoading && (
              <div className="flex items-center gap-2 p-3 bg-zinc-100 dark:bg-zinc-800 rounded-2xl rounded-tl-xs max-w-[120px] text-slate-400">
                <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 rounded-full bg-[#7C3AED] animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts Bar */}
          {messages.length <= 2 && (
            <div className="px-4 py-2 border-t border-black/5 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {quickPrompts.map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => sendMessage(prompt)}
                  className="px-3 py-1 rounded-full bg-white dark:bg-zinc-800 border border-black/10 dark:border-white/10 hover:border-[#7C3AED] text-[11px] text-slate-600 dark:text-zinc-300 whitespace-nowrap transition-colors cursor-pointer"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          {/* Input Box */}
          <div className="p-3 sm:p-4 bg-white dark:bg-zinc-900 border-t border-black/5 dark:border-white/10">
            <form
              onSubmit={e => {
                e.preventDefault();
                sendMessage();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                placeholder="Ask about design, orders, discounts..."
                value={inputMessage}
                onChange={e => setInputMessage(e.target.value)}
                disabled={isLoading}
                className="flex-1 px-4 py-2.5 bg-zinc-100 dark:bg-zinc-800 border border-black/5 dark:border-white/10 rounded-full text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#7C3AED]"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim() || isLoading}
                className="p-2.5 rounded-full bg-[#7C3AED] hover:bg-[#6D28D9] disabled:opacity-40 text-white transition-all cursor-pointer shadow-md"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2 px-1 font-mono">
              <span>Webhook: n8n.cloud</span>
              <span>Encrypted SSL</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
