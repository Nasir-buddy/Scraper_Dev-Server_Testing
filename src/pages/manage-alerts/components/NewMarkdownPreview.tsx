import React, { useRef } from 'react'
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Link } from '@radix-ui/themes';
import { HoverCard } from '@radix-ui/themes';
import { Keyword } from '../types';

const MarkdownPreview = ({ markdown, keywords = [] }: { markdown: string, keywords: Keyword[] }) => {
    console.log("MarkdownPreview keywords", keywords)
    const [ReactMarkdown, setReactMarkdown] = React.useState<any>(null);
    const [remarkGfm, setRemarkGfm] = React.useState<any>(null);
    const [rehypeRaw, setRehypeRaw] = React.useState<any>(null);
    const cacheRef = useRef<{ [key: string]: string }>({});

    React.useEffect(() => {
        import('react-markdown').then((module) => {
            setReactMarkdown(() => module.default);
        });
        import('remark-gfm').then((module) => {
            setRemarkGfm(() => module.default);
        });
        import('rehype-raw').then((module) => {
            setRehypeRaw(() => module.default);
        });
    }, []);

    const fetchKeywordDetail = async (keyword: Keyword) => {
        const cacheKey = keyword.doc_id;
        if (cacheRef.current[cacheKey]) {
            console.log(`Cache hit for keyword: ${keyword.matching_text}`);
            return { content: cacheRef.current[cacheKey] };
        }

        try {
            console.log("fetching keyword detail for", keyword);
            const response = await fetch(`/api/manage-alert-docs/get-data-for-id-and-level?level=${keyword.level}&id=${keyword.doc_id}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            cacheRef.current[cacheKey] = data.content;
            return data;
        } catch (error) {
            console.error('Error fetching keyword detail:', error);
            return null;
        }
    };

    const renderWithHoverCards = (text: string, keywords: Keyword[]) => {
        if (!ReactMarkdown || !remarkGfm || !rehypeRaw) return null;

        console.log("text", text);
        console.log("keywords", keywords);

        const processChildren = (children: React.ReactNode) => {
            return React.Children.map(children, (child) => {
                if (typeof child === "string") {
                    const sortedKeywords = [...keywords].sort(
                        (a, b) => b.matching_text.length - a.matching_text.length
                    );

                    let result: (string | JSX.Element)[] = [child];

                    sortedKeywords.forEach((keyword) => {
                        result = result.flatMap((segment) => {
                            if (typeof segment !== "string") return [segment];

                            const escapedKeyword = keyword.matching_text.replace(
                                /[.*+?^${}()|[\]\\]/g,
                                "\\$&"
                            );

                            const parts = segment.split(
                                new RegExp(`(${escapedKeyword})`, "gi")
                            );

                            return parts.map((part, index) => {
                                if (
                                    part.toLowerCase() === keyword.matching_text.toLowerCase()
                                ) {
                                    const [keywordDetail, setKeywordDetail] = React.useState<any>(null);
                                    const [loading, setLoading] = React.useState<boolean>(false);

                                    const handleMouseEnter = async () => {
                                        setLoading(true);
                                        const detail = await fetchKeywordDetail(keyword);
                                        setKeywordDetail(detail);
                                        setLoading(false);
                                    };

                                    return (
                                        <HoverCard.Root>
                                            <HoverCard.Trigger onMouseEnter={handleMouseEnter}>
                                                <Link className="text-highlight">{part}</Link>
                                            </HoverCard.Trigger>
                                            <HoverCard.Content maxWidth="750px" maxHeight="300px" className="overflow-y-auto">
                                                {loading ? (
                                                    <div className="loader">Loading...</div>
                                                ) : (
                                                    <MarkdownPreview markdown={keywordDetail?.content || ''} keywords={[]} />
                                                )}
                                            </HoverCard.Content>
                                        </HoverCard.Root>
                                    );
                                }
                                return part;
                            });
                        });
                    });

                    return result;
                }
                return child;
            });
        };

        return (
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={{
                    p: ({ children }: { children: React.ReactNode }) => (
                        <p className="whitespace-pre-wrap mb-4">
                            {processChildren(children)}
                        </p>
                    ),
                    ul: ({ children }: { children: React.ReactNode }) => (
                        <ul className="list-disc ml-6 mb-4">
                            {processChildren(children)}
                        </ul>
                    ),
                    ol: ({ children }: { children: React.ReactNode }) => (
                        <ol className="list-decimal ml-6 mb-4">
                            {processChildren(children)}
                        </ol>
                    ),
                    li: ({ children, ordered }: { children: React.ReactNode, ordered?: boolean }) => (
                        <li className="mb-2">
                            {processChildren(children)}
                        </li>
                    ),
                    h1: ({ children }: { children: React.ReactNode }) => (
                        <h1 className="text-2xl font-bold mb-4">
                            {processChildren(children)}
                        </h1>
                    ),
                    h2: ({ children }: { children: React.ReactNode }) => (
                        <h2 className="text-xl font-bold mb-3">
                            {processChildren(children)}
                        </h2>
                    ),
                    h3: ({ children }: { children: React.ReactNode }) => (
                        <h3 className="text-lg font-bold mb-2">
                            {processChildren(children)}
                        </h3>
                    ),
                    h4: ({ children }: { children: React.ReactNode }) => (
                        <h4 className="text-md font-bold mb-2">
                            {processChildren(children)}
                        </h4>
                    ),
                    h5: ({ children }: { children: React.ReactNode }) => (
                        <h5 className="text-sm font-bold mb-2">
                            {processChildren(children)}
                        </h5>
                    ),
                    h6: ({ children }: { children: React.ReactNode }) => (
                        <h6 className="text-xs font-bold mb-2">
                            {processChildren(children)}
                        </h6>
                    ),
                    strong: ({ children }: { children: React.ReactNode }) => (
                        <strong>
                            {processChildren(children)}
                        </strong>
                    ),
                    em: ({ children }: { children: React.ReactNode }) => (
                        <em>
                            {processChildren(children)}
                        </em>
                    ),
                    blockquote: ({ children }: { children: React.ReactNode }) => (
                        <div className="pl-4 mb-4 border-gray-300">
                            {processChildren(children)}
                        </div>
                    ),
                    code: ({ children }: { children: React.ReactNode }) => (
                        <code className="bg-gray-100 p-1 rounded">
                            {processChildren(children)}
                        </code>
                    ),
                    pre: ({ children }: { children: React.ReactNode }) => (
                        <pre className="bg-gray-100 p-2 rounded mb-4">
                            {processChildren(children)}
                        </pre>
                    ),
                    a: ({ children, href }: { children: React.ReactNode, href?: string }) => (
                        <a href={href} className="text-blue-500 underline">
                            {processChildren(children)}
                        </a>
                    ),
                }}
            >
                {text}
            </ReactMarkdown>
        );
    };

    if (!ReactMarkdown || !remarkGfm || !rehypeRaw) return null;

    return (
        <TooltipProvider>
            <div className="markdown-body" style={{ backgroundColor: 'transparent' }}>
                {renderWithHoverCards(markdown, keywords)}
            </div>
        </TooltipProvider>
    )
}

export default MarkdownPreview