import { Avatar, Box, Button, Card, Flex, Heading, Progress, ScrollArea, Spinner, Text, TextArea, TextField } from "@radix-ui/themes";
import { useEffect, useRef, useState } from "react"; // Add this import
import Markdown from 'react-markdown'
interface Message {
    role: "user" | "assistant";
    content: string;
}

export default function Home() {
    const [input, setInput] = useState(""); // Add state for input
    const [messages, setMessages] = useState<Message[]>([]); // Add state for messages
    const [loading, setLoading] = useState(false);
    // const [response, setResponse] = useState("");
    // const [request, setRequest] = useState("");
    const scrollAreaRef = useRef<HTMLDivElement>(null); // Create a ref for the ScrollArea
    const handleSubmit = async (e: any) => { // Change to async function
        e.preventDefault();
        setLoading(true);
        console.log("input", input);
        setMessages(prevMessages => [...prevMessages, { role: "user", content: input }]);
        // setRequest(input)
        // setResponse("")
        const query = messages.map(msg => msg.role === "user" ? msg.content : "").join(" ") + " " + input;

        const response = await fetch('/api/pinecone/chat_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query, latestQuery: input, messages: messages }),
        });
        const responseBody = await response.json();
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: responseBody.data }]);

        setInput(""); // Clear input field
        setLoading(false);

    };

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight; // Scroll to the bottom
        }
    }, [messages]); // Run effect when messages change
    return (
        <div
            className={`flex flex-col items-center text-black justify-center min-h-screen w-screen h-screen p-2 md:p-4 lg:p-8 gap-4`}
        >
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
                                {msg.role === "assistant" && <div className="p-2 rounded mt-2">{<Markdown>{msg.content}</Markdown>}</div>}
                            </div>
                        ))}
                        {loading && <Box width="100%">
                            <Progress color="gray" />
                        </Box>}
                    </Flex>
                </Box>
            </ScrollArea>
            <Flex direction="row" gap="3" className="w-full md:w-[80%] lg:w-[60%]" p="4" justify="center" align="center">
                {/* <TextArea className="w-full rounded-full p-2" placeholder="Search the docs…" value={input} onChange={(e) => setInput(e.target.value)} /> */}
                <TextField.Root placeholder="Search the docs…" className="w-full rounded-full p-2" value={input} onChange={(e) => setInput(e.target.value)}>
                </TextField.Root>
                <Button className="w-[80px] h-[35px] rounded-full" variant="soft" onClick={handleSubmit}>
                    {loading ? <Spinner size="2" /> : "Send"}
                </Button>
            </Flex>

        </div>
    );
}