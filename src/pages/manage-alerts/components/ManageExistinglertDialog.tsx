import { Avatar, Button, Text } from '@radix-ui/themes'
import { Flex } from '@radix-ui/themes'
import { Box } from '@radix-ui/themes'
import { Card } from '@radix-ui/themes'
import React from 'react'
import { useRouter } from 'next/router'
import { AlertType } from "../../../schemas/alert-schemas/Alerts"
const ManageExistinglertDialog = ({alerts}: {alerts: AlertType[]}) => {
    const router = useRouter()
    return (
        <Flex width="100%" gap="4" direction="column">
            {alerts.map((alert: AlertType) => (
                <Card key={alert.id}>
                    <Flex gap="3" align="center">
                        <Box>
                            <Text as="div" size="2" weight="bold">
                                {alert.id}
                            </Text>
                            <Text as="div" size="2" color="gray">
                                {alert.title}
                            </Text>
                        </Box>
                    </Flex>
                    <Button variant="outline" color="gray" className="cursor-pointer mt-2" onClick={() => router.push(`/manage-alerts/${alert._id}`)}>Manage Alert</Button>
                </Card>
            ))}
        </Flex>

    )
}

export default ManageExistinglertDialog