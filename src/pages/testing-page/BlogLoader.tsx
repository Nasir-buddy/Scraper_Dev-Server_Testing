import React, { useEffect, useState } from 'react';
import HoverCard from './HoverCard';

export interface KeywordEntry {
    keyword: string;
    details: string;
    context: string;
}

interface BlogEntry {
    id: string;
    content: string;
    keywords: KeywordEntry[];
}

const BlogLoader: React.FC = () => {
    const [blogs, setBlogs] = useState<BlogEntry[]>([]);
    const [selectedKeywordDetails, setSelectedKeywordDetails] = useState<string | null>(null);

    // Define your data directly in the file
    const localData: BlogEntry[] = [
        {
            id: '1',
            content: 'This is a sample blog post with keyword1 and keyword2.',
            keywords: [
                { keyword: 'keyword1', details: 'This is a sample keyword one ', context: 'Sample context' },
                { keyword: 'keyword2', details: 'This is a sample keyword two', context: 'Sample context' }
            ]
        },
        // Add more blog entries as needed
    ];

    useEffect(() => {
        // Use the local data instead of fetching
        setBlogs(localData);
    }, []);

    const handleKeywordClick = (details: string) => {
        setSelectedKeywordDetails(details);
    };

    const renderContent = (content: string, keywords: KeywordEntry[]) => {
        const parts = content.split(new RegExp(`(${keywords.map(k => k.keyword).join('|')})`, 'g'));

        return parts.map((part, index) => {
            const keyword = keywords.find(k => k.keyword === part);
            if (keyword) {
                return (
                    <HoverCard key={index} content={keyword.details}>
                        {keyword.keyword}
                    </HoverCard>
                );
            }
            return part;
        });
    };

    return (
        <div>
            {blogs.map(blog => (
                <div key={blog.id}>
                    <h2>Blog ID: {blog.id}</h2>
                    <div>
                        {renderContent(blog.content, blog.keywords)}
                    </div>
                </div>
            ))}
            {selectedKeywordDetails && (
                <div>
                    <h3>Keyword Details</h3>
                    <p>{selectedKeywordDetails}</p>
                </div>
            )}
        </div>
    );
};

export default BlogLoader;