import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkBreaks from 'remark-breaks';

const MarkdownRenderer = ({ content }: { content: string }) => {
  const formattedContent = content.replace(/\n/g, '  \n'); // Add two spaces before new lines
  return (
    <ReactMarkdown
      children={formattedContent}
    />
  );
};

export default MarkdownRenderer;