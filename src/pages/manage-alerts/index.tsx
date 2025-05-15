"use client"
import { useState, useEffect } from "react"
import BlogForm from "./components/blog-form"
import Preview from "./components/preview"
// import { Alert } from "./types"
import { Box, Button, Dialog, Link, ScrollArea } from "@radix-ui/themes"
// import alerts from "./Alerts.json"
// import ExistingKeywordDialog from "./components/Existing-keyword-dialog"
import { useRouter } from "next/router";
import ManageExistinglertDialog from "./components/ManageExistinglertDialog"
// import NewExistingKeyword from "./components/NewExistingKeyword"
// import LevelSelectorDialog from "./components/NewExistingKeyword"
import { AlertType } from "../../schemas/alert-schemas/Alerts"

// Define a type for the initial state
// type AlertState = Omit<AlertType, keyof Document>;
import { FollowUpQuestion, Optimization, FollowUpOptimization, Keyword } from "../../schemas/alert-schemas/Alerts"

export interface AlertState extends Partial<AlertType> {
    id: string;
    title: string;
    description: string;
    followUpQuestions: FollowUpQuestion[];
    optimizations: Optimization[];
    followUpOptimizations: FollowUpOptimization[];
    keywords: Keyword[];
}
export default function Page() {
    const [alerts, setAlerts] = useState<AlertType[]>([]);
    const [loadingAlerts, setLoadingAlerts] = useState(true);
    // console.log("alerts", alerts)
    // const router = useRouter();
    // const { alert } = router.query;
    // console.log("alert for manage alerts:", alert)
    // const alertData = alerts.find((item) => item.id === alert);
    // console.log("alertData", alertData)

    // Function to generate a new alert ID
    const generateNewAlertId = () => {
        console.log("is array alerts", Array.isArray(alerts))
        // Check if alerts is an array and not empty
        if (!Array.isArray(alerts) || alerts.length === 0) {
            return "AL001"; // Return default ID if no alerts
        }
        
        // Find the highest numeric ID
        const highestId = alerts.reduce((maxId, alert) => {
            // Extract numeric part of the ID
            const idNumber = parseInt(alert.id.replace('AL', ''), 10);
            return Math.max(maxId, idNumber); // Find the maximum ID number
        }, 0);
        console.log("highestId", highestId)
        // Generate new ID by incrementing the highest ID
        return `AL${String(highestId + 1).padStart(3, '0')}`;
    };

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
        const fetchAlerts = async () => {
            const response = await fetch('/api/manage-alerts-v2/get-all-alerts');
            const data = await response.json();
            const alerts = data.alerts;
            setAlerts(alerts);
            setLoadingAlerts(false);
        };
        fetchAlerts();
    }, []);
    useEffect(() => {
        console.log("alerts", alerts)
        const highestAlertId = generateNewAlertId()
        console.log("highestAlertId", highestAlertId)
        setCurrentAlert({
            id: highestAlertId,
            title: '',
            description: '',
            followUpQuestions: [],
            optimizations: [],
            followUpOptimizations: [],
            keywords: []
        })
    }, [alerts])

    useEffect(() => {
        console.log("currentAlert", currentAlert)
    }, [currentAlert])
    if (loadingAlerts) {
        return <div>Loading...</div>;
    }
    return (
        <Box className="p-2 w-full flex flex-col">
            <header className="flex justify-between items-center mb-4">
                <h1 className="text-xl font-bold">Manage Alerts</h1>
                <div className="flex gap-2">
                    <Dialog.Root>
                        <Dialog.Trigger>
                            <Button variant="outline">Manage Existing Alert</Button>
                        </Dialog.Trigger>

                        <Dialog.Content className="max-w-[95vw] w-full h-[95vh] max-h-[90vh]">
                            <Dialog.Title>Manage Existing Alerts</Dialog.Title>
                            <Dialog.Description size="2">
                                Use this form to manage an existing alert.
                            </Dialog.Description>

                            <div className="p-6 h-full">
                                <ManageExistinglertDialog alerts={alerts}/>
                            </div>
                        </Dialog.Content>
                    </Dialog.Root>
                    <Link href="/manage-docs">
                        <Button variant="outline">Manage Docs</Button>
                    </Link>
                </div>
            </header>

            <Box className="grid grid-cols-1 md:grid-cols-2 gap-4 overflow-hidden w-full">
                <BlogForm alert={currentAlert} setAlert={setCurrentAlert} />
                <Preview alert={currentAlert} />
            </Box>
        </Box>
    )
}

const getAlerts = async () => {
    const response = await fetch('/api/manage-alerts-v2/get-alerts');
    const data = await response.json();
    return data;
}