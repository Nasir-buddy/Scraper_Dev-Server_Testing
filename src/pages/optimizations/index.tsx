import React, { useEffect, useRef, useState } from "react";
import { Box, Button, Card, Flex, ScrollArea, Spinner, Text } from "@radix-ui/themes";
// import VerticalNav from "../components/VerticalNav";
// import { ArrowRightIcon } from "@radix-ui/react-icons";
import { PlusIcon } from "@radix-ui/react-icons";
// import HomeHeader from "../components/HomeHeader";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/router";
// import Markdown from 'react-markdown'
import MarkdownPreview from "../manage-alerts/components/NewMarkdownPreview";
import OptimizationFooter from "./OptimizationFooter";
import OptimizationButton from "./OptimizationButton";
import OptimizationHeader from "./OptimizationHeader";
import ShowMessage from "./ShowMessages";
import OptimizationLayout from "./OptimizationLayout";
import { AlertType } from "../../schemas/alert-schemas/Alerts";
type Message = {
    role: string;
    content: string;
}
// const components = {
//     li: (props: React.ComponentPropsWithoutRef<'li'>) => (
//         <li style={{ marginLeft: '0.5em', fontFamily: 'Play' }} {...props} />
//     ),
// };

const Optimizations = () => {
    const [alertData, setAlertData] = useState<AlertType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const { alert } = router.query;
    console.log("alert", alert)
    const { user } = useUser();

    console.log("alertData", alertData)
    const [expandedQuestion, setExpandedQuestion] = useState<string[]>([]);
    const handleFollowUpQuestionClick = (questionId: string, alertId: string) => {
        setExpandedQuestion((prev) => [...prev, questionId]);
        setTimeout(() => {
            const questionElement = document.getElementById(`question-${questionId}`);
            if (questionElement) {
                questionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }, 0);
    };
    const [input, setInput] = useState(""); // Add state for input
    const [messages, setMessages] = useState<Message[]>([]); // Add state for messages
    const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredAlerts, setFilteredAlerts] = useState(alertData ? [alertData] : []); // State for filtered alerts
    const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to control popover visibility

    useEffect(() => {
        const fetchAlertData = async () => {
            try {
                const response = await fetch(`/api/manage-alerts-v2/get-alert-by-id?id=${alert}`);
                const data = await response.json();
                setAlertData(data.alert);
            } catch (error) {
                console.error("Error fetching alert data:", error);
                setAlertData(null);
            } finally {
                setIsLoading(false);
            }
        };
        fetchAlertData();
    }, [alert]);
    // useEffect(() => {
    //     if (alertData) {
    //         setFilteredAlerts(
    //             Alerts.filter(alert => alert.title.toLowerCase().includes(searchQuery.toLowerCase()))
    //         );
    //     }
    // }, [searchQuery, alertData]);
    useEffect(() => {
        const fetchMessages = async () => {
            const userId = user?.id;

            if (!userId || !alert) {
                console.error("User ID or alert ID is not available");
                return;
            }
            const response = await fetch(`/api/optimizations/get-messages?userId=${userId}&alertId=${alert}`);
            const data = await response.json();
            console.log("fetchMessages data", data);
            if (data.data) {
                setMessages(data.data.messages);
            }
        };
        fetchMessages();
    }, [user, alert]);
    useEffect(() => {

        const saveMessages = async () => {
            const userId = user?.id;
            if (!userId) {
                console.error("User ID is not available");
                return;
            }
            console.log("messages", messages)
            if (messages.length === 0) {
                return;
            }
            const response = await fetch(`/api/optimizations/save-messages`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId: userId, alertId: alert, messages: messages }),
            });
            const data = await response.json();
            console.log("Saved messages", data);
        };
        saveMessages();
    }, [messages]);
    const handleAlertClick = (alertId: string) => {
        router.push(`/optimizations?alert=${alertId}`);
    };
    const handleAlertFix = () => {
        return;
    }
    const handleSubmit = async (e: any) => { // Change to async function
        e.preventDefault();
        setLoading(true);
        console.log("input", input);
        setMessages(prevMessages => [...prevMessages, { role: "user", content: input }]);
        // setRequest(input)
        // setResponse("")
        const query = messages.map(msg => msg.role === "user" ? msg.content : "").join(" ") + " " + input;
        let latestQuery = input;
        if (messages.length === 0) {
            try {
                const upframeResponse = await getUpframeResponse(alertData, input);
                if (upframeResponse) {
                    latestQuery = upframeResponse.answer;
                }
            } catch (error) {
                console.error("Error fetching upframe response:", error);
            }
        }
        const response = await fetch('/api/pinecone/chat_response', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ query: query, latestQuery: latestQuery, messages: messages }),
        });

        const data = await response.json();
        console.log("data", data);
        setLoading(false);
        // Add an initial assistant message to display the loading state
        setMessages(prevMessages => [
            ...prevMessages,
            { role: "assistant", content: data.answer } // Placeholder for the assistant response
        ]);

        setInput(""); // Clear input field

    };

    const scrollAreaRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollAreaRef.current) {
            scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight;
        }
        console.log("messages", messages)
    }, [messages]);
    if (isLoading) {
        return <div className="flex justify-center items-center h-screen">
            <Spinner />
        </div>
    }

    if (!alertData) {
        return <div className="flex justify-center items-center h-screen">
            <Text>No alert found</Text>
        </div>
    }
    return (
        <OptimizationLayout>
            <OptimizationHeader />
            <Box className="flex-grow bg-[#1A1A1A] rounded-2xl flex flex-col justify-between px-4 pt-2">
                <Box className="mb-2 bg-[#1A1A1A] font-bold rounded-2xl flex flex-row items-center gap-1">
                    <Box
                        as="span"
                        className="flex items-center justify-center w-[30px] h-[30px] bg-[#FAC4234D] rounded-full mr-2 font-play"
                    >
                        <ExclamationTriangleIcon className="text-[#FAC423] w-[15px] h-[15px]" />
                    </Box>
                    {alertData?.title}
                </Box>
                <Flex direction="row" className="flex-grow h-[180px]" gap="4" >
                    <ScrollArea
                        ref={scrollAreaRef}
                        type="always"
                        scrollbars="vertical"
                        className="h-[100%] pr-4 w-[70%]"
                    >
                        <Card className="bg-black mb-8 p-4">
                            {/* <Heading size="4" mb="2" trim="start"> */}
                            <Text size="4" mb="2" trim="start" weight="bold" className="font-play">
                                What's going on?
                            </Text>
                            <Flex direction="column" className="text-sm">

                                {/* <ReactMarkdown components={components}>
                                            {alertData?.description}
                                        </ReactMarkdown> */}
                                {alertData?.description && <MarkdownPreview markdown={alertData?.description} keywords={alertData?.keywords || []} />}
                            </Flex>
                        </Card>
                        {/* {alertData?.optimizations.map((item) => (
                            <>
                                <Box className="bg-[#1A1A1A] rounded-2xl flex flex-row items-center gap-1 mt-6">
                                    <Box
                                        as="span"
                                        className="flex items-center justify-center w-[30px] h-[30px] bg-[#3EC4A14D] rounded-full mr-2"
                                    >
                                        <OptimizationIcon />
                                    </Box>
                                    <span className="text-bold text-white">{item.id}</span>
                                </Box>
                                <Card className="bg-black rounded-2xl mt-2 p-4">
                                    <Text size="4" mb="2" weight="bold" trim="start">
                                        What needs to be done?
                                    </Text>
                                    <Flex direction="column" gap="4" className="text-sm">
                                        {item.description && <MarkdownPreview markdown={item.description} keywords={alertData?.keywords || []} />}
                                    </Flex>
                                </Card>
                            </>
                        ))} */}
                        {/* <Box className="mt-10">
                            {alertData?.followUpOptimizations && alertData?.followUpOptimizations.map((item) => (
                                expandedQuestion.includes(item.id) && (
                                    <Card id={`question-${item.id}`} className="bg-black rounded-2xl mt-2 p-4">
                                        <Text size="3" mb="2" weight="bold" trim="start">
                                            {item.question}
                                        </Text>
                                        <Flex direction="column" mt="4" gap="4" className="text-sm">
                                            {item.answer && <MarkdownPreview markdown={item.answer} keywords={item?.keywords || []} />}
                                        </Flex>
                                    </Card>
                                )
                            ))}
                        </Box> */}
                        <ShowMessage messages={messages} />
                        {/* {alertData?.followUpOptimizations && alertData?.followUpOptimizations.length > 0 && alertData?.followUpOptimizations.length !== expandedQuestion.length && <Box className="mb-2 bg-[#1A1A1A] rounded-2xl flex flex-col gap-4 mt-10">
                            <Text weight="bold" size="4" className="font-play">
                                Related to this alert
                            </Text>
                            {alertData?.followUpOptimizations.map((item) => (
                                !expandedQuestion.includes(item.id) && (
                                    <Card className="rounded-2xl cursor-pointer bg-black" onClick={() => handleFollowUpQuestionClick(item.id, alertData?.id)}>
                                        <Flex direction="row" justify="between" gap="4">
                                            <Box className="font-play cursor-pointer text-sm">
                                                {item.question}
                                            </Box>
                                            <PlusIcon color="gray" className="text-[#3EC4A1] w-[20px] h-[20px]" />
                                        </Flex>
                                    </Card>
                                )
                            ))}
                        </Box>} */}
                    </ScrollArea>
                    <Flex direction="column" gap="4" className="w-[30%] h-[100%] ">
                        <ScrollArea >
                            <Box className="mt-10">
                                {alertData?.followUpQuestions && alertData?.followUpQuestions.map((item) => (
                                    expandedQuestion.includes(item.id) && (
                                        <Card id={`question-${item.id}`} className="bg-black rounded-2xl mt-2 p-4">
                                            <Text size="3" mb="2" weight="bold" trim="start">
                                                {item.question}
                                            </Text>
                                            <Flex direction="column" mt="4" gap="4" className="text-sm">
                                                {item.answer && <MarkdownPreview markdown={item.answer} keywords={item?.keywords || []} />}
                                            </Flex>
                                        </Card>
                                    )
                                ))}
                            </Box>

                            {alertData?.followUpQuestions && alertData?.followUpQuestions.length > 0 && alertData?.followUpQuestions.length !== expandedQuestion.length && <Box className="mb-2 rounded-2xl flex flex-col gap-4 mt-10">
                                <Text weight="bold" size="4" className="font-play">
                                    Related to this alert
                                </Text>
                                {alertData?.followUpQuestions.map((item) => (
                                    !expandedQuestion.includes(item.id) && (
                                        <Card className="rounded-2xl cursor-pointer bg-black" onClick={() => handleFollowUpQuestionClick(item.id, alertData?.id)}>
                                            <Flex direction="row" justify="between" gap="4">
                                                <Box className="font-play cursor-pointer text-sm">
                                                    {item.question}
                                                </Box>
                                                <PlusIcon color="gray" className="text-[#3EC4A1] w-[20px] h-[20px]" />
                                            </Flex>
                                        </Card>
                                    )
                                ))}
                            </Box>}
                        </ScrollArea>
                        <Box className="flex justify-center items-center gap-4 bg-[#1A1A1A] py-2">
                            <Button className="rounded-full cursor-pointer w-[200px] h-[48px] bg-black" onClick={() => router.push(`/platform`)} color="gray">Ignore Alert</Button>
                            <OptimizationButton
                                handleClick={() => router.push(`/optimizations/${alertData?._id}`)}
                                loading={loading}
                                text="Track Optimizations"
                            />
                        </Box>
                    </Flex>
                </Flex>
            </Box>
            <OptimizationFooter
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                loading={loading}
                handleAlertFix={handleAlertFix}
            />
        </OptimizationLayout>

    );
};

export default Optimizations;


export const getUpframeResponse = async (alertData: any, latestQuery: string) => {
    try {
        const upframeResponse = await fetch('/api/pinecone/upframeFirstRequest', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alertData: alertData, latestQuery: latestQuery }),
        });
        const data = await upframeResponse.json();
        console.log("upframeResponse:", data);
        return data;
    } catch (error) {
        console.error("Error fetching upframe response:", error);
        return null;
    }
}
