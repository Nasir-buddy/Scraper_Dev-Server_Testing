import * as Tooltip from '@radix-ui/react-tooltip';
import React, { useState } from 'react';
import HoverCard from './HoverCard';
import keywordsData from './keywords.json'; // Import the JSON file
import ReactMarkdown from 'react-markdown';

interface KeywordEntry {
    id: number;
    keyword: string;
    details: string;
    context: string;
    instanceId: number;
}

const BlogForm: React.FC = () => {
    const [content, setContent] = useState('');
    const [keywords, setKeywords] = useState<KeywordEntry[]>([]);
    const [newKeyword, setNewKeyword] = useState('');
    const [newDetails, setNewDetails] = useState('');
    const [newContext, setNewContext] = useState('');
    const [keywordIdCounter, setKeywordIdCounter] = useState(1);

    const handleAddKeyword = () => {
        if (newKeyword && newDetails) {
            const newKeywordEntry: KeywordEntry = {
                id: keywordIdCounter,
                keyword: newKeyword,
                details: newDetails,
                context: newContext,
                instanceId: Date.now()
            };
            setKeywords([...keywords, newKeywordEntry]);
            setNewKeyword('');
            setNewDetails('');
            setNewContext('');
            setKeywordIdCounter(keywordIdCounter + 1);
        }
    };

    const handleSelectPrebuiltKeyword = (selectedKeyword: string) => {
        const keywordEntry = keywordsData.keywords.find(k => k.keyword === selectedKeyword);
        if (keywordEntry) {
            setNewKeyword(keywordEntry.keyword);
            setNewDetails(keywordEntry.details);
            setNewContext(keywordEntry.context);
        }
    };

    const renderContent = (content: string, keywords: KeywordEntry[]) => {
        const parts = content.split(/(\s+)/); // Split by whitespace to preserve spaces

        return parts.map((part, index) => {
            const keyword = keywords.find(k => k.keyword === part);
            if (keyword) {
                return (
                    <HoverCard key={`${keyword.instanceId}-${index}`} content={keyword.details}>
                        {keyword.keyword}
                    </HoverCard>
                );
            }
            return part;
        });
    };

    const handleSubmit = () => {
        const blogEntry = {
            content,
            keywords
        };
        console.log('Blog Entry:', blogEntry);
        // You can add logic here to send the blogEntry to a server or update state elsewhere
    };

    const preprocessMarkdown = (text: string) => {
        return text.replace(/\n/g, '\n\n');
    };

    return (
        <div className="max-w-2xl mx-auto p-4 bg-white rounded-md shadow-sm text-black">
            <h2 className="text-2xl font-bold mb-4">Create Blog Entry</h2>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Content:</label>
                <textarea
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-black text-white"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={4}
                />
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Add Keywords</h3>
                <div className="grid grid-cols-1 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Select Pre-built Keyword:</label>
                        <select
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-black text-white"
                            onChange={(e) => handleSelectPrebuiltKeyword(e.target.value)}
                        >
                            <option value="">Select a keyword</option>
                            {keywordsData.keywords.map((keyword) => (
                                <option key={keyword.keyword} value={keyword.keyword}>
                                    {keyword.keyword}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Keyword:</label>
                        <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-black text-white"
                            value={newKeyword}
                            onChange={(e) => setNewKeyword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Details:</label>
                        <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-black text-white"
                            value={newDetails}
                            onChange={(e) => setNewDetails(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Context:</label>
                        <input
                            type="text"
                            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-black text-white"
                            value={newContext}
                            onChange={(e) => setNewContext(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Details (Markdown):</label>
                        <div className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm bg-black text-white">
                            <ReactMarkdown>{preprocessMarkdown(newDetails)}</ReactMarkdown>
                        </div>
                    </div>
                </div>
                <button
                    className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                    onClick={handleAddKeyword}
                >
                    Add Keyword
                </button>
            </div>
            <div className="mb-4">
                <h3 className="text-xl font-semibold mb-2">Keywords</h3>
                <ul className="list-disc pl-5">
                    {keywords.map((keyword) => (
                        <li key={keyword.id} className="text-gray-700">
                            {keyword.keyword}: {keyword.details} ({keyword.context})
                        </li>
                    ))}
                </ul>
            </div>
            <h3 className="text-xl font-semibold mb-2">Preview</h3>
            <div className="p-4 border border-gray-300 rounded-md shadow-sm">
                {renderContent(content, keywords)}
                <ReactMarkdown>{preprocessMarkdown(newDetails)}</ReactMarkdown>
            </div>
            <button
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                onClick={handleSubmit}
            >
                Submit Blog Entry
            </button>
        </div>
    );
};

export default BlogForm;