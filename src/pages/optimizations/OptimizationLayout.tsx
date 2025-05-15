// components/OptimizationLayout.tsx
import React from 'react';
import { Box, Flex } from "@radix-ui/themes";
import HomeHeader from "../components/HomeHeader";
import VerticalNav from "../components/VerticalNav";

const OptimizationLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <Box style={{ backgroundColor: "#1A1A1A", margin: 0, fontFamily: 'Play, sans-serif', maxHeight: '100vh' }}>
            <HomeHeader title={"Optimizations"} />
            <Flex direction="row">
                <Box
                    className="flex-shrink-0"
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "4rem",
                        height: "100vh",
                        backgroundColor: "#000000",
                    }}
                >
                    <VerticalNav />
                </Box>
                <Box
                    style={{
                        marginLeft: "4rem",
                        width: "calc(100% - 4rem)",
                        overflowY: "auto",
                    }}
                >
                    <Box className="min-h-screen bg-black pr-4 sm:pt-4 text-gray-100 flex flex-col gap-4 justify-between pb-4">

                        {children}
                    </Box>
                </Box>
            </Flex>
        </Box>
    );
};

export default OptimizationLayout;