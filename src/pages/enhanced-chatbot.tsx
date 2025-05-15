import { Avatar, Box, Button, Card, Flex, Heading, Progress, ScrollArea, Spinner, Text, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react";
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Loader from "./components/DotLoader/Loader";
interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function EnhancedChatbot() {
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);
    const [enhancedResponses, setEnhancedResponses] = useState<{ index: number, response: { isEnhanced: boolean, enhancedResponse: string } }[]>([]);
    const [enhancedLoading, setEnhancedLoading] = useState(false);
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);
        setMessages(prevMessages => [...prevMessages, { role: "user", content: input }]);
        const query = messages.map(msg => msg.role === "user" ? msg.content : "").join(" ") + " " + input;

        const response = await fetch('/api/pinecone/objective_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query, latestQuery: input, messages: messages }),
        });

        const reader = response.body?.getReader();
        const decoder = new TextDecoder("utf-8");
        let done = false;
        let currentResponse = "";
        setLoading(false);

        setMessages(prevMessages => [
            ...prevMessages,
            { role: "assistant", content: "" }
        ]);

        while (!done) {
            const { value, done: isDone } = await reader!.read();
            done = isDone;
            if (value) {
                const chunk = decoder.decode(value, { stream: true });
                currentResponse += chunk;

                setMessages(prevMessages => {
                    const lastMessageIndex = prevMessages.length - 1;
                    const lastMessage = prevMessages[lastMessageIndex];
                    if (lastMessage && lastMessage.role === "assistant") {
                        return [
                            ...prevMessages.slice(0, lastMessageIndex),
                            { ...lastMessage, content: currentResponse }
                        ];
                    }
                    return prevMessages;
                });
            }
        }

        const messageIndex = messages.length + 1;
        fetchEnhancedData(input, currentResponse, messageIndex);

        setInput("");
    };

    const fetchEnhancedData = async (query: string, newResponse: string, messageIndex: number) => {
        setEnhancedLoading(true);
        try {
            const response = await fetch('/api/pinecone/enhanced_response', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ query, response: newResponse }),
            });

            const enhancedData = await response.json();
            const parsedEnhancedData = JSON.parse(enhancedData.enhancedResponse);
            console.log("Parsed Enhanced Data", parsedEnhancedData);
            setEnhancedResponses(prev => [
                ...prev,
                { index: messageIndex, response: parsedEnhancedData }
            ]);
            console.log("Enhanced Responses", enhancedResponses);
            setEnhancedLoading(false);
        } catch (error) {
            console.error("Error fetching enhanced data:", error);
        }
    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
    }, [messages]);

    return (
        <div className={`flex flex-col items-center text-black justify-center min-h-screen w-screen h-screen p-2 md:p-4 lg:p-8 gap-4`}>
            <ScrollArea ref={scrollAreaRef} type="always" scrollbars="vertical" style={{ height: "100vh" }} className="text-white">
                <Box p="2" pr="8" className="px-2 md:px-20 lg:px-40 w-full">
                    <Heading size="4" mb="6" trim="start">
                        Powered by ShopperModel AI
                    </Heading>
                    <Flex direction="column" gap="4" className="w-full">
                        {messages.length === 0 && <div className="text-center text-white mt-10">Hello! How can I help you today?</div>}
                        {messages.map((msg, index) => (
                            <div className="mb-2 w-full" key={index}>
                                {msg.role === "user" && <Box className="flex flex-col items-end w-full md:pr-2 lg:pr-6">
                                    <Card>
                                        <Flex gap="3" align="center">
                                            <Box>
                                                <Text as="div" size="2" color="gray">
                                                    {msg.content}
                                                </Text>
                                            </Box>
                                        </Flex>
                                    </Card>
                                </Box>}
                                {msg.role === "assistant" && (
                                    <div className="p-2 rounded mt-2">
                                        <Markdown
                                            components={{
                                                pre: ({ node, ...props }) => <pre style={{ whiteSpace: 'pre-wrap' }} {...props} />,
                                                code: ({ node, ...props }) => <code style={{ whiteSpace: 'pre-wrap' }} {...props} />
                                            }}
                                            remarkPlugins={[remarkGfm]}
                                        >
                                            {msg.content}
                                        </Markdown>
                                        {enhancedResponses.find(er => er.index === index) && enhancedResponses.find(er => er.index === index)?.response.isEnhanced && (
                                            <div className="ml-4 mt-4">
                                                <Markdown
                                                    components={{
                                                        pre: ({ node, ...props }) => <pre style={{ whiteSpace: 'pre-wrap' }} {...props} />,
                                                        code: ({ node, ...props }) => <code style={{ whiteSpace: 'pre-wrap' }} {...props} />
                                                    }}
                                                    remarkPlugins={[remarkGfm]}
                                                >
                                                    {enhancedResponses.find(er => er.index === index)?.response.enhancedResponse}
                                                </Markdown>
                                            </div>
                                        )}
                                        {enhancedLoading && <Loader />}  
                                    </div>
                                )}
                            </div>
                        ))}
                        {loading && <Box width="100%">
                            <Progress color="gray" />
                        </Box>}
                    </Flex>
                </Box>
            </ScrollArea>
            <Flex direction="row" gap="3" className="w-full md:w-[80%] lg:w-[60%]" p="4" justify="center" align="center">
                <TextField.Root placeholder="Search the docs…" className="w-full rounded-full p-2" value={input} onChange={(e) => setInput(e.target.value)}>
                </TextField.Root>
                <Button className="w-[80px] h-[35px] rounded-full" variant="soft" onClick={handleSubmit}>
                    {loading ? <Spinner size="2" /> : "Send"}
                </Button>
            </Flex>
        </div>
    );
}