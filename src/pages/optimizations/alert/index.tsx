import React, { useEffect, useRef, useState } from "react";
import { Box, Card, Flex, ScrollArea, Separator, Spinner, Text } from "@radix-ui/themes";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { useUser } from "@clerk/nextjs";

import { useRouter } from "next/router";
// import Markdown from 'react-markdown'
import MarkdownPreview from "../../manage-alerts/components/NewMarkdownPreview";
import OptimizationFooter from ".././OptimizationFooter";
import OptimizationHeader from ".././OptimizationHeader";
import ShowMessage from ".././ShowMessages";
import OptimizationLayout from ".././OptimizationLayout";
import { AlertType } from "../../../schemas/alert-schemas/Alerts";
import OptimizationIcon from "../optimizationIcon";
type Message = {
    role: string;
    content: string;
}

const Optimizations = () => {
    const [alertData, setAlertData] = useState<AlertType | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAlertFixed, setIsAlertFixed] = useState(false);
    const router = useRouter();
    const { alert } = router.query;
    console.log("alert", alert)
    const { user } = useUser();

    console.log("alertData", alertData)
    // const [expandedQuestion, setExpandedQuestion] = useState<string[]>([]);
    // const handleFollowUpQuestionClick = (questionId: string, alertId: string) => {
    //     setExpandedQuestion((prev) => [...prev, questionId]);
    //     setTimeout(() => {
    //         const questionElement = document.getElementById(`question-${questionId}`);
    //         if (questionElement) {
    //             questionElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    //         }
    //     }, 0);
    // };
    const [input, setInput] = useState(""); // Add state for input
    const [messages, setMessages] = useState<Message[]>([]); // Add state for messages
    const [loading, setLoading] = useState(false);
    // const [searchQuery, setSearchQuery] = useState("");
    // const [filteredAlerts, setFilteredAlerts] = useState(alertData ? [alertData] : []); // State for filtered alerts
    // const [isPopoverOpen, setIsPopoverOpen] = useState(false); // State to control popover visibility
    const [ignoredOptimizationIds, setIgnoredOptimizationIds] = useState<string[]>([]);
    const handleAlertFix = async () => {
        const userId = user?.id;
        if (!userId || !alert) {
            console.error("User ID or alert ID is not available");
            return;
        }
        console.log("userId in from handleAlertFix", userId)
        console.log("alert in from handleAlertFix", alert)
        console.log("isAlertFixed in from handleAlertFix", isAlertFixed)
        setMessages((prevMessages: Message[]) => [
            ...prevMessages,
            { role: "user", content: "Fix the alert" },
            { role: "assistant", content: "Okay, I'll fix the alert, check out the console for the optimizations" }
        ]);
        setIsAlertFixed(!isAlertFixed);
        saveIsAlertFixed(userId,  alert as string);
    }
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
                setIsAlertFixed(data.data.isAlertFixed);
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

    const handleSubmit = async (e: any, inputQuery?: string) => { // Change to async function
        e.preventDefault();
        setLoading(true);
        console.log("input", input);
        setMessages(prevMessages => [...prevMessages, { role: "user", content: inputQuery || input }]);
        // setRequest(input)
        // setResponse("")
        // const query = messages.map(msg => msg.role === "user" ? msg.content : "").join(" ") + " " + input;
        let latestQuery = inputQuery || input;
        // if (!isAlertFixed) {
            const isFix = await checkForAlertFix(latestQuery);
            if (isFix && !isAlertFixed) {
                setMessages((prevMessages: Message[]) => [
                    ...prevMessages,
                    { role: "assistant", content: "Okay, I'll fix the alert, check out the console for the optimizations" }
                ]);
                setIsAlertFixed(true);
                const userId = user?.id;
                if (!userId || !alert) {
                    console.error("User ID or alert ID is not available");
                    return;
                }
                saveIsAlertFixed(userId,  alert as string);
                setLoading(false);
                setInput("");
                return;
            }
            if (isFix && isAlertFixed) {
                setMessages((prevMessages: Message[]) => [
                    ...prevMessages,
                    { role: "assistant", content: "The alert is already fixed, check out the console for the optimizations" }
                ]);
                setLoading(false);
                setInput("");
                return;
            }
        // }
        if (messages.length === 0) {
            try {
                const upframeResponse = await getUpframeResponse(alertData, inputQuery || input);
                if (upframeResponse) {
                    latestQuery = upframeResponse;
                } else {
                    latestQuery = inputQuery || input;
                    return;
                }
            } catch (error) {
                console.error("Error fetching upframe response:", error);
            }
        }
        // const response = await fetch('/api/pinecone/chat_response', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify({ query: query, latestQuery: latestQuery, messages: messages }),
        // });

        // const data = await response.json();
        const response = await fetch('/api/optimizations/help-me-understand', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alertData: alertData, query: latestQuery, messages: messages }),
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

    const handleHelpMeUnderstandClick = async () => {
        setLoading(true);
        setMessages(prevMessages => [...prevMessages, { role: "user", content: "Please help me understand the alert." }]);
        const answer = await helpMeUnderstand(alertData);
        setMessages(prevMessages => [...prevMessages, { role: "assistant", content: answer }]);
        setLoading(false);
    }
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

    const handleFixOrIgnore = (optimizationId: string, action: string) => {
        console.log("OptimizationId", optimizationId);
        console.log("Action", action);
        if (!setMessages) return;
        if (action === "ignore") {
            setMessages((prevMessages: Message[]) => [
                ...prevMessages,
                { role: "user", content: `Ignore ${optimizationId}` },
                { role: "assistant", content: `Okay, I'll ignore ${optimizationId}` }
            ]);
            setIgnoredOptimizationIds((prev) => [...prev, optimizationId]);
        } else {
            setMessages((prevMessages: Message[]) => [
                ...prevMessages,
                { role: "user", content: `Fix ${optimizationId}` },
                { role: "assistant", content: `Okay, I'll fix ${optimizationId}` }
            ]);
        }
    }
    return (
        <OptimizationLayout>
            <OptimizationHeader />
            <Flex
                direction={{ initial: 'column', sm: 'row' }}
                gap="2"
                className="h-full flex-grow"
            >
                <Box
                    className="bg-[#1A1A1A] rounded-2xl flex flex-col justify-between px-4 py-2"
                    width={{ initial: '100%', sm: '70%' }}
                >
                    <Text size="4" className="font-play text-[#818181]">Chat</Text>
                    <Separator my="3" size="4" />
                    <Box className="mb-2 bg-[#1A1A1A] font-bold rounded-2xl flex flex-row items-center gap-1 ">
                        <Box
                            as="span"
                            className="flex items-center justify-center w-[30px] h-[30px] bg-[#FAC4234D] rounded-full mr-2 font-play"
                        >
                            <ExclamationTriangleIcon className="text-[#FAC423] w-[15px] h-[15px]" />
                        </Box>
                        {alertData?.title}
                    </Box>
                    <Box className="h-[180px] flex-grow">
                        <ScrollArea
                            ref={scrollAreaRef}
                            type="always"
                            scrollbars="vertical"
                            className="h-[100%] pr-4 pb-4"
                        >
                            <Card className="bg-black mb-8 p-4">
                                <Text size="4" mb="2" trim="start" className="font-play text-[#818181]">
                                    What's going on?
                                </Text>
                                <Flex direction="column" className="text-sm">
                                    {alertData?.description && <MarkdownPreview markdown={alertData?.description} keywords={alertData?.keywords || []} />}
                                </Flex>
                            </Card>
                            <ShowMessage messages={messages} />
                        </ScrollArea>

                    </Box>
                </Box>

                <Box
                    className="bg-[#1A1A1A] rounded-2xl flex flex-col justify-between px-4 pt-2"
                    width={{ initial: '100%', sm: '30%' }}
                >
                    <Text size="4" className="font-play text-[#818181]">Console</Text>
                    <Separator my="3" size="4" />
                    <Flex direction="column" gap="4" className="h-[180px] flex-grow">
                        {isAlertFixed ?
                            <ScrollArea className="h-[100%] pr-4 pb-4">
                                {alertData?.optimizations.map((item) => (
                                    <>
                                        <Box className="bg-[#1A1A1A] rounded-2xl flex flex-row items-center gap-1 mt-6">
                                            <Box
                                                as="span"
                                                className="flex items-center justify-center w-[30px] h-[30px] bg-[#3EC4A14D] rounded-full mr-2"
                                            >
                                                <OptimizationIcon />
                                            </Box>
                                            <span className="text-bold">{item.id}</span>
                                        </Box>
                                        <Card className="bg-black rounded-2xl mt-2 p-4">
                                            <Text size="4" mb="2" trim="start" className="font-play text-[#818181]">
                                                What needs to be done?
                                            </Text>
                                            <Flex direction="column" gap="4" className="text-sm">
                                                {item.description && <MarkdownPreview markdown={item.description} keywords={item?.keywords || []} />}
                                            </Flex>
                                        </Card>
                                    </>
                                ))}
                            </ScrollArea>
                            :
                            <span className="font-normal text-sm leading-[24px] tracking-normal align-middle">Important element will show up here</span>
                        }
                    </Flex>
                </Box>
            </Flex>

            <OptimizationFooter
                input={input}
                setInput={setInput}
                handleSubmit={handleSubmit}
                loading={loading}
                handleAlertFix={handleAlertFix}
                isAlertFixed={isAlertFixed}
                optimizations={alertData?.optimizations?.filter(opt => !ignoredOptimizationIds.includes(opt.id)) || []}
                handleHelpMeUnderstandClick={handleHelpMeUnderstandClick}
                handleFixOrIgnore={handleFixOrIgnore}
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
        if (data.answer) {
            return data.answer;
        }
        return null;
    } catch (error) {
        console.error("Error fetching upframe response:", error);
        return null;
    }
}
const helpMeUnderstand = async (alertData: any) => {
    const response = await fetch('/api/optimizations/help-me-understand', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ alertData: alertData, query: "Please help me understand the alert.", messages: [] }),
    });
    const data = await response.json();
    return data.answer;
}

const checkForAlertFix = async (query: string) => {
    const response = await fetch('/api/pinecone/check_for_alert_fix', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: query }),
    });
    const data = await response.json();
    console.log("checkForAlertFix data", data);
    const answer = data.response.answer;
    const parsedAnswer = JSON.parse(answer);
    return parsedAnswer.is_fix;
}

const saveIsAlertFixed = async (userId: string, alertId: string) => {
    const response = await fetch(`/api/optimizations/handle-is-alert-fixed`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userId, alertId: alertId, isAlertFixed: true }),
    });
    const data = await response.json();
    console.log("saveIsAlertFixed data", data);
}