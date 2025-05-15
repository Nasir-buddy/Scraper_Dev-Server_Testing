"use client"
import { useState, useEffect } from "react"
// import AlertForm from "./TestingAlertForm"
import AlertForm from "./AlertForm"
import Preview from "../components/preview"
import { AlertState } from "../index"
import { AlertDialog, Box, Button, Flex } from "@radix-ui/themes"
// import ExistingKeywordDialog from "../components/Existing-keyword-dialog"
import router, { useRouter } from "next/router";

export default function Page() {
    // const [alerts, setAlerts] = useState<Alert[]>([]);
    const [alertLoading, setAlertLoading] = useState(true);
    const router = useRouter();
    const { alert } = router.query;

    // Function to generate a new alert ID
    const [currentAlert, setCurrentAlert] = useState<AlertState>({
        id: '',
        title: '',
        description: '',
        followUpQuestions: [],
        optimizations: [],
        followUpOptimizations: [],
        keywords: []
    });
    useEffect(() => {
        const fetchAlert = async () => {
            try {
                const response = await fetch(`/api/manage-alerts-v2/get-alert-by-id?id=${alert}`);
                const data = await response.json();
                console.log("data", data)
                const ModifiedAlert = {
                   id: data.alert.id,
                   title: data.alert.title,
                   description: data.alert.description,
                   followUpQuestions: data.alert.followUpQuestions,
                   optimizations: data.alert.optimizations,
                   followUpOptimizations: data.alert.followUpOptimizations,
                   keywords: data.alert.keywords
                }
                console.log("ModifiedAlert", ModifiedAlert)
                setCurrentAlert(ModifiedAlert);
            } catch (error) {
                console.error("Error fetching alert:", error);
            } finally {
                setAlertLoading(false);
            }
        }
        fetchAlert();
    }, [alert]);
    const handleDelete = async () => {
        const response = await fetch('/api/manage-alerts-v2/delete-alert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ alertId: alert }),
        });
        // Alert({
        //     title: "Alert Deleted",
        //     description: "The alert has been deleted successfully",
        // });
        if (response.ok) {
            router.push("/manage-alerts");
        }
    }
    if (alertLoading) {
        return <div>Loading...</div>
    }
    if (!currentAlert || !alert) {
        return <div>Alert not found</div>
    }
    return (
        <Box className="p-2 w-full flex flex-col">
            <header className="flex justify-between items-center mb-4">
                <Button variant="outline" color="gray" className="cursor-pointer" onClick={() => router.push("/manage-alerts")}>Back to Manage Alerts</Button>
                <h1 className="text-xl font-bold">Alerts {currentAlert?.id}</h1>
                <AlertDialog.Root>
                    <AlertDialog.Trigger>
                        <Button color="red">Delete Alert</Button>
                    </AlertDialog.Trigger>
                    <AlertDialog.Content maxWidth="450px">
                        <AlertDialog.Title>Delete Alert</AlertDialog.Title>
                        <AlertDialog.Description size="2">
                            Are you sure? This alert will no longer exist.
                        </AlertDialog.Description>

                        <Flex gap="3" mt="4" justify="end">
                            <AlertDialog.Cancel>
                                <Button variant="soft" color="gray">
                                    Cancel
                                </Button>
                            </AlertDialog.Cancel>
                            <AlertDialog.Action>
                                <Button variant="solid" color="red" onClick={handleDelete}>
                                    Confirm Delete Alert
                                </Button>
                            </AlertDialog.Action>
                        </Flex>
                    </AlertDialog.Content>
                </AlertDialog.Root>

            </header>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden w-full">
                <AlertForm alert={currentAlert} setAlert={setCurrentAlert} alertId={alert as string}/>
                <Preview alert={currentAlert} />
            </Box>
        </Box>
    )
}

