import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import TurndownService from 'turndown';
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
const Editor = ({ value, setValue }: { value: string, setValue: (value: string) => void }) => {
    // Initialize Turndown for conversion
    const turndownService = new TurndownService({
        headingStyle: 'atx', // Use # for headings
        bulletListMarker: '-', // Use - for lists
    });

    // Handle paste event
    const handlePaste = async (event: React.ClipboardEvent<HTMLDivElement>) => {
        event.preventDefault();

        // Get the pasted rich text (HTML) from clipboard
        const pastedHtml = event.clipboardData.getData('text/html') || event.clipboardData.getData('text/plain');
        console.log("pastedHtml", pastedHtml);
        // Convert HTML to Markdown
        const markdownText = turndownService.turndown(pastedHtml);
        console.log("markdownText", markdownText);
        // Update state with converted Markdown
        setValue(value + markdownText);
    };
    return (
        <div className={`MarkDownEditor`}>
            {/* <MDEditor
                value={value}
                onChange={(data) => setValue(data || '')}
                style={{ height: '500px' }}
                onPaste={handlePaste}
            /> */}
            <MdEditor
                value={value}
                onChange={(data) => setValue(data.text || '')}
                style={{ height: '400px' }}
                renderHTML={(text) => {
                    return <div>{text}</div>
                }}
                view={{ menu: true, md: true, html: false }}
                plugins={[
                    'header', 'font-bold', 'font-italic', 'font-underline', 
                    'list-unordered', 'list-ordered', 'block-quote', 
                    'link', 'image', 'clear'
                ]}
            />
        </div>
    );
}

export default Editor;