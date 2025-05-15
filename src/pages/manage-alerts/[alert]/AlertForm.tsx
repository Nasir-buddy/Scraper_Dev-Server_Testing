"use client"

import { useState } from "react"
import { Button, Text, TextField } from "@radix-ui/themes"
import { TextArea } from "@radix-ui/themes"
// import { Dialog } from "@radix-ui/themes"
// import type { AlertType } from "../../../schemas/alert-schemas/Alerts"
import FollowUpForm from "../components/follow-up-form"
import OptimizationForm from "../components/optimization-form"
// import FollowUpOptimizationForm from "../components/follow-up-optimization-form"
// import KeywordForm from "./keyword-form"
import { Flex } from "@radix-ui/themes"
import Editor from "../components/Editor"
// import ExistingAlerts from "../Alerts.json"
import NewKeywordForm from "../components/New-keyword-form"
import { Tabs, Box } from "@radix-ui/themes"
// import MarkdownPreview from "./NewMarkdownPreview"
import { AlertState } from "../index"
import router from "next/router"
interface BlogFormProps {
    alert: AlertState
    setAlert: (alert: AlertState) => void
    alertId: string
}

export default function BlogForm({ alert, setAlert, alertId }: BlogFormProps) {
    // const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isAddingKeyword, setIsAddingKeyword] = useState(false)
    const [openDialogs, setOpenDialogs] = useState({
        followUp: false,
        optimization: false,
        followUpOptimization: false,
        keyword: false,
    })

    const handleUpdate = async () => {
        try {
            const response = await fetch('/api/manage-alerts-v2/update-alert', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ alert, alertId }),
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
    // const checkDuplicateAlertId = (id: string) => {
    //     return ExistingAlerts.some(existingAlert => existingAlert.id === id);
    // };
    const isSaveDisabled = !alert.title || !alert.description;



    return (
        <div className="p-4 border rounded-lg">
            <Flex direction="row" justify="between">
                <h2 className="text-2xl font-bold mb-4">Update Alert</h2>
                <Button onClick={handleUpdate} disabled={isSaveDisabled}>
                    Update Alert
                </Button>
            </Flex>
            <div className="space-y-4">
                <div>
                    <label>
                        <Text as="div" size="2" mb="1" weight="bold">
                            Alert ID
                        </Text>
                        <TextField.Root
                            disabled={true}
                            value={alert.id}
                            placeholder="Alert ID"
                            className="w-[200px]"
                        />
                        <p className="text-sm text-gray-500">This ID is automatically generated.</p>
                    </label>
                </div>
                <div>
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
                        {/* <Tabs.Trigger value="followUpOptimization">Follow-up Optimizations</Tabs.Trigger> */}
                        {/* <Tabs.Trigger value="keyword">Keywords</Tabs.Trigger> */}
                    </Tabs.List>

                    <Box pt="3">
                        <Tabs.Content value="content">
                            <Flex direction="row" justify="between" mb="2">
                                <Text as="div" size="2" mb="1" mt="2" weight="bold">
                                    Content
                                </Text>
                                <Button variant="outline" onClick={() => setIsAddingKeyword(!isAddingKeyword)}>Add Keyword</Button>
                            </Flex>
                            {isAddingKeyword && <NewKeywordForm
                                keywords={alert.keywords}
                                onChange={(keywords) => {
                                    setAlert({ ...alert, keywords })
                                }}
                                setOpenDialogs={() => {
                                    setOpenDialogs((prev) => ({ ...prev, keyword: false }))
                                }}
                            />}
                            <Editor value={alert.description} setValue={(value) => setAlert({ ...alert, description: value })} />
                            {/* <Text as="div" size="2" mb="1" mt="4" weight="bold">
                                Preview
                            </Text>
                            <div className="border rounded-lg p-4">
                                <MarkdownPreview markdown={alert.description} keywords={alert.keywords} />
                            </div> */}
                        </Tabs.Content>

                        <Tabs.Content value="followUp">
                            <FollowUpForm
                                questions={alert.followUpQuestions}
                                onChange={(questions) => {
                                    setAlert({ ...alert, followUpQuestions: questions })
                                }}
                            // keywords={alert.keywords}
                            />
                        </Tabs.Content>

                        <Tabs.Content value="optimization">
                            <OptimizationForm
                                optimizations={alert.optimizations}
                                onChange={(optimizations) => {
                                    setAlert({ ...alert, optimizations })
                                }}
                            // keywords={alert.keywords}
                            />
                        </Tabs.Content>

                        {/* <Tabs.Content value="followUpOptimization">
                            <FollowUpOptimizationForm
                                followUpOptimizations={alert.followUpOptimizations}
                                onChange={(followUpOptimizations) => {
                                    setAlert({ ...alert, followUpOptimizations })
                                }}
                            // keywords={alert.keywords}
                            />
                        </Tabs.Content> */}

                        {/* <Tabs.Content value="keyword">
                            <NewKeywordForm
                                keywords={alert.keywords}
                                onChange={(keywords) => {
                                    setAlert({ ...alert, keywords })
                                }}
                                setOpenDialogs={() => {
                                    setOpenDialogs((prev) => ({ ...prev, keyword: false }))
                                }}
                            />
                        </Tabs.Content> */}
                    </Box>
                </Tabs.Root>
            </div>
        </div>
    )
}