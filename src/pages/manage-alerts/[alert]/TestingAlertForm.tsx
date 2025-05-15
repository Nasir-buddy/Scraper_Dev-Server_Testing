"use client"

import { useState } from "react"
import { Button, Flex, Text, TextField } from "@radix-ui/themes"
import { TextArea } from "@radix-ui/themes"
import FollowUpForm from "../components/follow-up-form"
import OptimizationForm from "../components/optimization-form"
import FollowUpOptimizationForm from "../components/follow-up-optimization-form"
import KeywordForm from "../components/New-keyword-form"
import Editor from "../components/Editor"
import router from "next/router"
import { Tabs } from "@radix-ui/themes"
import { Box } from "@radix-ui/themes"
import MarkdownPreview from "../components/NewMarkdownPreview"
import { AlertState } from "../index"
interface BlogFormProps {
    alert: AlertState
    setAlert: (alert: AlertState) => void
}

export default function AlertForm({ alert, setAlert }: BlogFormProps) {
    const [openDialogs, setOpenDialogs] = useState({
        followUp: false,
        optimization: false,
        followUpOptimization: false,
        keyword: false,
    })

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/manage-alerts/updateExistingAlert', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(alert),
            });

            if (!response.ok) {
                throw new Error('Failed to save alert');
            }

            console.log("Alert saved successfully:", alert);
            window.alert("Your alert saved successfully.");

            router.push(`/manage-alerts`);
        } catch (error) {
            console.error("Error saving alert:", error);
        }
    }
    const isSaveDisabled = !alert.title || !alert.description;

    return (
        <div className="p-4 border rounded-lg">
            <Flex direction="row" justify="between">
                <h2 className="text-2xl font-bold mb-4">Manage Alert</h2>
                <Button className="cursor-pointer" onClick={handleUpdate} disabled={isSaveDisabled}>
                    Save Alert {alert.id}
                </Button>
            </Flex>
            <div className="space-y-4">
                <div>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Alert ID
                        </Text>
                        <TextField.Root
                            defaultValue={alert.id}
                            disabled={true}
                            onChange={(e) => setAlert({ ...alert, id: e.target.value })}
                            placeholder="AL001"
                            className="w-[200px]"
                        />
                        <p className="text-sm text-gray-500">This ID is automatically generated.</p>
                    </label>
                </div>
                <div>
                    <Text as="div" size="2" mb="1" weight="bold">
                        Title
                    </Text>
                    <TextArea
                        placeholder="Title"
                        value={alert.title}
                        onChange={(e) => setAlert({ ...alert, title: e.target.value })}
                    />
                </div>

                <Tabs.Root defaultValue="content">
                    <Tabs.List>
                        <Tabs.Trigger value="content">Content</Tabs.Trigger>
                        <Tabs.Trigger value="followUp">Follow-up Questions</Tabs.Trigger>
                        <Tabs.Trigger value="optimization">Optimizations</Tabs.Trigger>
                        <Tabs.Trigger value="followUpOptimization">Follow-up Optimizations</Tabs.Trigger>
                        <Tabs.Trigger value="keyword">Keywords</Tabs.Trigger>
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="content">
                            <Text as="div" size="2" mb="1" mt="2" weight="bold">
                                Content
                            </Text>
                            <Editor value={alert.description} setValue={(value) => setAlert({ ...alert, description: value })} />
                            <Text as="div" size="2" mb="1" mt="4" weight="bold">
                                Preview
                            </Text>
                            <div className="border rounded-lg p-4">
                                <MarkdownPreview markdown={alert.description} keywords={alert.keywords} />
                            </div>
                        </Tabs.Content>

                        <Tabs.Content value="followUp">
                            <FollowUpForm
                                questions={alert.followUpQuestions}
                                onChange={(questions) => {
                                    setAlert({ ...alert, followUpQuestions: questions })
                                }}
                                keywords={alert.keywords}
                            />
                        </Tabs.Content>

                        <Tabs.Content value="optimization">
                            <OptimizationForm
                                optimizations={alert.optimizations}
                                onChange={(optimizations) => {
                                    setAlert({ ...alert, optimizations })
                                }}
                                keywords={alert.keywords}
                            />
                        </Tabs.Content>

                        <Tabs.Content value="followUpOptimization">
                            <FollowUpOptimizationForm
                                followUpOptimizations={alert.followUpOptimizations}
                                onChange={(followUpOptimizations) => {
                                    setAlert({ ...alert, followUpOptimizations })
                                }}
                                keywords={alert.keywords}
                            />
                        </Tabs.Content>

                        <Tabs.Content value="keyword">
                            <KeywordForm
                                keywords={alert.keywords}
                                onChange={(keywords) => {
                                    setAlert({ ...alert, keywords })
                                }}
                                setOpenDialogs={setOpenDialogs}

                            />
                        </Tabs.Content>
                    </Box>
                </Tabs.Root>


            </div>
        </div>
    )
}

