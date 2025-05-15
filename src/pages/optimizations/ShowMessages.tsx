import { Card, Text } from "@radix-ui/themes";

import { Flex } from "@radix-ui/themes";
// import MarkdownPreview from "./Markdown-Preview";
import ReactMarkdown from "react-markdown";
import remarkGfm from 'remark-gfm'
// import 'github-markdown-css'
type Message = {
    role: string;
    content: string;
}
const ShowMessage = ({ messages }: { messages: Message[] }) => {
    return messages.map((message, index) => {
        if (message.role === "user") {
            const assistantMessage = messages[index + 1];
            return (
                <Flex direction="column" gap="2" mt={index === 0 ? '6' : '4'} key={index}>
                    <Card className="rounded-xl mt-4 p-4 font-play w-fit ml-auto bg-[#4D4D4D]">
                        <Text size="4" trim="start" className="text-[#FFFFFF] font-play font-normal text-center text-sm tracking-[0%]">
                            {message.content}
                        </Text>
                    </Card>
                    <Card key={index} className="bg-black rounded-2xl mt-4 p-4 font-play">
                        <Flex direction="column" mt="4" gap="4" className="text-sm">
                            {assistantMessage?.role === "assistant" && (
                                // <Markdown components={components}>{assistantMessage.content}</Markdown>
                                <div className="markdown-body" style={{ padding: '1em', backgroundColor: 'black' }}>
                                    <ReactMarkdown remarkPlugins={[remarkGfm]} >{assistantMessage.content}</ReactMarkdown>
                                </div>
                            )}
                        </Flex>
                    </Card>
                </Flex>
            );
        }
        return null;
    })
}

export default ShowMessage;