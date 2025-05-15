import React from 'react'
interface Keyword {
    keyword: string;
    detail: string;
    context: string;
}
import { TooltipProvider } from '@radix-ui/react-tooltip';
import { Link } from '@radix-ui/themes';
import { HoverCard } from '@radix-ui/themes';
const MarkdownPreview = ({ markdown, keywords }: { markdown: string, keywords: Keyword[] }) => {
    const [ReactMarkdown, setReactMarkdown] = React.useState<any>(null);
    const [remarkGfm, setRemarkGfm] = React.useState<any>(null);
    const [rehypeRaw, setRehypeRaw] = React.useState<any>(null);
    const [expandedKeywords, setExpandedKeywords] = React.useState<Set<string>>(new Set());

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

    const toggleKeywordDetail = (keyword: string) => {
        setExpandedKeywords((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(keyword)) {
                newSet.delete(keyword);
            } else {
                newSet.add(keyword);
            }
            return newSet;
        });
    };

    const renderWithExpandableDetails = (text: string, keywords: Keyword[]) => {
        if (!ReactMarkdown || !remarkGfm || !rehypeRaw) return null;

        const processChildren = (children: React.ReactNode) => {
            return React.Children.map(children, (child) => {
                if (typeof child === "string") {
                    const sortedKeywords = [...keywords].sort(
                        (a, b) => b.keyword.length - a.keyword.length
                    );

                    let result: (string | JSX.Element)[] = [child];

                    sortedKeywords.forEach((keyword) => {
                        result = result.flatMap((segment) => {
                            if (typeof segment !== "string") return [segment];

                            const escapedKeyword = keyword.keyword.replace(
                                /[.*+?^${}()|[\]\\]/g,
                                "\\$&"
                            );

                            const parts = segment.split(
                                new RegExp(`(${escapedKeyword})`, "gi")
                            );

                            return parts.map((part, index) => {
                                if (
                                    part.toLowerCase() === keyword.keyword.toLowerCase()
                                ) {
                                    return (
                                        <React.Fragment key={index}>
                                            <span
                                                onClick={() => toggleKeywordDetail(keyword.keyword)}
                                                className="cursor-pointer text-blue-500 underline"
                                            >
                                                {part}
                                            </span>
                                            {expandedKeywords.has(keyword.keyword) && (
                                                <div className="mt-2 mb-2">
                                                    <MarkdownPreview markdown={keyword.detail} keywords={[]} />
                                                </div>
                                            )}
                                        </React.Fragment>
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
                    li: ({ children }: { children: React.ReactNode }) => (
                        <li className="list-disc mb-2">
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
                        <blockquote className="border-l-4 border-gray-300 pl-4 mb-4">
                            {processChildren(children)}
                        </blockquote>
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
            <div className="markdown-body">
                {renderWithExpandableDetails(markdown, keywords)}
            </div>
        </TooltipProvider>
    )
}

export default MarkdownPreview