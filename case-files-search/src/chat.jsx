import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { 
  ArrowUpIcon, 
  ShieldIcon, 
  SparklesIcon, 
  LoaderIcon 
} from 'lucide-react';

const LegalChatPage = () => {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [streamedResponse, setStreamedResponse] = useState('');
  const messagesEndRef = useRef(null);
  const controllerRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, streamedResponse]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    // Add user message
    const userMessage = { type: 'user', text: query };
    setMessages(prev => [...prev, userMessage]);
    
    // Clear input and reset streaming state
    setQuery('');
    setStreamedResponse('');
    
    // Set loading state
    setIsLoading(true);

    // Cancel any existing request
    if (controllerRef.current) {
      controllerRef.current.abort();
    }

    // Create new abort controller
    controllerRef.current = new AbortController();

    try {
      // Make streaming API call
      const response = await axios.post(
        'http://localhost:8000/legal-analysis-stream/', 
        { query }, 
        {
          signal: controllerRef.current.signal,
          responseType: 'stream'
        }
      );

      // Handle streaming response
      const reader = response.data.getReader();
      const decoder = new TextDecoder();

      const readStream = async () => {
        const { done, value } = await reader.read();
        
        if (done) {
          // Finalize streaming response
          setMessages(prev => [
            ...prev.slice(0, -1), 
            { type: 'bot', text: streamedResponse }
          ]);
          setStreamedResponse('');
          setIsLoading(false);
          return;
        }

        const chunk = decoder.decode(value, { stream: true });
        setStreamedResponse(prev => prev + chunk);
        
        // Continue reading
        readStream();
      };

      // Add initial bot message placeholder
      setMessages(prev => [...prev, { type: 'bot', text: '' }]);
      
      // Start streaming
      readStream();

    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Error fetching legal analysis:', error);
        const errorMessage = { 
          type: 'bot', 
          text: 'Sorry, there was an error processing your request.' 
        };
        setMessages(prev => [...prev, errorMessage]);
      }
      setIsLoading(false);
    }
  };

  // Cancel ongoing stream if component unmounts
  useEffect(() => {
    return () => {
      if (controllerRef.current) {
        controllerRef.current.abort();
      }
    };
  }, []);

  // Markdown rendering components
  const MarkdownComponents = {
    code({ node, inline, className, children, ...props }) {
      const match = /language-(\w+)/.exec(className || '');
      return !inline && match ? (
        <SyntaxHighlighter
          style={oneLight}
          language={match[1]}
          PreTag="div"
          className="rounded-lg my-4"
          {...props}
        >
          {String(children).replace(/\n$/, '')}
        </SyntaxHighlighter>
      ) : (
        <code 
          className="
            bg-gray-100 text-red-600 
            px-1.5 py-0.5 rounded 
            text-sm font-mono
          " 
          {...props}
        >
          {children}
        </code>
      );
    },
    h1: ({node, ...props}) => (
      <h1 
        className="
          text-2xl font-bold 
          text-slate-900 
          mb-4 
          border-b pb-2
        " 
        {...props} 
      />
    ),
    h2: ({node, ...props}) => (
      <h2 
        className="
          text-xl font-semibold 
          text-slate-800 
          mb-3 
          mt-4
        " 
        {...props} 
      />
    ),
    a: ({node, ...props}) => (
      <a 
        className="
          text-blue-600 
          hover:text-blue-800 
          underline
        " 
        target="_blank" 
        rel="noopener noreferrer" 
        {...props} 
      />
    ),
    p: ({node, ...props}) => (
      <p 
        className="
          text-slate-700 
          mb-4 
          leading-relaxed
        " 
        {...props} 
      />
    ),
    ul: ({node, ...props}) => (
      <ul 
        className="
          list-disc 
          pl-5 
          mb-4 
          text-slate-700
        " 
        {...props} 
      />
    ),
    ol: ({node, ...props}) => (
      <ol 
        className="
          list-decimal 
          pl-5 
          mb-4 
          text-slate-700
        " 
        {...props} 
      />
    ),
    blockquote: ({node, ...props}) => (
      <blockquote 
        className="
          border-l-4 border-blue-500 
          pl-4 py-2 my-4 
          bg-blue-50/50 
          italic 
          text-slate-700
        " 
        {...props} 
      />
    ),
    table: ({node, ...props}) => (
      <div className="overflow-x-auto mb-4">
        <table 
          className="
            w-full 
            border-collapse 
            border 
            border-slate-200
          " 
          {...props} 
        />
      </div>
    ),
    th: ({node, ...props}) => (
      <th 
        className="
          bg-slate-100 
          border border-slate-200 
          px-4 py-2 
          text-left 
          font-semibold 
          text-slate-700
        " 
        {...props} 
      />
    ),
    td: ({node, ...props}) => (
      <td 
        className="
          border border-slate-200 
          px-4 py-2 
          text-slate-800
        " 
        {...props} 
      />
    )
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-3xl bg-white shadow-2xl rounded-3xl overflow-hidden border border-slate-200">
        {/* Chat Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <ShieldIcon className="w-10 h-10 text-white" strokeWidth={2} />
            <div>
              <h1 className="text-2xl font-bold text-white">Legallytic AI</h1>
            </div>
          </div>
          <SparklesIcon className="w-8 h-8 text-yellow-300" />
        </div>

        {/* Chat Messages */}
        <div className="h-[600px] overflow-y-auto p-6 space-y-4 bg-slate-50">
          {/* Welcome Message */}
          {messages.length === 0 && (
            <div className="flex justify-start mb-4">
              <div className="max-w-[80%] bg-white p-5 rounded-2xl shadow-md text-slate-700 border border-slate-100">
                <p className="font-medium">Welcome to Legallytic</p>
                <p className="text-sm text-slate-500 mt-2">
                  I'm here to help you with legal queries related to the Indian Penal Code. 
                  Ask me anything, and I'll provide clear, concise legal insights.
                </p>
              </div>
            </div>
          )}

          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'} fade-in`}
            >
              <div 
                className={`
                  max-w-[80%] p-4 rounded-2xl shadow-md
                  ${msg.type === 'user' 
                    ? 'bg-gradient-to-br from-blue-500 to-indigo-600 text-white' 
                    : 'bg-white text-slate-800 border border-slate-100'}
                  transition-all duration-300 ease-in-out
                  prose prose-sm
                `}
              >
                {msg.type === 'bot' && isLoading && index === messages.length - 1 
                  ? (streamedResponse || (
                    <div className="flex items-center space-x-2">
                      <LoaderIcon className="w-5 h-5 animate-spin" />
                      <span>Analyzing your query...</span>
                    </div>
                  ))
                  : msg.type === 'bot' ? (
                    <ReactMarkdown 
                      remarkPlugins={[remarkGfm]}
                      components={MarkdownComponents}
                    >
                      {msg.text}
                    </ReactMarkdown>
                  ) : (
                    msg.text
                  )}
              </div>
            </div>
          ))}
          
          {/* Ref for auto-scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <form onSubmit={handleSubmit} className="p-6 bg-white border-t border-slate-100">
          <div className="flex space-x-4">
            <input 
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Enter your legal query..."
              className="flex-grow p-4 rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white px-6 py-3 rounded-xl 
                         hover:from-blue-600 hover:to-indigo-700 
                         transition-all duration-300 
                         disabled:opacity-50 flex items-center justify-center shadow-md hover:shadow-lg"
            >
              <ArrowUpIcon className="w-5 h-5" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LegalChatPage;