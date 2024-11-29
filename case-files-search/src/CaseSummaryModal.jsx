import React from 'react';
import { X, FileText, Download } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

const SummaryDialogue = ({ 
  isOpen, 
  onClose, 
  caseId, 
  summary,
  onDownload 
}) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    if (onDownload) {
      onDownload(summary);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="
        relative w-full max-w-3xl 
        bg-white border border-gray-200 
        rounded-xl shadow-2xl 
        overflow-hidden
        max-h-[90vh] flex flex-col
      ">
        {/* Header */}
        <div className="
          flex justify-between items-center 
          px-6 py-4 border-b border-gray-200
          bg-gray-50
        ">
          <div className="flex items-center space-x-3">
            <FileText className="text-blue-600" size={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              Case Summary <span className="text-gray-500 text-base ml-2">(Case ID: {caseId})</span>
            </h2>
          </div>
          <div className="flex items-center space-x-3">
            {onDownload && (
              <button 
                onClick={handleDownload}
                className="
                  text-gray-600 hover:text-blue-600 
                  transition-colors duration-200
                  flex items-center space-x-2
                "
                title="Download Summary"
              >
                <Download size={20} />
                <span className="text-sm">Download</span>
              </button>
            )}
            <button 
              onClick={onClose} 
              className="
                text-gray-400 hover:text-gray-600 
                transition-colors duration-200
              "
              title="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="
          flex-grow overflow-y-auto 
          p-6 prose prose-lg 
          prose-headings:text-gray-900
          prose-a:text-blue-600 
          prose-a:no-underline 
          prose-a:font-semibold 
          hover:prose-a:text-blue-800
          prose-strong:text-gray-800
          prose-code:bg-gray-100 
          prose-code:text-red-600 
          prose-code:px-1.5 
          prose-code:py-0.5 
          prose-code:rounded 
          prose-code:text-sm
        ">
          {summary ? (
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={{
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneLight}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className="bg-gray-100 text-red-600 px-1.5 py-0.5 rounded text-sm" {...props}>
                      {children}
                    </code>
                  );
                },
                blockquote: ({node, ...props}) => (
                  <blockquote 
                    className="
                      border-l-4 border-blue-500 
                      pl-4 py-2 my-4 
                      bg-blue-50/50 
                      italic 
                      text-gray-700
                    " 
                    {...props} 
                  />
                ),
                table: ({node, ...props}) => (
                  <div className="overflow-x-auto">
                    <table 
                      className="
                        w-full 
                        border-collapse 
                        mb-4 
                        border 
                        border-gray-200
                      " 
                      {...props} 
                    />
                  </div>
                ),
                th: ({node, ...props}) => (
                  <th 
                    className="
                      bg-gray-100 
                      border border-gray-200 
                      px-4 py-2 
                      text-left 
                      font-semibold 
                      text-gray-700
                    " 
                    {...props} 
                  />
                ),
                td: ({node, ...props}) => (
                  <td 
                    className="
                      border border-gray-200 
                      px-4 py-2 
                      text-gray-800
                    " 
                    {...props} 
                  />
                )
              }}
            >
              {summary}
            </ReactMarkdown>
          ) : (
            <div className="flex justify-center items-center h-64">
              <div className="text-center">
                <div className="animate-spin mb-4 mx-auto w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full"></div>
                <p className="text-gray-600">Generating summary...</p>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="
          flex justify-end space-x-2 
          px-6 py-4 border-t border-gray-200
          bg-gray-50
        ">
          <button 
            onClick={onClose} 
            className="
              px-4 py-2 
              bg-gray-200 text-gray-800 
              rounded-md hover:bg-gray-300
              transition-colors duration-200
            "
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SummaryDialogue;