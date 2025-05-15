import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import { Box, Button, Flex, Text } from "@radix-ui/themes";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { AlertType } from "../../schemas/alert-schemas/Alerts";
const AlertComponent = () => {
  const [alerts, setAlerts] = useState<AlertType[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const suggestions = Array(3).fill(null);
  //   const handleFixClick = () => router.push(`/editor?quizId=${quizId}`);
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('/api/manage-alerts-v2/get-all-alerts');
        const data = await response.json();
        const alerts= data.alerts
        setAlerts(alerts);
      } catch (error) {
        console.error("Error fetching alerts:", error);
        setAlerts([]);
      } finally {
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (alerts.length === 0) {
    return <div>No alerts found</div>;
  }
  return (
    <Flex gap="3" direction="column" className="px-2 pb-2">
      <Text className="text-2xl mb-4 lg:mb-0">New Alerts</Text>
      {alerts.map((alert, index) => (
        <Flex
          key={index}
          align="center"
          width="full"
          className="bg-black h-[63px] rounded-2xl px-2"
        >
          <Flex align="center" justify="between" width="100%">
            <Flex gap="2" align="center">
              <Box
                as="span"
                className="flex items-center justify-center w-[35px] h-[35px] bg-[#FAC4234D] rounded-full mr-2"
              >
                <ExclamationTriangleIcon className="text-[#FAC423] w-[15px] h-[15px]" />
              </Box>
              <Box>
                <Text as="div" size="2">
                  {alert.title}
                </Text>
                {/* <Text as="div" size="2" color="gray">
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Voluptatem ullam ea soluta facere culpa est.
                </Text> */}
              </Box>
            </Flex>
            <Flex gap="3">
              <Button
                size="3"
                radius="full"
                color="gray"
                variant="soft"
                className="w-[132px] cursor-pointer bg-[#171717] text-[14px]"
              >
                Dismiss
              </Button>
              <Button
                onClick={() => {
                  router.push(`/optimizations/alert?alert=${alert._id}`);
                }}
                size="3"
                radius="full"
                className="w-[132px] cursor-pointer bg-[#3EC4A14D] text-[14px]"
                variant="soft"
              >
                Take Action
              </Button>
            </Flex>
          </Flex>
        </Flex>
      ))}
    </Flex>
  );
};

export default AlertComponent;
