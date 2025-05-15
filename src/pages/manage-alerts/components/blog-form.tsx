"use client"

import { useState } from "react"
import { Button, Text, TextField } from "@radix-ui/themes"
import { TextArea } from "@radix-ui/themes"
// import { Dialog } from "@radix-ui/themes"
// import type { AlertType } from "../../../schemas/alert-schemas/Alerts"
import FollowUpForm from "./follow-up-form"
import OptimizationForm from "./optimization-form"
import FollowUpOptimizationForm from "./follow-up-optimization-form"
// import KeywordForm from "./keyword-form"
import { Flex } from "@radix-ui/themes"
import Editor from "./Editor"
// import ExistingAlerts from "../Alerts.json"
import NewKeywordForm from "./New-keyword-form"
import { Tabs, Box } from "@radix-ui/themes"
// import MarkdownPreview from "./NewMarkdownPreview"
import { AlertState } from "../index"
interface BlogFormProps {
    alert: AlertState
    setAlert: (alert: AlertState) => void
}

export default function BlogForm({ alert, setAlert }: BlogFormProps) {
    // const [alerts, setAlerts] = useState<Alert[]>([]);
    const [isAddingKeyword, setIsAddingKeyword] = useState(false)
    const [openDialogs, setOpenDialogs] = useState({
        followUp: false,
        optimization: false,
        followUpOptimization: false,
        keyword: false,
    })

    const handleSave = async () => {
        try {
            // if (checkDuplicateAlertId(alert.id )) {
            //     window.alert(`The alert ID "${alert.id}" already exists.`);
            //     return;
            // }
            const response = await fetch('/api/manage-alerts-v2/add-alert', {
                method: 'POST',
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

            if (window.confirm("Do you want to clear the alert?")) {
                setAlert({
                    id: "",
                    title: "",
                    description: "",
                    followUpQuestions: [],
                    optimizations: [],
                    followUpOptimizations: [],
                    keywords: [],
                });
                window.location.reload();
            }
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
                <h2 className="text-2xl font-bold mb-4">Create New Alert</h2>
                <Button onClick={handleSave} disabled={isSaveDisabled}>
                    Save Alert
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