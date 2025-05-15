import React from 'react'
import MarkdownPreview from './NewMarkdownPreview'

const ShowDocsContent = ({ title, content }: { title: string, content: string }) => {
    return (
        <div>
            <p className="font-medium">{title}</p>
            <MarkdownPreview markdown={content} keywords={[]} />
        </div>
    )
}

export default ShowDocsContent