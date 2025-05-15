import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import 'github-markdown-css'
// import './MarkdownPreview.css'
const Markdownpreview = ({ content }: { content: string }) => {
    return (
        <div className="markdown-body" style={{ padding: '1em', backgroundColor: 'black' }}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
    )
}

export default Markdownpreview