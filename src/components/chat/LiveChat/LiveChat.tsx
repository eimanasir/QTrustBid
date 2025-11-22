import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Minimize2, User, Bot } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './LiveChat.module.css';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'support';
  timestamp: Date;
}

export const LiveChat: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hi! Welcome to QTrustBid support. How can I help you today?',
      sender: 'support',
      timestamp: new Date(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { user } = useAuth();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      text: message,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, newMessage]);
    setMessage('');

    // Simulate support response
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "Thanks for reaching out! I'll help you with that.",
        "Let me check that information for you.",
        "I understand your concern. Let me assist you.",
        "Great question! Here's what I can tell you...",
        "I'm here to help! Could you provide more details?",
      ];
      
      const supportMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responses[Math.floor(Math.random() * responses.length)],
        sender: 'support',
        timestamp: new Date(),
      };
      
      setMessages(prev => [...prev, supportMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const quickReplies = [
    'How do I place a bid?',
    'Property verification process',
    'Payment methods',
    'Contact seller',
  ];

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            className={styles.floatingButton}
            onClick={() => setIsOpen(true)}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <MessageCircle size={24} />
            <span className={styles.pulse} />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className={`${styles.chatWindow} ${isMinimized ? styles.minimized : ''}`}
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          >
            {/* Header */}
            <div className={styles.chatHeader}>
              <div className={styles.headerInfo}>
                <div className={styles.avatar}>
                  <Bot size={20} />
                </div>
                <div>
                  <h3>QTrustBid Support</h3>
                  <span className={styles.status}>
                    <span className={styles.statusDot} />
                    Online
                  </span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <button
                  className={styles.headerBtn}
                  onClick={() => setIsMinimized(!isMinimized)}
                >
                  <Minimize2 size={18} />
                </button>
                <button
                  className={styles.headerBtn}
                  onClick={() => setIsOpen(false)}
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Messages */}
            {!isMinimized && (
              <>
                <div className={styles.messagesContainer}>
                  <div className={styles.messages}>
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`${styles.message} ${styles[msg.sender]}`}
                      >
                        {msg.sender === 'support' && (
                          <div className={styles.messageAvatar}>
                            <Bot size={16} />
                          </div>
                        )}
                        <div className={styles.messageContent}>
                          <p>{msg.text}</p>
                          <span className={styles.messageTime}>
                            {msg.timestamp.toLocaleTimeString([], {
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </span>
                        </div>
                        {msg.sender === 'user' && (
                          <div className={styles.messageAvatar}>
                            <User size={16} />
                          </div>
                        )}
                      </div>
                    ))}
                    
                    {isTyping && (
                      <div className={`${styles.message} ${styles.support}`}>
                        <div className={styles.messageAvatar}>
                          <Bot size={16} />
                        </div>
                        <div className={styles.typingIndicator}>
                          <span />
                          <span />
                          <span />
                        </div>
                      </div>
                    )}
                    
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {messages.length === 1 && (
                    <div className={styles.quickReplies}>
                      <p className={styles.quickRepliesLabel}>Quick questions:</p>
                      {quickReplies.map((reply, index) => (
                        <button
                          key={index}
                          className={styles.quickReply}
                          onClick={() => {
                            setMessage(reply);
                            setTimeout(() => {
                              const form = document.querySelector(`.${styles.inputForm}`) as HTMLFormElement;
                              form?.requestSubmit();
                            }, 100);
                          }}
                        >
                          {reply}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Input */}
                <form className={styles.inputForm} onSubmit={handleSend}>
                  <input
                    type="text"
                    placeholder={user ? `Message as ${user.name}...` : 'Type your message...'}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={styles.input}
                  />
                  <button
                    type="submit"
                    className={styles.sendBtn}
                    disabled={!message.trim()}
                  >
                    <Send size={20} />
                  </button>
                </form>

                {/* Footer */}
                <div className={styles.chatFooter}>
                  <span>Powered by QTrustBid Support</span>
                </div>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
